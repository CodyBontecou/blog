<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { ref, watch } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()
const currentRoute = ref(route)

watch(route, (newRoute, oldRoute) => {
  currentRoute.value = newRoute.path
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Comments
        repo="CodyBontecou/blog"
        theme="github-dark"
        :issue-term="currentRoute.value"
      />
    </template>
  </Layout>
</template>
