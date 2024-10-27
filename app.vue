<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
        <!-- Header -->
        <header class="flex justify-between items-center mb-16">
            <h1 class="">
                <NuxtLink to="/" class="hover:opacity-75">
                    Cody Bontecou
                    <span v-if="route.name === 'slug'" class="text-gray-600">
                        / Writing
                    </span>
                </NuxtLink>
            </h1>
            <nav class="flex gap-6 text-gray-600">
                <NuxtLink to="/about"> About </NuxtLink>
                <NuxtLink to="/now"> Now </NuxtLink>
            </nav>
        </header>

        <NuxtPage />
    </div>
</template>
