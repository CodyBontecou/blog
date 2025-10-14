<template>
  <div>
    <div @click="toggleView">
      <div>
        <button>
          Writing
        </button>
        <button>
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