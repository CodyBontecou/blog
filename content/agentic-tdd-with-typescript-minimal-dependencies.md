---
title: Agentic TDD with Typescript - Minimal Dependencies
draft: false
ignore: false
topics:
  - ai
  - llm
  - agents
  - tdd
  - typescript
created_at: 2025-03-08T12:53
date: 2025-03-08T12:53
last_modified: 2025-03-14T11:29
---

[AI](https://arxiv.org/abs/2312.04687) takes TDD to another level: [here](https://codeinthehole.com/tips/llm-tdd-loop-script/), David writes a test spec and the AI agent generates code, looping over and adjusting the code until the tests pass.

## Agentic flow

This post walks you through the Agentic flow showcased in the diagram below. Each section of this blog implements a node.

```mermaid
flowchart LR
    C[Generate prompt];
    C --> D[Send prompt to AI];
    D --> E[Write response to file];
    E --> F[Run tests];
    F -->|Pass| G[Function + test created];
    F -->|Fail| I[Append test output to messages array];
    I --> D;
```

Using [David's](https://codeinthehole.com/tips/llm-tdd-loop-script/) shell script as a starting point, we convert his script to Typescript using:

1. [OpenAI's Node SDK](https://github.com/openai/openai-node)
2. [Vite](https://github.com/vitejs/vite)
3. [Vitest](https://github.com/vitest-dev/vitest)
4. [Zod](https://github.com/colinhacks/zod)

## Project Setup

Let's start by creating a new project with the necessary dependencies.

[Nodejs](https://nodejs.org/) must be installed and working on your computer. I built this using Node v20.11.1.

- Create the project:

    ```bash
    npm init --yes
    ```

### Dependencies

- Install runtime dependencies:

    ```bash
    npm install openai zod
    ```

- Install development tools:

  - `vitest` (Vite test runner)

  - `tsx` (Typescript Execute)

    ```bash
    npm install -D vitest tsx 
    ```

- Create `tsconfig.json` and add the following:

    ```json
    {
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "moduleResolution": "node",
        "esModuleInterop": true,
        "strict": true,
        "outDir": "dist",
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["**/*.ts"],
    "exclude": ["node_modules"]
    }
    ```

### OpenAI API Key

To access [OpenAI](https://github.com/openai/openai-node) programmatically, we need an API key.

1. Login to OpenAI's [developer platform](https://platform.openai.com/), click into "settings", then "API keys":

![](https://cln.sh/wL4R8yfS+)

Click the "+ Create new secret key" button and finish the forms.

![](https://cln.sh/Cdg5p5yx+)

Copy your new key and **save it into a .env file within your newly created project**.

> This is a secret key, so we exclude it from the GitHub repository by adding `.env` to the `.gitignore`.

## Generate function from spec

Create a file at `utils/generateFunctionFromSpec.ts`.
We'll add snippets of code to it as we move through our diagram.
Here's the skeleton of the function:

```ts
// utils/generateFunctionFromSpec.ts

/**
 * Generates a function implementation from a test specification using AI
 * @param testFilePath Path to the test specification file
 * @param outputFilePath Path where the generated function should be saved
 * @param options Optional configuration parameters
 * @returns Promise that resolves to the generated content if successful, or null if all attempts failed
 */
export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {}
```

We import this function into an `index.ts` file in the root directory:

```ts
// index.ts
import { generateFunctionFromSpec } from './utils'

/**
 * Complete TDD workflow:
 * 1. Generate a function implementation that passes the tests
 */
async function runTDDWorkflow() {
    try {
        await generateFunctionFromSpec('tests/add.spec.ts', 'add.ts')
    } catch (error) {
        console.error('Workflow failed:', error)
    }
}

// Run the TDD workflow
runTDDWorkflow()
```

Update the `package.json` file to run this file:

```json
{
  "name": "typescript-example",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "tdd": "tsx index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "openai": "^4.86.1",
    "vitest": "^3.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "tsx": "^4.19.3"
  }
}
```

Now run the program with the command `npm run tdd`.
This uses [tsx](https://tsx.is/) to compile and run `index.ts`which calls `generateFunctionFromSpec`.
The majority of the time is spent in the individual functions.

## Programmatically prompting the LLM

> Node #1: Generate prompt.

Node #1 attaches the content of the test file to the prompt, adding context before we send it.
`readFileContent` extracts the file's content:

```ts
// utils/readFileContent.ts

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const readFileContent = (filePath: string): string => {
    try {
        const absolutePath = path.resolve(__dirname, '..', filePath)
        return fs.readFileSync(absolutePath, 'utf8')
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error)
        return ''
    }
}
```

Create a `tests` directory, then write our test spec file `add.spec.ts`.
(`add` has not been defined yet; it is the target function that we are defining using TDD).

```ts
// tests/add.spec.ts
import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add function', () => {
    it('returns the sum of multiple numbers', () => {
        expect(add(1, 2, 3)).toBe(6)
    })

    it('returns 0 if no arguments are passed', () => {
        expect(add()).toBe(0)
    })

    it('returns the same number if one number is passed', () => {
        expect(add(5)).toBe(5)
    })

    it('handles negative numbers', () => {
        expect(add(-1, -2, -3)).toBe(-6)
    })
})
```

Next, we:

- Update `generateFunctionFromSpec` to create a prompt.
- Read the input file content.
- Add the test file's content to the prompt within a `messages` array.

Our initial modification of `generateFunctionFromSpec` creates a `messages` array and inserts the test specification:

```ts
// utils/generateFunctionFromSpec.ts
import { ChatCompletionMessageParam } from 'openai/resources'

export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {
    const { customPrompt, maxAttempts = 5, testCommand } = options

    // Default prompt if none provided
    const basePrompt =
        customPrompt ||
        `
    Write a Typescript module that passes these tests.

    Only return executable Typescript code
    Do not return Markdown output
    Do not wrap code in triple backticks
    Do not return YAML
`

    // Read the test specification file
    const testSpec = readFileContent(testFilePath)

    // Initialize message history
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]
 
    console.log(messages)
 
    return null
}
```

To run the program, execute `npm run tdd`.
At this point, we only display the constructed `messages` array to see what it looks like:

```bash
[
  {
    role: 'system',
    content: '\n' +
      '    Write a Typescript module that passes these tests.\n' +
      '\n' +
      '    Only return executable Typescript code\n' +
      '    Do not return Markdown output\n' +
      '    Do not wrap code in triple backticks\n' +
      '    Do not return YAML\n' +
      "import { describe, it, expect } from 'vitest'\n" +
      "import { add } from './add'\n" +
      '\n' +
      "describe('add function', () => {\n" +
      "    it('should return the sum of multiple numbers', () => {\n" +
      '        expect(add(1, 2, 3)).toBe(6)\n' +
      '    })\n' +
      '\n' +
      "    it('should return 0 if no arguments are passed', () => {\n" +
      '        expect(add()).toBe(0)\n' +
      '    })\n' +
      '\n' +
      "    it('should return the same number if one number is passed', () => {\n" +
      '        expect(add(5)).toBe(5)\n' +
      '    })\n' +
      '\n' +
      "    it('should handle negative numbers', () => {\n" +
      '        expect(add(-1, -2, -3)).toBe(-6)\n' +
      '    })\n' +
      '})\n'
  }
]
```

Now we have something to submit to the LLM.

## Sending the prompt to the LLM

> Node #2: Send our `messages` array to ChatGPT via their SDK.

The `chat` function takes in `messages` and returns the LLM results:

```ts
// utils/chat.ts
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

const openai = new OpenAI()
const model = 'gpt-4o-mini'

export async function chat(messages: ChatCompletionMessageParam[]) {
    try {
        const completion = await openai.chat.completions.create({
            model,
            messages,
        })
        return completion.choices[0].message.content
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}
```

Add `call` to `generateFunctionFromSpec`:

```ts
// utils/generateFunctionFromSpec.ts
export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {
    const { customPrompt, maxAttempts = 5, testCommand } = options

    // Default prompt if none provided
    const basePrompt =
        customPrompt ||
        `
    Write a Typescript module that passes these tests.

    Only return executable Typescript code
    Do not return Markdown output
    Do not wrap code in triple backticks
    Do not return YAML
`

    // Read the test specification file
    const testSpec = readFileContent(testFilePath)

    // Initialize message history
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]
 
    const response = await chat(messages)
    console.log(response)
    
    return null
}
```

The response may look like this (depending on ChatGPT's randomness):

```ts
function add(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

export { add };
```

Copy and paste the returned response into an `add.ts` file in the root directory and run `npm run test`.

This tests the `add.ts` file against the test `add.spec.ts`.
The generated add function should pass the tests.

## Writing the LLM response to file

*Let's automate this.*

> Node #3:  Write response to file

Our LLM is returning working code, but right now we are manually:

1. Logging the response to the console.
2. Copy and pasting the output to a file.
3. Manually running the test command.

This function writes the `chat` response to a file:

```ts
// utils/writeFileContent.ts
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const writeFileContent = (filePath: string, content: string): void => {
    try {
        const absolutePath = path.resolve(__dirname, '..', filePath)
        fs.writeFileSync(absolutePath, content, 'utf8')
        console.log(`File ${filePath} updated successfully`)
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error)
    }
}
```

Adding `writeFileContent` to `generateFunctionFromSpec`:

```ts
// utils/generateFunctionFromSpec.ts
export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {
    ...
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]
 
    const response = await chat(messages)

    if (!response) {
        console.error('Failed to get a response from the AI.')
    } else {
        writeFileContent(outputFilePath, response)
    }
 
    return null
}
```

Once we ensure `response` is not null, we pass it to `writeFileContent` with the `outputFilePath`.

Running `npm run tdd` writes the response to `add.ts`.
Running `npm run test` shows the tests passing.

## Running the tests

> Node #4: Running tests after our function is generated

Our LLM is returning working code, but right now we are:

1. ~Logging the response to the console~.
2. ~Copy + pasting the output to a file~.
3. Manually running the test command.

We can run our tests programmatically using Node's [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) function:

```ts
// utils/runTests.ts
import { exec } from 'child_process'

/**
 * Runs tests and returns a promise with the test results.
 * @param command Optional test command to run (defaults to 'npm run test')
 * @returns Promise that resolves to an object with test results
 */
export function runTests(
    command: string = 'npm run test'
): Promise<{ passed: boolean; errMsg: string }> {
    return new Promise(resolve => {
        console.log('Running tests...')

        exec(command, (error: Error | null, stdout: string, stderr: string) => {
            let testOutput = stdout

            if (error) {
                testOutput += `\nError: ${error.message}`
            }

            if (stderr) {
                console.error(`Test stderr: ${stderr}`)
                testOutput += `\nStderr: ${stderr}`
            }

            console.log(`Test results:\n${stdout}`)

            // Check if all tests passed
            const passed =
                stdout.includes('✓') &&
                !stdout.includes('✗') &&
                !stdout.includes('fail')

            if (passed) {
                console.log('All tests passed successfully!')
            } else {
                console.log(
                    'Some tests failed. Check the output above for details.'
                )
            }

            resolve({ passed, errMsg: testOutput })
        })
    })
}
```

This function:

1. Runs `exec(command)` with the `command` defaulted to `npm run test`. The is the test command defined in `package.json`.
2. Returns information about whether the tests passed as part of the `Promise`. We use the terminal output to discover results:

```ts
const passed =
 stdout.includes('✓') &&
 !stdout.includes('✗') &&
 !stdout.includes('fail')
```

Here's an example:

![](https://cln.sh/Y9y9LDN6+)

The `passed` variable parses the output and ensures `✓`s and no `✗`s or `fail`s.
This is effective enough, but it's quick and dirty--please add ideas for improvements in the comments.

Let's extend `generateFunctionFromSpec` to run the tests:

```ts
// utils/generateFunctionFromSpec.ts
export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {
 ...
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]
 
    const response = await chat(messages)

    if (!response) {
        console.error('Failed to get a response from the AI.')
    } else {
        writeFileContent(outputFilePath, response)
        const { passed, output } = await runTests(testCommand) // Added this
        console.log(passed, output)
    }
 
    return null
}
```

## Making it Agentic

> While loop === agent?

We've implemented the main flow:

```mermaid
flowchart LR
    Z1[Generate prompt];
    Z1 --> Y1[Send prompt to AI];
    Y1 --> X1[Write response to file];
    X1 --> V1[Run tests];
```

Our ultimate goal is to look like Anthropic's [Agents](https://www.anthropic.com/engineering/building-effective-agents) diagram:

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F58d9f10c985c4eb5d53798dea315f7bb5ab6249e-2401x1000.png&w=3840&q=75)

We'll connect the labels of this diagram to our own:

- **Human:** This is the test file we wrote ([add.test.ts](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/tests/add.spec.ts)) ✅.
- **LLM Call**: This is our [chat](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/utils/chat.ts) function talking to ChatGPT with a prompt built alongside our test file's content ✅.
- **Environment:** This is a check to see if our tests pass ([runTests.ts](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/utils/runTests.ts)) ✅.
  - *Feedback* is the response from our tests ✖︎.
  - *Action* is running our tests with the new response from the LLM ✖︎.
- **Stop:** This occurs when our tests pass ✖︎.

We've built the data flow, but not the ability to take in feedback and apply it to future actions when the tests do not pass.
This is where the **while** loop comes in.

By adding a `while`, we modify `generateFunctionFromSpec` to run continuously until the tests pass:

```ts
// utils/generateFunctionFromSpec.ts

export async function generateFunctionFromSpec() {
    // Commented the rest of the function for brevity
    let testPassed = false
    while (!testPassed) {
        const response = await chat(messages)
        if (!response) {
            console.error('Failed to get a response from the AI.')
            break
        }
        // Save implementation and run tests
        writeFileContent(outputFilePath, response)
        const { passed } = await runTests(testCommand)
        testPassed = passed
    }
    return null
}
```

**Congratulations! You've built your first agent.**

There are issues with this approach:

1. What if you write a test that cannot pass?
2. There is no feedback.

## Improving the Agent with `maxAttempts`

> What if you write a test that cannot pass?

In some cases, you may want an agent running constantly in the background.
This is not one of them.
The agent needs an escape hatch.

The `maxAttempts` constant determines the maximum number of attempts to produce a working function.
After each iteration, we increment `attempts` until it equals `maxAttempts`:

```mermaid
flowchart LR
    P14[Generate prompt];
    P14 --> Q7[Send prompt to AI];
    Q7 --> X92[Write response to file];
    X92 --> M38[Run tests];
    M38 -->|Pass| T55[Function + test created];
    M38 -->|Fail| B21{Attempt n?};
    B21 -->|false| Z44[Append test output to messages array];
    Z44 --> P14;
    B21 -->|true| V71[Fail];
```

We break out of the agent if either:

1. Tests pass
2. `attempts === maxAttempts`

We have the "test passing" case, but not the attempts logic:

```ts
// utils/generateFunctionFromSpec.ts

export async function generateFunctionFromSpec(
 options: {
         customPrompt?: string
         maxAttempts?: number
         testCommand?: string
     } = {}
    ) {
    // Commented the rest of the function for brevity
    const { customPrompt, maxAttempts = 5, testCommand } = options

    let testPassed = false
    let attempts = 0
    while (!testPassed && attempts < maxAttempts) {
        attempts++
        const response = await chat(messages)
        if (!response) {
            console.error('Failed to get a response from the AI.')
            break
        }
        // Save implementation and run tests
        writeFileContent(outputFilePath, response)
        const { passed } = await runTests(testCommand)
        testPassed = passed
    }
    return null
}
```

We extract `maxAttempts` value from the `generateFunctionFromSpec` `options` parameter. If the `maxAttempts` option is not passed to the function, it defaults to 5.

We increment `attempts` on every loop iteration, and check to see if we've reached `maxAttempts`:

```ts
while (!testPassed && attempts < maxAttempts) {
    attempts++
    // remainder of code ...
}
```

The code now runs continuously until the tests pass or we reach `maxAttempts`.

## Adapting the Prompt for feedback

We want each agentic loop (attempt) to apply the feedback we receive during the previous iteration.
We use the logs that the tests display on the console.
A failing test provides high-quality information about the failure.

Here, we append `output` to the `messages` array.
Now every attempt has the necessary context within the agentic loop:

```ts
// utils/generateFunctionFromSpec.ts

export async function generateFunctionFromSpec() {
 // Commented the rest of the function for brevity
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]

    let testPassed = false
    let attempts = 0

    while (!testPassed && attempts < maxAttempts) {
        attempts++
        const response = await chat(messages)

        if (!response) {
            console.error('Failed to get a response from the AI.')
            break
        }

        messages.push({ role: 'assistant', content: response })

        // Save implementation and run tests
        writeFileContent(outputFilePath, response)
        const { passed, output } = await runTests(testCommand)
        testPassed = passed

        messages.push({
            role: 'system',
            content:
                'Tests are failing with this output. Try again.\n\n' + output,
        })
    }
}
```

Here's the final source code for `generateFunctionFromSpec`:

```ts
// utils/generateFunctionFromSpec.ts

import { ChatCompletionMessageParam } from 'openai/resources'
import { chat } from './chat'
import { readFileContent } from './readFileContent'
import { writeFileContent } from './writeFileContent'
import { runTests } from './runTests'

/**
 * Generates a function implementation from a test specification using AI
 * @param testFilePath Path to the test specification file
 * @param outputFilePath Path where the generated function should be saved
 * @param options Optional configuration parameters
 * @returns Promise that resolves to the generated content if successful, or null if all attempts failed
 */
export async function generateFunctionFromSpec(
    testFilePath: string,
    outputFilePath: string,
    options: {
        customPrompt?: string
        maxAttempts?: number
        testCommand?: string
    } = {}
): Promise<string | null> {
    const { customPrompt, maxAttempts = 5, testCommand } = options

    // Default prompt if none provided
    const basePrompt =
        customPrompt ||
        `
    Write a Typescript module that passes these tests.

    Only return executable Typescript code
    Do not return Markdown output
    Do not wrap code in triple backticks
    Do not return YAML
`

    // Read the test specification file
    const testSpec = readFileContent(testFilePath)

    // Initialize message history
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: basePrompt + testSpec },
    ]

    let testPassed = false
    let attempts = 0
    while (!testPassed && attempts < maxAttempts) {
        attempts++
        const response = await chat(messages)

        if (!response) {
            console.error('Failed to get a response from the AI.')
            break
        }

        messages.push({ role: 'assistant', content: response })

        // Save implementation and run tests
        writeFileContent(outputFilePath, response)
        const { passed, output } = await runTests(testCommand)
        testPassed = passed

        messages.push({
            role: 'system',
            content:
                'Tests are failing with this output. Try again.\n\n' + output,
        })
    }

    return null
}
```

All of the code in this blog post is on [Github](https://github.com/CodyBontecou/typescript-llm4tdd-example).
