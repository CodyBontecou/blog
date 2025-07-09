---
title: 'Building a Fullstack Text-to-Speech System with Kokoro and Replicate'
description: 'Learn how I built an automated text-to-speech system for my blog using Kokoro TTS, Replicate API, and Vue.js - complete with audio player and build pipeline integration.'
draft: false
created_at: 2025-07-08T14:30
last_modified: 2025-07-08T14:30
topics:
    - typescript
    - vue
    - vitepress
    - accessibility
    - audio
---

# Building a Fullstack Text-to-Speech System with Kokoro and Replicate

I've been thinking about accessibility on my blog lately, and one thing that kept coming up was how people consume content differently. Some folks prefer to read, others learn better by listening, and many want both options available.

So I decided to add audio versions of my blog posts. But here's the thing - I didn't want to manually record dozens of posts (who has time for that?), and I definitely didn't want to pay hundreds of dollars per month for enterprise TTS solutions.

After some research, I discovered Kokoro TTS through Replicate, and let me tell you - this changed everything. I built a complete fullstack text-to-speech system that automatically generates audio for every blog post, complete with a custom Vue.js audio player. The best part? It costs me less than $5 per month for my entire blog.

Here's how I built it and what I learned along the way.

## How I Built It: The Big Picture

Before diving into the code, let me walk you through the four main pieces I had to build:

