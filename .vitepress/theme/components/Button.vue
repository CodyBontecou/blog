<template>
  <button 
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  if (props.variant === 'outline') {
    return `${base} border border-input bg-background hover:bg-accent hover:text-accent-foreground`
  }
  
  return `${base} bg-primary text-primary-foreground hover:bg-primary/90`
})
</script>