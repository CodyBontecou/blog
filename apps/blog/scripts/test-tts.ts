import 'dotenv/config';
import { TtsGenerator } from './tts-generator.js';

async function testTts() {
  console.log('🚀 Testing TTS generation...');
  
  const generator = new TtsGenerator();
  const testPost = 'content/a-beautiful-moment-on-highway-one.md';
  
  try {
    const result = await generator.generateForPost(testPost);
    
    if (result) {
      console.log('✅ TTS generation successful!');
      console.log(`📁 Audio file: ${result}`);
    } else {
      console.log('❌ TTS generation failed');
    }
  } catch (error) {
    console.error('❌ Error during TTS generation:', error);
  }
}

testTts();