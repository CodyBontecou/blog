import 'dotenv/config'
import Replicate from 'replicate'
import {
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync,
    unlinkSync,
} from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import ffmpeg from 'fluent-ffmpeg'

interface TtsConfig {
    voice: string
    model: string
    outputDir: string
}

const DEFAULT_CONFIG: TtsConfig = {
    voice: 'af_bella',
    model: 'jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13',
    outputDir: 'content/audio',
}

export class TtsGenerator {
    private replicate: Replicate
    private config: TtsConfig

    constructor(config: Partial<TtsConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config }
        this.replicate = new Replicate()
    }

    private extractTextFromMarkdown(content: string): string {
        // Remove frontmatter
        const { content: markdownContent } = matter(content)

        // Remove code blocks
        const withoutCodeBlocks = markdownContent.replace(/```[\s\S]*?```/g, '')

        // Remove inline code
        const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, '')

        // Remove markdown links but keep text
        const withoutLinks = withoutInlineCode.replace(
            /\[([^\]]+)\]\([^)]+\)/g,
            '$1'
        )

        // Remove markdown formatting
        const withoutFormatting = withoutLinks
            .replace(/#{1,6}\s/g, '') // Headers
            .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
            .replace(/\*([^*]+)\*/g, '$1') // Italic
            .replace(/~~([^~]+)~~/g, '$1') // Strikethrough
            .replace(/^\s*[-*+]\s/gm, '') // List items
            .replace(/^\s*\d+\.\s/gm, '') // Numbered lists
            .replace(/^\s*>\s/gm, '') // Blockquotes
            .replace(/\n{3,}/g, '\n\n') // Multiple newlines
            .trim()

        return withoutFormatting
    }

    private async generateAudioFile(
        text: string,
        filename: string
    ): Promise<string> {
        const input = {
            text: text,
            voice: this.config.voice,
        }

        console.log(`🎵 Generating audio for ${filename}...`)

        try {
            const output = await this.replicate.run(this.config.model as any, {
                input,
            })

            // Handle different output formats
            let audioBuffer: Buffer

            if (typeof output === 'string') {
                // If output is a URL, fetch it
                console.log('📥 Fetching audio from URL...')
                const response = await fetch(output)
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch audio: ${response.status} ${response.statusText}`
                    )
                }
                audioBuffer = Buffer.from(await response.arrayBuffer())
            } else if (output && output.constructor.name === 'FileOutput') {
                // If output is a FileOutput from Replicate SDK
                console.log('📥 Converting audio data...')

                // Use the blob method to get the audio data
                if (typeof (output as any).blob === 'function') {
                    const blob = await (output as any).blob()
                    audioBuffer = Buffer.from(await blob.arrayBuffer())
                } else if (typeof (output as any).read === 'function') {
                    audioBuffer = await (output as any).read()
                } else if (typeof (output as any).arrayBuffer === 'function') {
                    audioBuffer = Buffer.from(
                        await (output as any).arrayBuffer()
                    )
                } else if (typeof (output as any).buffer === 'function') {
                    audioBuffer = await (output as any).buffer()
                } else {
                    throw new Error('No known method to read FileOutput')
                }
            } else if (output && output.constructor.name === 'ReadableStream') {
                // If output is a ReadableStream
                console.log('📥 Reading from ReadableStream...')
                const reader = (output as any).getReader()
                const chunks: Uint8Array[] = []

                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    chunks.push(value)
                }

                // Combine all chunks into a single buffer
                const totalLength = chunks.reduce(
                    (sum, chunk) => sum + chunk.length,
                    0
                )
                const combined = new Uint8Array(totalLength)
                let offset = 0

                for (const chunk of chunks) {
                    combined.set(chunk, offset)
                    offset += chunk.length
                }

                audioBuffer = Buffer.from(combined)
            } else if (output && typeof (output as any).read === 'function') {
                // If output is a stream/readable
                audioBuffer = await (output as any).read()
            } else if (output instanceof ArrayBuffer) {
                // If output is an ArrayBuffer
                audioBuffer = Buffer.from(output)
            } else {
                throw new Error(
                    `Unsupported output format: ${typeof output}, constructor: ${output?.constructor?.name}`
                )
            }

            const outputPath = join(this.config.outputDir, filename)

            // Ensure output directory exists
            if (!existsSync(this.config.outputDir)) {
                mkdirSync(this.config.outputDir, { recursive: true })
            }

            // Save as temporary WAV file first
            const tempWavPath = outputPath.replace('.mp3', '.temp.wav')
            writeFileSync(tempWavPath, audioBuffer)

            // Convert WAV to MP3
            console.log('🔄 Converting to MP3...')
            await this.convertToMp3(tempWavPath, outputPath)

            // Clean up temporary file
            unlinkSync(tempWavPath)

            console.log(`✅ Audio generated: ${outputPath}`)

            return outputPath
        } catch (error) {
            console.error(`❌ Error generating audio for ${filename}:`, error)
            throw error
        }
    }

    private async convertToMp3(
        inputPath: string,
        outputPath: string
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .audioChannels(1)
                .audioFrequency(22050)
                .format('mp3')
                .on('end', () => {
                    resolve()
                })
                .on('error', err => {
                    reject(err)
                })
                .save(outputPath)
        })
    }

    private generateSlugFromFilename(filename: string): string {
        return filename
            .replace(/\.md$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }

    async generateForPost(markdownFilePath: string): Promise<string | null> {
        try {
            const content = readFileSync(markdownFilePath, 'utf-8')
            const { data: frontmatter } = matter(content)

            // Skip if draft
            if (frontmatter.draft) {
                console.log(`⏭️  Skipping draft: ${markdownFilePath}`)
                return null
            }

            const text = this.extractTextFromMarkdown(content)

            if (!text.trim()) {
                console.log(`⏭️  No content to convert: ${markdownFilePath}`)
                return null
            }

            const filename = this.generateSlugFromFilename(
                markdownFilePath.split('/').pop() || 'unknown'
            )
            const audioFilename = `${filename}.mp3`

            // Check if audio file already exists
            const outputPath = join(this.config.outputDir, audioFilename)
            if (existsSync(outputPath)) {
                console.log(`⏭️  Audio already exists: ${outputPath}`)
                return outputPath
            }

            return await this.generateAudioFile(text, audioFilename)
        } catch (error) {
            console.error(`❌ Error processing ${markdownFilePath}:`, error)
            return null
        }
    }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
    const generator = new TtsGenerator()
    const postPath = process.argv[2]

    if (!postPath) {
        console.error('Usage: node tts-generator.js <path-to-markdown-file>')
        process.exit(1)
    }

    generator
        .generateForPost(postPath)
        .then(result => {
            if (result) {
                console.log(`🎉 Success! Audio file generated at: ${result}`)
            } else {
                console.log('❌ Failed to generate audio file')
            }
        })
        .catch(error => {
            console.error('❌ Error:', error)
            process.exit(1)
        })
}
