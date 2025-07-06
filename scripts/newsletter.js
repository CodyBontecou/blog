#!/usr/bin/env node

// Simple CLI that uses tsx to run the TypeScript version
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Check if tsx is installed
const tsxPath = join(__dirname, '..', 'node_modules', '.bin', 'tsx')
const scriptPath = join(__dirname, 'newsletter.ts')

const args = process.argv.slice(2)
const child = spawn('npx', ['tsx', scriptPath, ...args], {
  stdio: 'inherit',
  shell: true
})

child.on('exit', (code) => {
  process.exit(code || 0)
})