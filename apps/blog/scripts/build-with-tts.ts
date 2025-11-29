import { readFileSync, readdirSync, statSync, cpSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { TtsGenerator } from './tts-generator.js';

async function buildWithTts() {
  console.log('🚀 Building blog with TTS generation...');
  
  const ttsGenerator = new TtsGenerator();
  const contentDir = 'content';
  
  // Find all markdown files
  const markdownFiles = findMarkdownFiles(contentDir);
  
  console.log(`📁 Found ${markdownFiles.length} markdown files`);
  
  // Process each markdown file
  let successCount = 0;
  let skipCount = 0;
  
  for (const file of markdownFiles) {
    console.log(`\n📄 Processing: ${file}`);
    
    try {
      const result = await ttsGenerator.generateForPost(file);
      
      if (result) {
        successCount++;
        console.log(`✅ Generated audio: ${result}`);
      } else {
        skipCount++;
        console.log(`⏭️  Skipped: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log(`\n🎉 TTS generation complete!`);
  console.log(`✅ Generated: ${successCount} audio files`);
  console.log(`⏭️  Skipped: ${skipCount} files`);
  
  // Copy audio files to public directory
  console.log('\n📁 Copying audio files to public directory...');
  const sourceAudioDir = 'content/audio';
  const targetAudioDir = 'public/audio';
  
  try {
    if (existsSync(sourceAudioDir)) {
      // Create public/audio directory if it doesn't exist
      if (!existsSync(targetAudioDir)) {
        mkdirSync(targetAudioDir, { recursive: true });
      }
      
      // Copy all files from content/audio to public/audio
      cpSync(sourceAudioDir, targetAudioDir, { recursive: true });
      console.log('✅ Audio files copied successfully');
    } else {
      console.log('⚠️  No audio directory found, skipping copy');
    }
  } catch (error) {
    console.error('❌ Error copying audio files:', error);
  }
  
  // Now run the regular VitePress build
  console.log('\n📦 Running VitePress build...');
  const { execSync } = await import('child_process');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ VitePress build complete!');
  } catch (error) {
    console.error('❌ VitePress build failed:', error);
    process.exit(1);
  }
}

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.endsWith('.md') && !entry.startsWith('.')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildWithTts().catch((error) => {
    console.error('❌ Build failed:', error);
    process.exit(1);
  });
}