# Text-to-Speech (TTS) Integration Setup

This guide explains how to set up and use the Kokoro TTS integration for your blog.

## Overview

The TTS system automatically generates audio versions of your blog posts using the Kokoro TTS model via Replicate. Each blog post gets an audio player component that allows visitors to listen to the content.

## Components

### 1. TTS Generator (`scripts/tts-generator.ts`)
- Processes markdown content and extracts readable text
- Removes code blocks, formatting, and other non-readable elements
- Generates audio files using the Kokoro TTS model
- Saves audio files to `content/audio/`

### 2. Audio Player (`components/ui/AudioPlayer.vue`)
- SoundCloud-style audio player component
- Play/pause, skip forward/backward, volume control
- Progress bar with seeking capability
- Dark mode support

### 3. Blog Layout Integration
- Audio player automatically appears on blog posts
- Audio files are automatically linked based on the post slug
- Player only shows if an audio file exists

## Setup Instructions

### 1. Install Dependencies

```bash
npm install replicate
```

### 2. Set up Replicate API Key

1. Sign up at [replicate.com](https://replicate.com)
2. Get your API token from your account settings
3. Set the environment variable:

```bash
export REPLICATE_API_TOKEN="your-token-here"
```

Or add to your `.env.local`:
```
REPLICATE_API_TOKEN=your-token-here
```

### 3. Generate Audio for Blog Posts

#### Single Post
```bash
npx tsx scripts/tts-generator.ts content/your-post.md
```

#### All Posts (Build Process)
```bash
npx tsx scripts/build-with-tts.ts
```

### 4. Test with Mock Audio

For testing without API calls:
```bash
npx tsx scripts/create-mock-audio.ts
```

## Usage

### Individual Post Generation

```typescript
import { TtsGenerator } from './scripts/tts-generator.js';

const generator = new TtsGenerator();
await generator.generateForPost('content/my-post.md');
```

### Custom Configuration

```typescript
const generator = new TtsGenerator({
  voice: 'af_nicole',  // Voice to use
  model: 'jaaari/kokoro-82m:...',  // Replicate model
  outputDir: 'content/audio'  // Output directory
});
```

## File Structure

```
public/
└── audio/
    ├── my-blog-post.wav
    ├── another-post.wav
    └── ...

components/
└── ui/
    └── AudioPlayer.vue

scripts/
├── tts-generator.ts
├── build-with-tts.ts
├── create-mock-audio.ts
└── test-tts.ts
```

## Features

### Audio Player Features
- ▶️ Play/pause toggle
- ⏪ Skip backward (10 seconds)
- ⏩ Skip forward (10 seconds)
- 🔊 Volume control
- 📊 Progress bar with seeking
- 🕐 Time display (current/total)
- 🌙 Dark mode support
- 📱 Mobile responsive

### TTS Processing Features
- Automatic markdown parsing
- Code block removal
- Link text extraction
- Formatting cleanup
- Draft post skipping
- Duplicate detection

## Build Integration

### Development
```bash
npm run dev
```

### Production Build with TTS
```bash
npx tsx scripts/build-with-tts.ts
```

### Add to Package.json
```json
{
  "scripts": {
    "build:tts": "tsx scripts/build-with-tts.ts",
    "tts:generate": "tsx scripts/tts-generator.ts"
  }
}
```

## Configuration

### Voice Options
Available voices in Kokoro model:
- `af_nicole` (default)
- `af_sarah`
- `am_adam`
- `am_michael`
- `bf_emma`
- `bf_isabella`
- `bm_george`
- `bm_lewis`

### Model Configuration
Current model: `jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13`

## Troubleshooting

### Common Issues

1. **401 Unauthorized Error**
   - Check your REPLICATE_API_TOKEN is set correctly
   - Verify token is valid in your Replicate account

2. **Audio Not Playing**
   - Check browser console for errors
   - Verify audio file exists in `public/audio/`
   - Check file permissions

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript compilation
   - Verify file paths are correct

### Debug Mode

Enable debug logging:
```bash
DEBUG=tts* npx tsx scripts/build-with-tts.ts
```

## Cost Considerations

- Kokoro TTS costs ~$0.01 per 1000 characters
- Average blog post (1000 words) ≈ $0.05-0.10
- Consider caching audio files to avoid regeneration
- Skip drafts and test posts to reduce costs

## Future Enhancements

- [ ] Multiple voice selection per post
- [ ] Batch processing optimization
- [ ] Audio file compression
- [ ] Streaming audio support
- [ ] Playlist functionality
- [ ] Speed control
- [ ] Transcript display
- [ ] Auto-play next post