<script setup lang="ts">
import { isVNode } from 'vue'
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '.'
import { useToast } from './use-toast'
import { useLocalStorage } from '~/composables/useLocalStorage'

const { toasts } = useToast()
const [, setValue] = useLocalStorage('toast:work', false)

const handleOpenEvent = async () => {
    setValue('toast:work', true)
}
</script>

<template>
    <ToastProvider>
        <Toast
            class="bg-white"
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toast"
            @update:open="handleOpenEvent"
        >
            <div class="grid gap-1">
                <ToastTitle v-if="toast.title">
                    {{ toast.title }}
                </ToastTitle>
                <template v-if="toast.description">
                    <ToastDescription v-if="isVNode(toast.description)">
                        <component :is="toast.description" />
                    </ToastDescription>
                    <ToastDescription v-else>
                        {{ toast.description }}
                    </ToastDescription>
                </template>
                <ToastClose />
            </div>
            <component :is="toast.action" />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
