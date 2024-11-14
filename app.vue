<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { t } = useI18n()
const { toast } = useToast()
const { getValue } = useLocalStorage()

onMounted(() => {
    const toastShown = getValue('toast:work') as { closed: boolean }
    if (!toastShown) {
        toast({
            duration: 5000,
            title: t('work.title'),
            description:
                'Contact me at codybontecou@gmail.com if you would like to chat.',
        })
    }
})
</script>

<template>
    <div>
        <Toaster />
        <NuxtPage />
    </div>
</template>
