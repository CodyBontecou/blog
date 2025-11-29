<script setup lang="ts">
const comments = ref()
const route = useRoute()

watch(route, (newRoute, _) => {
    createUtteranceScriptElement(newRoute.path)
})

onMounted(() => {
    createUtteranceScriptElement(route.path)
})

function createUtteranceScriptElement(path: string) {
    const script = document.createElement('script')

    script.setAttribute('src', 'https://utteranc.es/client.js')
    script.setAttribute('repo', 'codybontecou/blog-nuxt-content')
    script.setAttribute('issue-term', path.replace(/^\//, ''))
    script.setAttribute('label', 'Comments')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', 'true')

    comments.value.innerHTML = ''
    comments.value.appendChild(script)
}
</script>

<template>
    <section ref="comments"></section>
</template>
