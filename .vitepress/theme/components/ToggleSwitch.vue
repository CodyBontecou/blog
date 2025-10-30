<template>
  <div class="flex items-center">
    <div 
      class="relative inline-flex items-center h-10 bg-gray-100 rounded-full p-1 cursor-pointer transition-colors duration-200"
      @click="toggleView"
    >
      <div 
        class="absolute top-1 bottom-1 w-20 bg-gray-900 rounded-full transition-transform duration-200 ease-in-out"
        :class="isAbout ? 'translate-x-20' : 'translate-x-0'"
      ></div>
      <div class="relative flex">
        <button
          class="relative z-10 px-4 py-1 text-sm font-medium transition-colors duration-200 rounded-full w-20 text-center"
          :class="!isAbout ? 'text-white' : 'text-gray-600'"
        >
          Writing
        </button>
        <button
          class="relative z-10 px-4 py-1 text-sm font-medium transition-colors duration-200 rounded-full w-20 text-center"
          :class="isAbout ? 'text-white' : 'text-gray-600'"
        >
          About
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isAbout = computed(() => props.modelValue)

const toggleView = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>