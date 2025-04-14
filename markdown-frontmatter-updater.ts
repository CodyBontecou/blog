// import * as fs from 'fs'
// import * as path from 'path'
// import * as yaml from 'yaml'

// // Function to check if a file is markdown
// const isMarkdownFile = (filename: string): boolean => {
//     return filename.endsWith('.md') || filename.endsWith('.markdown')
// }

// // Function to get today's date in YYYY-MM-DD format
// const getTodayDate = (): string => {
//     const today = new Date()
//     return today.toISOString().split('T')[0]
// }

// // Function to parse frontmatter from markdown content
// const parseFrontmatter = (
//     content: string
// ): { frontmatter: any; content: string; hasFrontmatter: boolean } => {
//     const fmRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
//     const match = content.match(fmRegex)

//     if (match) {
//         try {
//             const frontmatter = yaml.parse(match[1])
//             return {
//                 frontmatter,
//                 content: match[2],
//                 hasFrontmatter: true,
//             }
//         } catch (e) {
//             console.error('Error parsing frontmatter:', e)
//             return { frontmatter: {}, content, hasFrontmatter: false }
//         }
//     }

//     return { frontmatter: {}, content, hasFrontmatter: false }
// }

// // Function to validate date format (YYYY-MM-DD)
// const isValidDate = (dateString: string): boolean => {
//     const regex = /^\d{4}-\d{2}-\d{2}$/
//     if (!regex.test(dateString)) return false

//     const date = new Date(dateString)
//     return date instanceof Date && !isNaN(date.getTime())
// }

// // Function to update frontmatter with AI topic and date
// const updateFrontmatter = (filePath: string): void => {
//     try {
//         const content = fs.readFileSync(filePath, 'utf8')
//         const {
//             frontmatter,
//             content: mainContent,
//             hasFrontmatter,
//         } = parseFrontmatter(content)

//         // Add or update topics
//         if (!frontmatter.topics) {
//             frontmatter.topics = []
//         }
//         if (!frontmatter.topics.includes('ai')) {
//             frontmatter.topics.push('ai')
//         }

//         // Add date if it doesn't exist or isn't valid
//         if (!frontmatter.date || !isValidDate(frontmatter.date)) {
//             frontmatter.date = getTodayDate()
//         }

//         // Create new content with updated frontmatter
//         const newFrontmatter = yaml.stringify(frontmatter)
//         const newContent = hasFrontmatter
//             ? `---\n${newFrontmatter}---\n${mainContent}`
//             : `---\n${newFrontmatter}---\n\n${content}`

//         // Write the updated content back to file
//         fs.writeFileSync(filePath, newContent)
//         console.log(`Updated ${filePath} with topics and date`)
//     } catch (error) {
//         console.error(`Error processing ${filePath}:`, error)
//     }
// }

// // Main execution
// const currentDir = process.cwd()
// const files = fs.readdirSync(currentDir)

// console.log('Starting frontmatter updates...')

// files.forEach(file => {
//     const filePath = path.join(currentDir, file)
//     if (fs.statSync(filePath).isFile() && isMarkdownFile(file)) {
//         updateFrontmatter(filePath)
//     }
// })

// console.log('Finished processing all markdown files.')

import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'
import axios from 'axios' // Ensure you have axios installed

// ChatGPT API configuration
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions'
const CHATGPT_API_KEY = '' // Replace with your OpenAI API key

// Function to check if a file is markdown
const isMarkdownFile = (filename: string): boolean => {
    return filename.endsWith('.md') || filename.endsWith('.markdown')
}

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
    const today = new Date()
    return today.toISOString().split('T')[0]
}

// Function to parse frontmatter from markdown content
const parseFrontmatter = (
    content: string
): { frontmatter: any; content: string; hasFrontmatter: boolean } => {
    const fmRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = content.match(fmRegex)

    if (match) {
        try {
            const frontmatter = yaml.parse(match[1])
            return {
                frontmatter,
                content: match[2],
                hasFrontmatter: true,
            }
        } catch (e) {
            console.error('Error parsing frontmatter:', e)
            return { frontmatter: {}, content, hasFrontmatter: false }
        }
    }

    return { frontmatter: {}, content, hasFrontmatter: false }
}

// Function to validate date format (YYYY-MM-DD)
const isValidDate = (dateString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) return false

    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.getTime())
}

// Function to get topics from ChatGPT
const getTopicsFromChatGPT = async (content: string): Promise<string[]> => {
    try {
        const response = await axios.post(
            CHATGPT_API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: `What are the relevant topics for the following content? Limit to 5 topics:\n\n${content}`,
                    },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${CHATGPT_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const topicsString = response.data.choices[0].message.content.trim()
        // Split the string by newline or comma, and clean up each topic
        const topics = topicsString
            .split(/\n|,\s*/)
            .map(topic =>
                topic
                    .replace(/^\d+\.\s*/, '')
                    .replace(/^-?\s*/, '')
                    .replace(/^"+|"+$/g, '')
                    .trim()
            )
            .slice(0, 5)

        return topics
    } catch (error) {
        console.error('Error fetching topics from ChatGPT:', error)
        return []
    }
}

// Function to update frontmatter with topics from ChatGPT and date
const updateFrontmatter = async (filePath: string): Promise<void> => {
    try {
        const content = fs.readFileSync(filePath, 'utf8')
        const {
            frontmatter,
            content: mainContent,
            hasFrontmatter,
        } = parseFrontmatter(content)

        // Get topics from ChatGPT
        const topicsFromChatGPT = await getTopicsFromChatGPT(mainContent)

        // Update topics in frontmatter
        frontmatter.topics = topicsFromChatGPT

        // Add date if it doesn't exist or isn't valid
        if (!frontmatter.date || !isValidDate(frontmatter.date)) {
            frontmatter.date = getTodayDate()
        }

        // Create new content with updated frontmatter
        const newFrontmatter = yaml.stringify(frontmatter)
        const newContent = hasFrontmatter
            ? `---\n${newFrontmatter}---\n${mainContent}`
            : `---\n${newFrontmatter}---\n\n${content}`

        // Write the updated content back to file
        fs.writeFileSync(filePath, newContent)
        console.log(`Updated ${filePath} with topics and date`)
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
    }
}

// Main execution
const currentDir = process.cwd()
const files = fs.readdirSync(currentDir)

// console.log('Starting frontmatter updates...')
// ;(async () => {
//     for (const file of files) {
//         const filePath = path.join(currentDir, file)
//         if (fs.statSync(filePath).isFile() && isMarkdownFile(file)) {
//             await updateFrontmatter(filePath)
//         }
//     }

//     console.log('Finished processing all markdown files.')
// })()
