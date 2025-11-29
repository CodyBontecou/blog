<template>
    <div class="not-prose my-6">
        <pre :class="`${$props.class} overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded-lg text-sm`"><slot /></pre>
    </div>
</template>

<script setup lang="ts">
defineProps({
    code: {
        type: String,
        default: '',
    },
    language: {
        type: String,
        default: null,
    },
    filename: {
        type: String,
        default: null,
    },
    highlights: {
        type: Array as () => number[],
        default: () => [],
    },
    meta: {
        type: String,
        default: null,
    },
    class: {
        type: String,
        default: null,
    },
})
</script>

<style>
pre code .line {
    display: block;
}
</style>