1. **Text Processing Pipeline** - This cleans up my markdown files and strips out code blocks (trust me, you don't want TTS reading your TypeScript out loud)
2. **TTS Generation Engine** - This is where the magic happens with Kokoro via Replicate
3. **AudioPlayer Component** - A custom Vue.js component that actually looks good on my blog
4. **Build Integration** - Scripts that handle everything automatically during deployment

Here's the tech stack I ended up with:

- **Frontend**: Vue 3 + VitePress + Tailwind CSS (my usual setup)
- **TTS**: Kokoro 82M model via Replicate API
- **Audio Processing**: FFmpeg for converting WAV to MP3
- **Build Tools**: TypeScript, Node.js automation scripts

The flow is pretty straightforward: markdown content gets cleaned → sent to Kokoro TTS → audio gets optimized → audio player magically appears on blog posts. Let me show you how each piece works.

## Cleaning Up Markdown for TTS

Here's something I learned the hard way: you can't just throw raw markdown at a TTS service and expect it to sound good. Code blocks, inline backticks, and markdown syntax create a terrible listening experience.

I needed to build a text processing pipeline that would extract the meaningful content while removing all the technical noise. Here's what I came up with:

````typescript
function cleanMarkdownForTTS(content: string): string {
    let cleaned = content

    // Remove frontmatter
    cleaned = matter(cleaned).content

    // Remove code blocks
    cleaned = cleaned.replace(/```[\s\S]*?```/g, '')
    cleaned = cleaned.replace(/`[^`]+`/g, '')

    // Extract text from markdown links
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

    // Remove markdown formatting
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '') // Headers
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    cleaned = cleaned.replace(/\*([^*]+)\*/g, '$1') // Italic
    cleaned = cleaned.replace(/^[-+*]\s+/gm, '') // Lists
    cleaned = cleaned.replace(/^>\s*/gm, '') // Blockquotes

    // Normalize whitespace
    cleaned = cleaned.replace(/\n\s*\n/g, '\n\n')
    cleaned = cleaned.replace(/\s+/g, ' ').trim()

    return cleaned
}
````

This was absolutely crucial to get right. Without proper cleaning, the TTS would try to read things like "```typescript" and "npm install" - not exactly what you want your visitors to hear!

## Why I Chose Kokoro TTS

After testing several TTS options, I landed on Kokoro for a few key reasons:

- **Quality**: The voice sounds natural - way better than I expected for an open-source model
- **Cost**: At ~$0.01 per 1000 characters, it's incredibly affordable
- **Speed**: Fast enough to include in my build process without major delays
- **Multilingual**: Supports multiple languages (though I'm sticking with English for now)

Here's how I integrated it using Replicate's API:

```typescript
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

async function generateAudio(
    text: string,
    voice: string = 'af_bella'
): Promise<Buffer> {
    const output = await replicate.run(
        'jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13',
        {
            input: {
                text: text,
                voice: voice,
                speed: 1.0,
            },
        }
    )

    // Handle multiple possible output formats
    if (typeof output === 'string') {
        // URL output - fetch the audio
        const response = await fetch(output)
        return Buffer.from(await response.arrayBuffer())
    } else if (output instanceof ReadableStream) {
        // Stream output
        const chunks: Uint8Array[] = []
        const reader = output.getReader()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            chunks.push(value)
        }

        return Buffer.concat(chunks)
    }

    // Handle other formats...
    return Buffer.from(output as ArrayBuffer)
}
```

The API itself is pretty straightforward, but I had to handle multiple output formats from Replicate. Sometimes you get a URL, sometimes a stream, sometimes a buffer - you need to be ready for all of them.

## Converting to Web-Friendly Audio

Here's the thing about Kokoro - it outputs WAV files, which are great for quality but terrible for web delivery. I needed to convert everything to MP3 for better compression and browser compatibility.

I used FFmpeg for this, and here's the conversion setup:

```typescript
import ffmpeg from 'fluent-ffmpeg'
import { promises as fs } from 'fs'
import path from 'path'

async function convertToOptimizedMp3(
    inputBuffer: Buffer,
    outputPath: string
): Promise<void> {
    // Create temporary WAV file
    const tempWavPath = path.join(os.tmpdir(), `temp_${Date.now()}.wav`)
    await fs.writeFile(tempWavPath, inputBuffer)

    return new Promise((resolve, reject) => {
        ffmpeg(tempWavPath)
            .audioBitrate(128) // 128k bitrate for good quality/size balance
            .audioChannels(1) // Mono for voice content
            .audioFrequency(22050) // Optimize sample rate
            .format('mp3')
            .on('end', async () => {
                // Cleanup temp file
                await fs.unlink(tempWavPath)
                resolve()
            })
            .on('error', async err => {
                await fs.unlink(tempWavPath)
                reject(err)
            })
            .save(outputPath)
    })
}
```

I spent some time dialing in these settings. The mono output is perfect for speech (why would you need stereo for a voice?), and 128k bitrate gives you great quality without bloating file sizes.

## Building the Audio Player Component

Now for the fun part - creating a custom Vue.js audio player that doesn't look like it came from 1999. I wanted something that matched my blog's design and had all the features I actually needed.

```vue
<template>
    <div v-if="audioExists" class="audio-player">
        <div
            class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
            <button
                @click="togglePlay"
                :disabled="loading"
                class="flex-shrink-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
                <Icon v-if="loading" name="loading" class="animate-spin" />
                <Icon v-else-if="isPlaying" name="pause" />
                <Icon v-else name="play" />
            </button>

            <div class="flex-1">
                <input
                    type="range"
                    :value="progress"
                    @input="seek"
                    :max="duration || 100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div class="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{{ formatTime(currentTime) }}</span>
                    <span>{{ formatTime(duration) }}</span>
                </div>
            </div>
        </div>

        <audio
            ref="audioElement"
            :src="src"
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @ended="onEnded"
            @error="onError"
            preload="metadata"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
    src: string
}

const props = defineProps<Props>()

const audioElement = ref<HTMLAudioElement>()
const audioExists = ref(false)
const isPlaying = ref(false)
const loading = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const progress = computed(() => {
    return duration.value ? (currentTime.value / duration.value) * 100 : 0
})

onMounted(async () => {
    // Smart audio existence check
    try {
        const response = await fetch(props.src, { method: 'HEAD' })
        audioExists.value = response.ok
    } catch {
        audioExists.value = false
    }
})

const togglePlay = async () => {
    if (!audioElement.value) return

    loading.value = true

    try {
        if (isPlaying.value) {
            audioElement.value.pause()
        } else {
            await audioElement.value.play()
        }
    } catch (error) {
        console.error('Audio playback error:', error)
    } finally {
        loading.value = false
    }
}

const seek = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newTime = (parseFloat(target.value) / 100) * duration.value
    if (audioElement.value) {
        audioElement.value.currentTime = newTime
    }
}

// Event handlers...
const onLoadedMetadata = () => {
    if (audioElement.value) {
        duration.value = audioElement.value.duration
    }
}

const onTimeUpdate = () => {
    if (audioElement.value) {
        currentTime.value = audioElement.value.currentTime
    }
}

const onEnded = () => {
    isPlaying.value = false
    currentTime.value = 0
}

const formatTime = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00'

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>
```

Here's what I'm particularly proud of in this component:

- **Smart Loading**: It checks if the audio file exists before even showing the player (no broken audio icons!)
- **Custom Styling**: Matches my blog's design perfectly with Tailwind CSS
- **Mobile-First**: Works great on phones where people actually listen to audio
- **Error Handling**: Fails gracefully when things go wrong

## Integrating with VitePress

The trickiest part was figuring out how to integrate this into VitePress without breaking anything. I ended up using the theme system to inject the audio player into every blog post.

Here's how I set it up:

```vue
<template>
    <Layout>
        <template #doc-before>
            <div v-if="isBlogPost" class="mb-6">
                <AudioPlayer :src="audioSrc" />
            </div>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AudioPlayer from '../components/ui/AudioPlayer.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
const route = useRoute()

const isBlogPost = computed(() => {
    return (
        frontmatter.value.title &&
        frontmatter.value.publishedAt &&
        !route.path.includes('/topics/')
    )
})

const audioSrc = computed(() => {
    if (!isBlogPost.value) return ''

    const routePath = route.path
    const filename = routePath.split('/').pop() || 'unknown'
    const slug = filename.replace(/\.html$/, '')

    return `/audio/${slug}.mp3`
})
</script>
```

The build process includes automated TTS generation:

```typescript
// Build script integration
export async function buildWithTTS() {
    console.log('🎵 Starting TTS generation...')

    // Generate audio for all markdown files
    await generateBatchTTS('content', 'content/public/audio')

    console.log('📁 Copying audio files to public directory...')
    await copyAudioFiles()

    console.log('🏗️ Building VitePress site...')
    await execAsync('npm run build')

    console.log('✅ Build complete with TTS!')
}

async function copyAudioFiles() {
    const sourceDir = 'content/public/audio'
    const destDir = 'public/audio'

    await fs.ensureDir(destDir)
    await fs.copy(sourceDir, destDir)
}
```

This setup ensures that every build includes the latest audio files and keeps everything in sync. The audio player only shows up on actual blog posts, not on my about page or other static content.

## What I Learned Running This in Production

After running this system for a few months across dozens of blog posts, here's what I've discovered:

### The Cost Reality Check

The costs are honestly incredible:

- **Replicate/Kokoro**: ~$0.01 per 1000 characters
- **Average blog post**: 2,000-5,000 characters = $0.02-$0.05 per post
- **My monthly cost**: Under $5 for my entire blog

Compare that to enterprise TTS solutions that charge $50-200+ per month, and it's a no-brainer.

### Performance Lessons

I learned a few things about optimization the hard way:

- **Don't regenerate everything**: Only process files that have actually changed
- **Skip drafts**: No point in generating audio for posts that aren't published yet
- **Batch processing**: Handle multiple posts at once, but don't overwhelm the API

### Error Handling

```typescript
async function generateWithRetry(
    text: string,
    maxRetries: number = 3
): Promise<Buffer> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await generateAudio(text)
        } catch (error) {
            console.warn(`Attempt ${attempt} failed:`, error.message)

            if (attempt === maxRetries) {
                throw new Error(
                    `TTS generation failed after ${maxRetries} attempts`
                )
            }

            // Exponential backoff
            await new Promise(resolve =>
                setTimeout(resolve, 1000 * Math.pow(2, attempt))
            )
        }
    }

    throw new Error('Unreachable code')
}
```

### The File Management Challenge

One thing I had to figure out was how to avoid regenerating audio for unchanged posts. I ended up checking modification timestamps - if the markdown file hasn't changed, skip the audio generation. Simple but effective.

## Making It Developer-Friendly

Since I'm going to be using this system regularly, I made sure to build in some nice developer experience features:

### NPM Scripts I Actually Use

```json
{
    "scripts": {
        "tts:generate": "tsx scripts/tts-generator.ts",
        "tts:batch": "tsx scripts/batch-tts-generator.ts",
        "tts:test": "tsx scripts/test-tts.ts",
        "build:tts": "tsx scripts/build-with-tts.ts"
    }
}
```

The `tts:test` script is particularly useful for testing new voices or debugging issues before running the full batch.

### Progress Tracking That Actually Helps

```typescript
export async function generateBatchTTS(contentDir: string, outputDir: string) {
    const markdownFiles = await findMarkdownFiles(contentDir)
    const filteredFiles = markdownFiles.filter(
        file => !file.includes('/drafts/') && !file.includes('index.md')
    )

    console.log(`Found ${filteredFiles.length} markdown files to process`)

    for (const [index, file] of filteredFiles.entries()) {
        const progress = `[${index + 1}/${filteredFiles.length}]`
        console.log(`${progress} Processing: ${path.basename(file)}`)

        try {
            await generateTTSForFile(file, outputDir)
            console.log(`${progress} ✅ Success`)
        } catch (error) {
            console.error(`${progress} ❌ Failed: ${error.message}`)
        }
    }
}
```

## Wrapping Up

Building this text-to-speech system has been one of my favorite projects this year. The combination of Kokoro's quality, Replicate's ease of use, and a custom Vue.js audio player creates something that feels genuinely professional.

The economics are what really sold me though - under $5 monthly for comprehensive audio coverage of my entire blog. Compare that to enterprise solutions charging hundreds per month, and it's a no-brainer.

More importantly, this shows how you can integrate modern AI tools into existing workflows without over-engineering things. The audio versions don't replace my written content - they complement it, giving people flexibility in how they consume information.

If you're thinking about adding audio to your blog or content site, I'd definitely recommend giving this approach a try. The setup is straightforward, the ongoing costs are minimal, and the accessibility benefits are huge.

Have questions about the implementation? Check out the source code in my blog's repository. I'm always happy to chat about this stuff!

---

_The complete source code for this implementation is available in my blog's repository. Feel free to adapt these patterns for your own projects, and don't hesitate to reach out if you have questions about the implementation details._
