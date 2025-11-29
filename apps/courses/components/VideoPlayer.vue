<script setup lang="ts">
const props = defineProps<{
  videoUrl: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const playerRef = ref<HTMLElement | null>(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const showControls = ref(false)
const volume = ref(1)
const showVolumeSlider = ref(false)
const isFullscreen = ref(false)

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function togglePlay() {
  if (!videoRef.value) return
  if (playing.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
}

function seek(event: MouseEvent) {
  if (!videoRef.value) return
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  videoRef.value.currentTime = pos * duration.value
}

function setVolume(event: Event) {
  if (!videoRef.value) return
  const target = event.target as HTMLInputElement
  const newVolume = parseFloat(target.value)
  volume.value = newVolume
  videoRef.value.volume = newVolume
}

function toggleMute() {
  if (!videoRef.value) return
  if (volume.value > 0) {
    videoRef.value.volume = 0
    volume.value = 0
  } else {
    videoRef.value.volume = 1
    volume.value = 1
  }
}

function toggleFullscreen() {
  if (!playerRef.value) return

  if (!document.fullscreenElement) {
    playerRef.value.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function downloadVideo() {
  const link = document.createElement('a')
  link.href = props.videoUrl
  link.download = props.videoUrl.split('/').pop() || 'video.mp4'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('play', () => {
      playing.value = true
    })

    videoRef.value.addEventListener('pause', () => {
      playing.value = false
    })

    videoRef.value.addEventListener('timeupdate', () => {
      currentTime.value = videoRef.value?.currentTime || 0
    })

    videoRef.value.addEventListener('loadedmetadata', () => {
      duration.value = videoRef.value?.duration || 0
    })

    videoRef.value.addEventListener('volumechange', () => {
      volume.value = videoRef.value?.volume || 0
    })

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement
    })
  }
})
</script>

<template>
  <div
    ref="playerRef"
    class="video-player"
    @mouseenter="showControls = true"
    @mouseleave="showControls = false"
  >
    <video
      ref="videoRef"
      :src="videoUrl"
      class="video-element"
      @click="togglePlay"
    ></video>

    <div :class="['custom-controls', { visible: showControls || !playing }]">
      <div class="progress-bar" @click="seek">
        <div class="progress-filled" :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
      </div>

      <div class="bottom-controls">
        <div class="left-controls">
          <button @click="togglePlay" class="control-btn">
            <svg v-if="!playing" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>

          <div
            class="volume-control"
            @mouseenter="showVolumeSlider = true"
            @mouseleave="showVolumeSlider = false"
          >
            <button @click="toggleMute" class="control-btn">
              <svg v-if="volume > 0.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
              <svg v-else-if="volume > 0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </button>

            <div :class="['volume-slider-container', { visible: showVolumeSlider }]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                :value="volume"
                @input="setVolume"
                class="volume-slider"
              />
            </div>
          </div>

          <span class="time">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </span>
        </div>

        <div class="right-controls">
          <button @click="downloadVideo" class="control-btn" title="Download video">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>

          <button @click="toggleFullscreen" class="control-btn" title="Toggle fullscreen">
            <svg v-if="!isFullscreen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  background: black;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.video-element {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}

/* Completely hide native browser controls */
.video-element::-webkit-media-controls {
  display: none !important;
}

.video-element::-webkit-media-controls-enclosure {
  display: none !important;
}

.video-element::-webkit-media-controls-panel {
  display: none !important;
}

.custom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.custom-controls.visible {
  opacity: 1;
  pointer-events: auto;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 16px;
}

.progress-bar:hover {
  height: 6px;
}

.progress-filled {
  height: 100%;
  background: #1a1a1a;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.bottom-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.left-controls,
.right-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.time {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: white;
  font-variant-numeric: tabular-nums;
  margin-left: 8px;
}

.volume-control {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider-container {
  position: absolute;
  left: 48px;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.volume-slider-container.visible {
  opacity: 1;
  pointer-events: auto;
}

.volume-slider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease;
}

.volume-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
}

/* Fullscreen adjustments */
.video-player:fullscreen {
  border-radius: 0;
}

.video-player:fullscreen .custom-controls {
  padding: 60px 40px 40px;
}
</style>
