<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import React from 'react'
import type { Ref } from 'vue'
import type {
    ExcalidrawInitialDataState,
    ExcalidrawProps,
} from '@excalidraw/excalidraw/types/types'
import { data as initialData } from './data'

export interface Props extends ExcalidrawProps {
    initialData?: ExcalidrawInitialDataState
}

const props = defineProps<Props>()

const excalidrawRef: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
    nextTick(async () => {
        if (excalidrawRef.value) {
            const Excalidraw = (await import('@excalidraw/excalidraw'))
                .Excalidraw
            const ReactDOM = await import('react-dom/client')

            // Merge props with initialData
            const excalidrawProps = {
                ...props,
                initialData: props.initialData || initialData,
                ref: excalidrawRef,
            }

            // Create root and render with proper typing
            const root = ReactDOM.createRoot(excalidrawRef.value)
            root.render(React.createElement(Excalidraw, excalidrawProps))
        }
    })
})
</script>

<template>
    <div ref="excalidrawRef" class="excalidraw-board" />
</template>

<style scoped>
.excalidraw-board {
    min-height: 100%;
    height: 90dvh;
}
</style>
