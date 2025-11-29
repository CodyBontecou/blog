<template>
    <AdminApp v-if="isAdminRoute" />
    <HomeLayout v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import HomeLayout from './components/HomeLayoutRedesign.vue'
import AdminApp from '../../components/AdminApp.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path === '/admin')
</script>
