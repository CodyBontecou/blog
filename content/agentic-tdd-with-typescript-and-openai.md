---
title: Agentic TDD with Typescript and OpenAI
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
last_modified: 2025-03-10T14:06
---

There's [research](https://arxiv.org/abs/2312.04687) taking place that is attempting to take TDD to another level. As David showcases in [this blog post](https://codeinthehole.com/tips/llm-tdd-loop-script/), we can write a test spec and have our AI agent generate code, looping over and adjusting the code until the tests pass.

You can read all of the code provided in this blog post on [Github](https://github.com/CodyBontecou/typescript-llm4tdd-example).

## Agentic flow

In this post, I will walk you through the Agentic flow showcased in the diagram below. Each section of this blog will be an implementation of a node.

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

Using [David's](https://codeinthehole.com/tips/llm-tdd-loop-script/) shell script as a starting point, we will convert his script to Typescript using the tools:

1. [OpenAI's Node SDK](https://github.com/openai/openai-node)
2. [Vite](https://github.com/vitejs/vite)
3. [Vitest](https://github.com/vitest-dev/vitest)
4. [Zod](https://github.com/colinhacks/zod)

Then we'll explore how to build on top of the agent to call other LLM's to build a more resilient system.
## Project Setup

Let's start by creating a new project with the necessary dependencies. 

I'm assuming you have [Nodejs](https://nodejs.org/) installed and working on your computer. I built this using Node v20.11.1, but I imagine there's a variety of Node versions that will work.

### Dependencies

Create the project

```bash
npm init --yes
```

Install the dependencies

```bash
npm install openai vitest zod
```

Typescript Execute

```bash
npm install -D tsx
```


### Typescript config

Here's the `tsconfig.json` file that I'm using:

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

We'll be using OpenAI due to their ease-of-use and flexible [SDK](https://github.com/openai/openai-node). We need an OpenAI API key to access it via code, so let's set that up.

Login to OpenAI's [developer platform](https://platform.openai.com/) and click the settings cog in the top right corner:

![](https://cln.sh/2rVDzF0f+)


Then API keys:

![](https://cln.sh/HPvcJqwT+)

Click the `+ Create new secret key` button and finish the forms.

![](https://cln.sh/1Zzx637W+)

Copy your new key and **save it into a .env file within your newly created project**:

![](https://cln.sh/wvcR2z7L+)


## Generate function from spec

Create a file at `utils/generateFunctionFromSpec.ts`. We will add snippets of code to it as we move through our diagram. For now, just add the skeleton of the function:

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

Now import this function into an `index.ts` file in our root directory:

```ts
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

Update our `package.json` file to run this file:

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

You should now be able to run program using the command `npm run tdd`. This will use [tsx](https://tsx.is/) to compile and run our `index.ts` file which calls `generateFunctionFromSpec`. We will spend the majority of our time in the individual functions and use `index.ts` as our main file.
## Programmatically prompting the LLM

> Node #1: Generate prompt.

Now, let's work on Node #1 in our agentic loop. The goal is to attach the content of the test file to our prompt to add context to the question before we send it.

We'll use a simple `readFileContent` function to attach the test file's content to our prompt. I placed this code into `utils/readFileContent.ts`, but you are welcome to organize your project to whatever works best.

```ts
// utils/readFileContent.ts

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read file content programmatically
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

Create a `tests` directory and place our test spec file `add.spec.ts` into it.

```ts
// tests/add.spec.ts
import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add function', () => {
    it('should return the sum of multiple numbers', () => {
        expect(add(1, 2, 3)).toBe(6)
    })

    it('should return 0 if no arguments are passed', () => {
        expect(add()).toBe(0)
    })

    it('should return the same number if one number is passed', () => {
        expect(add(5)).toBe(5)
    })

    it('should handle negative numbers', () => {
        expect(add(-1, -2, -3)).toBe(-6)
    })
})
```

Now, update our `generateFunctionFromSpec` function to create a prompt, read the inputted file's content, and add the test file's content to the prompt within a `messages` array. We will eventually send the `messages` array to OpenAI/ChatGPT

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
    Write a Typescript module that will make these tests pass and conforms to the passed conventions.

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

If you run what we have so far, the `console.log` should return the following from our constructed `messages` array:

```json
[
  {
    role: 'system',
    content: '\n' +
      '    Write a Typescript module that will make these tests pass and conforms to the passed conventions.\n' +
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

Programmatically managing the messages prompt gives us a lot of power over the LLM. In the following section, we will begin to send this messages array to our LLM and agentically adjusting it.

## Sending prompt to AI

> Node #2: Let's chat with ChatGPT

Let's build a simple interaction with our LLM, sending our `messages` array to ChatGPT via their SDK.

Here's the `chat` function I use. The file is located at `utils/chat.ts`. It takes in our `messages` array and returns the content results.

```ts
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

Add `call` to our `generateFunctionFromSpec` function:

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
    Write a Typescript module that will make these tests pass and conforms to the passed conventions.

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

Add the `console.log(response)` line and run this and you see see a response. In my case, the response looked like this:

```ts
function add(...numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

export { add };
```

Keep in mind your response may be a bit different simply due to ChatGPT's relative randomness.

Now, in my case, the `add` function it returned looks great. If I add the content to an `add.ts` file in my root directory, I can then run the command:

```bash
npm run test
```

This will test the `add.ts` file against our test file `add.spec.ts`. In my case, the tests passed, which is good news! We can see the LLM is generating working code, it's just a bit manual logging the code and adding it to a new file.

*Let's automate this.*

## Writing the LLM response to file

> Node #3:  Write response to file

Our LLM is returning working code, but right now we are manually:
1. Logging the response to the console
2. Copy + pasting the output to a file
3. Manually running the test command.

In this section, we will add a function that writes the `chat` response to a file (#1).

```ts
// utils/writeFileContent.ts
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Write file content programmatically
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

Now, let's use the `writeFileContent` within `generateFunctionFromSpec`:

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

We have to do a bit of null-checking via the `if (!response)` code. 

Once we ensure `response` is not null, we can pass it to our `writeFileContent` function alongside the `outputFilePath` we get from the `generateFunctionFromSpec` function parameters.

Running our code now will write the response to `add.ts`.

You should be able to run our test command, `npm run test`, and see the tests passing.

## Running our tests

> Node #4: Running tests after our function is generated

Our LLM is returning working code, but right now we are manually:

1. ~Logging the response to the console~
2. ~Copy + pasting the output to a file~
3. Manually running the test command.

Our `add.ts` function is being generated. Now, we just need to programmatically run our tests. We will be using Node's [exec](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) function.

```ts
// utils/runTests.ts
import { exec } from 'child_process'

/**
 * Runs tests and returns a promise with the test results
 * @param command Optional test command to run (defaults to 'npm run test')
 * @returns Promise that resolves to an object with test results
 */
export function runTests(
    command: string = 'npm run test'
): Promise<{ passed: boolean; output: string }> {
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

            resolve({ passed, output: testOutput })
        })
    })
}
```

There are two key things happening within this function:

1. Running `exec(command)` with command defaulting to `npm run test` which is our test command defined in our `package.json` file.
2. Checking if the tests passed.

```ts
const passed =
	stdout.includes('✓') &&
	!stdout.includes('✗') &&
	!stdout.includes('fail')
```

I'm using the output within the terminal to check against whether the tests pass.

Here's an example of the terminal output:

![](https://cln.sh/Y9y9LDN6+)

Our `passed` variable is parsing this output, and ensuring there are  `✓` characters and no `✗` or `fail`.

This works good enough. But, if you know of a better way please let me know!

Now, let's extend our `generateFunctionFromSpec` file to also run the tests:

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
        const { passed, output } = await runTests(testCommand)
        console.log(passed, output)
    }
	
	return null
}
```

We can now call `runTests` and check the passed + output values as needed. Both of these values will be used soon!

## Making this agentic

> While loop = agent?

We've implemented the main flow:

```mermaid
flowchart LR
    Z[Generate prompt];
    Z --> Y[Send prompt to AI];
    Y --> X[Write response to file];
    X --> V[Run tests];
```

The goal is to adjust our code to make it look like Anthropic's [Agents](https://www.anthropic.com/engineering/building-effective-agents) diagram:

![](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F58d9f10c985c4eb5d53798dea315f7bb5ab6249e-2401x1000.png&w=3840&q=75)

Let's connect the labels of this diagram to our own:

- **Human:** This is the test file we wrote ([add.test.ts](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/tests/add.spec.ts)) ✅.
- **LLM Call**: This is our [chat](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/utils/chat.ts) function talking to ChatGPT with a prompt built alongside our test file's content ✅.
- **Environment:** This is a check to see if our tests pass ([runTests.ts](https://github.com/CodyBontecou/typescript-llm4tdd-example/blob/01/add/utils/runTests.ts)) ✅.
	- *Feedback* is the response from our tests ✖︎.
	- *Action* is running our tests with the new response from the LLM ✖︎.
- **Stop:** This occurs when our tests pass ✖︎.

We've built the data flow, but we haven't built the ability to take in feedback and apply it to future actions when the tests do not pass. 

This is where the **while** loop comes in.

Adjust `generateFunctionFromSpec` to continuously run until our tests pass:

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

Now when you run `index.ts` using the `npm run tdd` script, you will continuously call ChatGPT until it generates an `add.ts` function that passes all of the tests.

There are a few issues with this approach that we will begin to tackle in the following sections. 
1. This can potentially be infinite - *what if you write a test that can never pass?*
2. It's not applying feedback. It's only applying the action using a new response from the LLM.
## Improving the agent with maxAttempts

> This can potentially be infinite - *what if you write a test that can never pass?*

There are cases where you may want an agent constantly on in the background in an infinite loop, but this is not one of them.

I want my agent to have an escape hatch.

We'll implement this using a `maxAttempts` variable that is kept track of during our while loop. After each iteration, we will add to our attempts until it equals `maxAttempts` in which case we break out of the loop.

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

The goal is break out of the agent if one of two conditions are met:

1. Tests pass
2. `attempts === maxAttempts`

Our test passing case is in place, but not the attempts logic:

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

Here we extract the `maxAttempts` value from our function's `options` parameter. If the `maxAttempts` option is not passed to the function, it defaults to 5.

Then we define `let attempts = 0`, increment if every loop iteration, and adjust the while loop to check if we've reached our `maxAttempts`:

```ts
while (!testPassed && attempts < maxAttempts) {
	attempts++
	// rest of our code
}
```

Our code should now run continuously until our tests pass or once we reach our pre-defined max attempts.

## Adapting our prompt to feedback

We want each agentic loop (attempt) to apply the feedback we received during the previous iteration.

We'll be using the logs our tests prints to our console. When a test fails, it provides a ton of high-quality failure information. This includes the test failure message and which line the code/test failed on.

We will take this output and append it to our `messages` array so that every attempt will have the context of each attempt within our agentic loop.

```ts
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

Here's the final source code of our `generateFunctionFromSpec` function:

```ts
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
    Write a Typescript module that will make these tests pass and conforms to the passed conventions.

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

