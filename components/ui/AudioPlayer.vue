<template>
    <div
        v-if="audioSrc && audioFileExists"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700"
    >
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
                <button
                    @click="togglePlayPause"
                    :disabled="!audioSrc || loading"
                    class="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-full transition-colors"
                >
                    <svg
                        v-if="loading"
                        class="w-5 h-5 animate-spin"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                            fill="none"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <svg
                        v-else-if="!isPlaying"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    <svg
                        v-else
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
                    </svg>
                </button>

                <div class="flex flex-col">
                    <span
                        class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        {{ title || 'Audio Version' }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ formatTime(currentTime) }} /
                        {{ formatTime(duration) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="relative">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    class="bg-blue-500 h-2 rounded-full transition-all duration-100"
                    :style="{ width: `${progress}%` }"
                ></div>
            </div>
            <input
                type="range"
                min="0"
                :max="duration"
                :value="currentTime"
                @input="seekTo"
                class="absolute inset-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
                style="background: transparent"
            />
        </div>

        <audio
            ref="audioElement"
            :src="audioSrc"
            @loadedmetadata="onLoadedMetadata"
            @timeupdate="onTimeUpdate"
            @ended="onEnded"
            @error="onError"
            preload="metadata"
        ></audio>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
    audioSrc?: string
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    audioSrc: '',
    title: '',
})

const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const loading = ref(false)
const audioFileExists = ref(false)

const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
})

const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePlayPause = async () => {
    if (!audioElement.value) return

    const audio = audioElement.value

    if (isPlaying.value) {
        audio.pause()
        isPlaying.value = false
    } else {
        loading.value = true
        try {
            await audio.play()
            isPlaying.value = true
        } catch (error) {
            console.error('Error playing audio:', error)
            isPlaying.value = false
        } finally {
            loading.value = false
        }
    }
}

const seekTo = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newTime = parseFloat(target.value)
    if (audioElement.value) {
        audioElement.value.currentTime = newTime
    }
}

const onLoadedMetadata = () => {
    if (audioElement.value) {
        duration.value = audioElement.value.duration
        audioFileExists.value = true
    }
}

// Check if audio file exists
const checkAudioFileExists = async () => {
    if (!props.audioSrc) {
        audioFileExists.value = false
        return
    }

    try {
        const response = await fetch(props.audioSrc, { method: 'HEAD' })
        audioFileExists.value = response.ok
    } catch (error) {
        audioFileExists.value = false
    }
}

const onTimeUpdate = () => {
    if (audioElement.value) {
        currentTime.value = audioElement.value.currentTime
    }
}

const onEnded = () => {
    isPlaying.value = false
    currentTime.value = 0
}

const onError = (error: Event) => {
    console.error('Audio error:', error)
    loading.value = false
    audioFileExists.value = false

    // Check if the audio file exists
    if (audioElement.value) {
        const audioEl = audioElement.value
        console.error('Audio error details:', {
            src: audioEl.src,
            networkState: audioEl.networkState,
            readyState: audioEl.readyState,
            error: audioEl.error,
        })
    }
}

// Watch for changes in audioSrc and check if file exists
watch(
    () => props.audioSrc,
    () => {
        checkAudioFileExists()
    },
    { immediate: true }
)

// Audio element event listeners
onMounted(() => {
    // Use nextTick to ensure the audio element is fully mounted
    setTimeout(() => {
        const audio = audioElement.value
        if (audio) {
            const onPlay = () => {
                isPlaying.value = true
                loading.value = false
            }

            const onPause = () => {
                isPlaying.value = false
            }

            audio.addEventListener('play', onPlay)
            audio.addEventListener('pause', onPause)

            // Clean up listeners on unmount
            onUnmounted(() => {
                audio.removeEventListener('play', onPlay)
                audio.removeEventListener('pause', onPause)
                audio.pause()
            })
        }
    }, 0)
})
</script>

<style scoped>
/* Custom range input styling */
input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
}

input[type='range']::-webkit-slider-track {
    background: transparent;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

input[type='range']::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
</style>
