<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { t } = useI18n()
const { toast } = useToast()

onMounted(() => {
    toast({
        duration: 5000,
        title: t('work.title'),
        description: t('work.description'),
    })
})
</script>

<template>
    <div>
        <Toaster />
        <NuxtPage />
    </div>
</template>
