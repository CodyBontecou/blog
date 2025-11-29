<script setup lang="ts">
interface Props {
    items: string[]
}

defineProps<Props>()
</script>

<template>
    <div class="relative">
        <div class="max-h-[80vh] overflow-y-auto">
            <div class="">
                <ArticleList :articles="items" />
            </div>
        </div>
        <!-- Fade overlays -->
        <!-- <div
            class="absolute -top-1 left-0 right-0 h-8 bg-gradient-to-b from-[#FBFCFF] to-transparent pointer-events-none"
        />
        <div
            class="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-[#FBFCFF] to-transparent pointer-events-none"
        /> -->
    </div>
</template>
