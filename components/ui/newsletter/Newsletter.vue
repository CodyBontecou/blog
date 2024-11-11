<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')

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

const subscribeUserToNewsletter = async (email: string) => {
    return await useFetch('/api/subscribeUser', {
        method: 'POST',
        body: { email },
    })
}
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ $t('newsletter.cardTitle') }}</CardTitle>
            <CardDescription>
                {{ $t('newsletter.cardDescription') }}
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
                            {{ $t('newsletter.submit') }}
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
