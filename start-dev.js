import { spawn } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Start VitePress with loaded environment
const vitepress = spawn('npx', ['vitepress', 'dev'], {
  stdio: 'inherit',
  env: { ...process.env }
});

vitepress.on('close', (code) => {
  process.exit(code);
});