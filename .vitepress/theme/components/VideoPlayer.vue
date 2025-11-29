<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { supabase } from '~/lib/supabase/storage'
import { getVideoUrl } from '~/lib/supabase/storage'

const props = defineProps<{
  videoUrl: string
  lessonId: string
  courseId: string
  userId?: string
  initialProgress?: number
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const muted = ref(false)
const fullscreen = ref(false)
const loading = ref(true)
const signedUrl = ref<string | null>(null)
const showControls = ref(false)
const progressUpdateInterval = ref<number | null>(null)

// Format time as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Update progress in database
async function updateProgress() {
  if (!props.userId) return

  const { error } = await supabase
    .from('lesson_progress')
    .upsert({
      user_id: props.userId,
      lesson_id: props.lessonId,
      course_id: props.courseId,
      watched_seconds: Math.floor(currentTime.value),
      completed: currentTime.value >= duration.value * 0.9, // 90% completion
      last_watched_at: new Date().toISOString()
    })

  if (error) {
    console.error('Error updating progress:', error)
  }
}

// Play/Pause
function togglePlay() {
  if (!videoRef.value) return

  if (playing.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
}

// Seek
function seek(event: MouseEvent) {
  if (!videoRef.value) return

  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const pos = (event.clientX - rect.left) / rect.width
  videoRef.value.currentTime = pos * duration.value
}

// Volume
function changeVolume(event: Event) {
  if (!videoRef.value) return

  const target = event.target as HTMLInputElement
  const vol = parseFloat(target.value)
  volume.value = vol
  videoRef.value.volume = vol
  muted.value = vol === 0
}

function toggleMute() {
  if (!videoRef.value) return

  muted.value = !muted.value
  videoRef.value.muted = muted.value
}

// Fullscreen
function toggleFullscreen() {
  if (!videoRef.value) return

  if (!fullscreen.value) {
    if (videoRef.value.requestFullscreen) {
      videoRef.value.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// Speed control
const playbackRate = ref(1)
const showSpeedMenu = ref(false)
const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

function setPlaybackRate(rate: number) {
  if (!videoRef.value) return
  playbackRate.value = rate
  videoRef.value.playbackRate = rate
  showSpeedMenu.value = false
}

// Keyboard shortcuts
function handleKeyPress(event: KeyboardEvent) {
  if (!videoRef.value) return

  switch (event.key) {
    case ' ':
    case 'k':
      event.preventDefault()
      togglePlay()
      break
    case 'f':
      event.preventDefault()
      toggleFullscreen()
      break
    case 'm':
      event.preventDefault()
      toggleMute()
      break
    case 'ArrowLeft':
      event.preventDefault()
      videoRef.value.currentTime -= 5
      break
    case 'ArrowRight':
      event.preventDefault()
      videoRef.value.currentTime += 5
      break
    case 'ArrowUp':
      event.preventDefault()
      volume.value = Math.min(1, volume.value + 0.1)
      videoRef.value.volume = volume.value
      break
    case 'ArrowDown':
      event.preventDefault()
      volume.value = Math.max(0, volume.value - 0.1)
      videoRef.value.volume = volume.value
      break
  }
}

onMounted(async () => {
  // Get signed URL for video
  if (props.videoUrl.startsWith('http')) {
    signedUrl.value = props.videoUrl
  } else {
    signedUrl.value = await getVideoUrl(props.videoUrl)
  }

  if (videoRef.value) {
    // Set initial progress
    if (props.initialProgress) {
      videoRef.value.currentTime = props.initialProgress
    }

    // Event listeners
    videoRef.value.addEventListener('play', () => {
      playing.value = true
      // Update progress every 10 seconds
      progressUpdateInterval.value = window.setInterval(updateProgress, 10000)
    })

    videoRef.value.addEventListener('pause', () => {
      playing.value = false
      if (progressUpdateInterval.value) {
        clearInterval(progressUpdateInterval.value)
        progressUpdateInterval.value = null
      }
      updateProgress()
    })

    videoRef.value.addEventListener('timeupdate', () => {
      currentTime.value = videoRef.value?.currentTime || 0
    })

    videoRef.value.addEventListener('loadedmetadata', () => {
      duration.value = videoRef.value?.duration || 0
      loading.value = false
    })

    videoRef.value.addEventListener('volumechange', () => {
      if (videoRef.value) {
        volume.value = videoRef.value.volume
        muted.value = videoRef.value.muted
      }
    })

    videoRef.value.addEventListener('ended', () => {
      playing.value = false
      updateProgress()
    })

    document.addEventListener('fullscreenchange', () => {
      fullscreen.value = !!document.fullscreenElement
    })
  }

  // Keyboard shortcuts
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  if (progressUpdateInterval.value) {
    clearInterval(progressUpdateInterval.value)
  }
  window.removeEventListener('keydown', handleKeyPress)
  updateProgress()
})
</script>

<template>
  <div
    class="video-player"
    @mouseenter="showControls = true"
    @mouseleave="showControls = false"
  >
    <video
      ref="videoRef"
      :src="signedUrl || ''"
      class="video-element"
      @click="togglePlay"
    ></video>

    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div :class="['controls', { visible: showControls || !playing }]">
      <!-- Progress Bar -->
      <div class="progress-bar" @click="seek">
        <div class="progress-filled" :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
      </div>

      <!-- Bottom Controls -->
      <div class="bottom-controls">
        <div class="left-controls">
          <!-- Play/Pause -->
          <button @click="togglePlay" class="control-btn" title="Play/Pause (Space)">
            <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>

          <!-- Volume -->
          <div class="volume-control">
            <button @click="toggleMute" class="control-btn" title="Mute (M)">
              <svg v-if="!muted && volume > 0.5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
              <svg v-else-if="!muted && volume > 0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              :value="volume"
              @input="changeVolume"
              class="volume-slider"
            />
          </div>

          <!-- Time -->
          <span class="time">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </span>
        </div>

        <div class="right-controls">
          <!-- Speed -->
          <div class="speed-control">
            <button @click="showSpeedMenu = !showSpeedMenu" class="control-btn speed-btn">
              {{ playbackRate }}x
            </button>
            <div v-if="showSpeedMenu" class="speed-menu">
              <button
                v-for="speed in speedOptions"
                :key="speed"
                @click="setPlaybackRate(speed)"
                :class="['speed-option', { active: playbackRate === speed }]"
              >
                {{ speed }}x
              </button>
            </div>
          </div>

          <!-- Fullscreen -->
          <button @click="toggleFullscreen" class="control-btn" title="Fullscreen (F)">
            <svg v-if="!fullscreen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Keyboard Shortcuts Help -->
    <div class="shortcuts-hint">
      Space: Play/Pause • F: Fullscreen • M: Mute • ←/→: Seek
    </div>
  </div>
</template>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.video-element {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px 20px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.controls.visible {
  opacity: 1;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 16px;
  position: relative;
}

.progress-bar:hover {
  height: 6px;
}

.progress-filled {
  height: 100%;
  background: hsl(30, 70%, 50%);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.bottom-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.left-controls,
.right-controls {
  display: flex;
  align-items: center;
  gap: 12px;
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
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.time {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: white;
  font-variant-numeric: tabular-nums;
}

.speed-control {
  position: relative;
}

.speed-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
}

.speed-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.speed-option {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  text-align: left;
  transition: background 0.2s ease;
}

.speed-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.speed-option.active {
  background: hsl(30, 70%, 50%);
}

.shortcuts-hint {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.video-player:hover .shortcuts-hint {
  opacity: 1;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .volume-control,
  .shortcuts-hint {
    display: none;
  }

  .time {
    font-size: 0.8rem;
  }

  .controls {
    padding: 20px 12px 12px;
  }
}
</style>
