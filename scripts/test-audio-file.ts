import { existsSync, statSync } from 'fs';
import { join } from 'path';

function testAudioFile() {
  const audioPath = 'content/audio/a-beautiful-moment-on-highway-one.wav';
  
  console.log('🎵 Testing audio file...');
  console.log(`📁 Path: ${audioPath}`);
  
  if (existsSync(audioPath)) {
    const stats = statSync(audioPath);
    console.log(`✅ File exists`);
    console.log(`📊 Size: ${stats.size} bytes (${(stats.size / 1024).toFixed(2)} KB)`);
    console.log(`🕐 Modified: ${stats.mtime}`);
    
    // Check if it's a reasonable size for a WAV file
    if (stats.size > 1000) {
      console.log('✅ File size looks good for audio content');
    } else {
      console.log('⚠️  File size is very small, may not contain audio data');
    }
  } else {
    console.log('❌ Audio file not found');
  }
  
  // Test the URL that would be used in the browser
  const webPath = '/audio/a-beautiful-moment-on-highway-one.wav';
  console.log(`🌐 Web path: ${webPath}`);
  
  console.log('\n📝 To test in browser:');
  console.log('1. Go to: http://localhost:5174/a-beautiful-moment-on-highway-one');
  console.log('2. Check browser console for any errors');
  console.log('3. Try playing the audio');
}

testAudioFile();