<template>
    <div :class="`language-${language || 'text'} ${$props.class || ''}`">
        <span class="lang" v-if="language">{{ language }}</span>
        <pre><code><slot /></code></pre>
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
