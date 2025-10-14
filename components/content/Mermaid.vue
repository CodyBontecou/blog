<template>
    <div class="mermaid" v-if="show">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'

const show = ref(false)

onMounted(async () => {
    show.value = true
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default'
    })
    await nextTick()
    mermaid.run()
})
</script>
