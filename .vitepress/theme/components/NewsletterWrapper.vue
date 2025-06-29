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
    const { error } = await subscribeUserToNewsletter(emailInput.value)

    emailInput.value = ''

    if (error.length) {
        toast({
            title: t('newsletter.signupError'),
            description: t('newsletter.signupErrorDescription'),
        })
    } else {
        toast({
            title: t('newsletter.successTitle'),
            description: t('newsletter.successDescription'),
        })
    }
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ t('newsletter.cardTitle') }}</CardTitle>
            <CardDescription>
                {{ t('newsletter.cardDescription') }}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div class="flex space-x-1.5">
                        <Input
                            name="emailInput"
                            v-model="emailInput"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <Button class="self-end" type="submit">
                            {{ t('newsletter.submit') }}
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
</template>