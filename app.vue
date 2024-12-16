<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { t } = useI18n()
const { toast } = useToast()
const { getValue } = useLocalStorage()

const openToWorkDiv = h('div', {}, [
    t('work.contactMePrefix'),
    h(
        'a',
        {
            href: 'mailto:codybontecou@gmail.com',
            class: 'text-primary underline',
        },
        'codybontecou@gmail.com'
    ),
    t('work.contactMeSuffix'),
])

onMounted(() => {
    const toastShown = getValue('toast:work') as { closed: boolean }

    if (!toastShown) {
        toast({
            duration: 10000,
            title: t('work.title'),
            description: openToWorkDiv,
        })
    }
})
</script>

<template>
    <NuxtLayout>
        <Toaster />
        <NuxtPage />
    </NuxtLayout>
</template>
