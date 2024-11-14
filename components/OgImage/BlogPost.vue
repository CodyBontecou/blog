<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string
        description?: string
    }>(),
    {
        title: '',
        description: '',
    }
)
</script>

<template>
    <div
        class="h-full w-full flex items-start justify-start border-solid border-[12px] bg-gray-50"
    >
        <div class="flex items-start justify-start h-full w-full">
            <div class="flex flex-col justify-between w-full h-full">
                <div class="p-20 text-left">
                    <h1 class="text-[80px] font-black">
                        {{ title }}
                    </h1>
                    <p class="text-3xl -mt-2 font-medium opacity-50 w-2/3">
                        {{ description }}
                    </p>
                </div>
                <p class="self-end text-2xl pb-10 px-20 font-bold mb-0">
                    codybontecou.com
                </p>
            </div>
        </div>
    </div>
</template>
