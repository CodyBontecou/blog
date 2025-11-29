<script setup lang="ts">
const props = defineProps<{
  videoUrl: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const showControls = ref(false)

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
  }
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
      :src="videoUrl"
      class="video-element"
      @click="togglePlay"
      controls
    ></video>

    <div :class="['custom-controls', { visible: showControls || !playing }]">
      <div class="progress-bar" @click="seek">
        <div class="progress-filled" :style="{ width: `${(currentTime / duration) * 100}%` }"></div>
      </div>

      <div class="bottom-controls">
        <button @click="togglePlay" class="control-btn">
          <svg v-if="!playing" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>

        <span class="time">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
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
  gap: 16px;
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

.time {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  color: white;
  font-variant-numeric: tabular-nums;
}
</style>
