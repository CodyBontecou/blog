<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed, ref, watch, onMounted } from 'vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Comments />
    </template>
  </Layout>
</template>
