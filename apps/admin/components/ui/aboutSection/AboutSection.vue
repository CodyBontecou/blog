<script setup lang="ts">
interface Props {
    links: Link[]
    header: string
    separate: boolean
}

interface Link {
    to: string
    name: string
}

defineProps<Props>()
</script>

<template>
    <h2 class="my-4">{{ header }}</h2>
    <ul class="list-disc list-inside space-y-1 underline">
        <li v-for="link in links">
            <NuxtLink :to="link.to">
                {{ link.name }}
            </NuxtLink>
        </li>
    </ul>

    <Separator v-if="separate" class="my-10"></Separator>
</template>
