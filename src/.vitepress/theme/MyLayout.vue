<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Post repo="CodyBontecou/blog" theme="github-dark" />
    </template>
  </Layout>
</template>
