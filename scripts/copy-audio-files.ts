import { cpSync, mkdirSync, existsSync } from 'fs';

function copyAudioFiles() {
  console.log('📁 Copying audio files to public directory...');
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
}

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  copyAudioFiles();
}

export { copyAudioFiles };