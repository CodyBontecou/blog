<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '../../../components/ui/toast/use-toast'
import { useI18n } from '../composables/useI18n'
import { useNewsletter } from '../composables/useNewsletter'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')
const { subscribeUserToNewsletter } = useNewsletter()

const handleSubmit = async () => {
    const result = await subscribeUserToNewsletter(emailInput.value)

    if (result.success) {
        emailInput.value = ''
        toast({
            title: result.confirmationRequired ? t('newsletter.checkEmail') : t('newsletter.successTitle'),
            description: result.message || t('newsletter.successDescription'),
        })
    } else {
        toast({
            title: t('newsletter.signupError'),
            description: result.message || t('newsletter.signupErrorDescription'),
        })
    }
}
</script>

<template>
    <div class="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-gray-50/50 dark:bg-gray-900/30">
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {{ t('newsletter.cardTitle') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ t('newsletter.cardDescription') }}
        </p>
        <form @submit.prevent="handleSubmit">
            <div class="flex gap-2">
                <Input
                    name="emailInput"
                    v-model="emailInput"
                    type="email"
                    placeholder="Enter your email"
                    class="flex-1"
                />
                <Button type="submit">
                    {{ t('newsletter.submit') }}
                </Button>
            </div>
        </form>
    </div>
</template>