<script setup lang="ts">
import Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'assets/css/vsCodeDark.css'

interface Props {
    jsonData: Object
}

const props = defineProps<Props>()

onMounted(() => {
    nextTick(() => {
        Prism.highlightAll()
    })
})

watch(
    () => props.jsonData,
    () => {
        nextTick(() => {
            Prism.highlightAll()
        })
    }
)
</script>

<template>
    <code class="language-json">{{ jsonData }}</code>
</template>

<style scoped>
:not(pre) > code[class*='language-'] {
    @apply !bg-gray-900;
}
</style>
