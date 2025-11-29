<template>
    <header class="flex justify-between items-center mb-16 px-4 sm:px-0">
        <h1 class="">
            <NuxtLink to="/" class="hover:opacity-75"> Cody Bontecou </NuxtLink>
        </h1>
        <nav class="flex gap-3 sm:gap-6 text-gray-600 text-sm sm:text-base">
            <NuxtLink to="/"> {{ $t('writing.writing') }} </NuxtLink>
            <NuxtLink to="/about"> {{ $t('landing.learnMore') }} </NuxtLink>
        </nav>
    </header>
</template>
