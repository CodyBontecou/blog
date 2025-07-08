import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Create a proper mock WAV file with actual audio data
function createMockWavFile(): Buffer {
  const sampleRate = 44100;
  const duration = 5; // 5 seconds
  const numSamples = sampleRate * duration;
  const dataSize = numSamples * 2; // 16-bit samples
  const fileSize = 44 + dataSize;
  
  const buffer = Buffer.alloc(fileSize);
  
  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(fileSize - 8, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // PCM format size
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24); // Sample rate
  buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate (sample rate * channels * bytes per sample)
  buffer.writeUInt16LE(2, 32); // Block align (channels * bytes per sample)
  buffer.writeUInt16LE(16, 34); // Bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40); // Data size
  
  // Generate a simple sine wave tone (440 Hz A note)
  const frequency = 440;
  const amplitude = 8000; // Amplitude for 16-bit audio
  
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.sin(2 * Math.PI * frequency * i / sampleRate) * amplitude;
    const offset = 44 + i * 2;
    buffer.writeInt16LE(Math.round(sample), offset);
  }
  
  return buffer;
}

// Generate mock audio for our test blog post
const testPost = 'content/a-beautiful-moment-on-highway-one.md';
const content = readFileSync(testPost, 'utf-8');
const { data: frontmatter } = matter(content);

const slug = 'a-beautiful-moment-on-highway-one';
const audioPath = join('content/audio', `${slug}.wav`);

console.log(`Creating mock audio file: ${audioPath}`);

const mockWav = createMockWavFile();
writeFileSync(audioPath, mockWav);

console.log(`✅ Mock audio file created: ${audioPath}`);
console.log(`🎵 Title: ${frontmatter.title}`);
console.log(`📝 Content preview: ${content.slice(0, 100)}...`);