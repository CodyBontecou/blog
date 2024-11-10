<script setup lang="ts">
import { addToMailchimp } from '~/lib/utils/addToMailchimp'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')

const handleSubmit = async () => {
    emailInput.value = ''



    toast({
        title: t('newsletter.successTitle'),
        description: t('newsletter.successDescription'),
    })
}

const subscribeUserToNewsletter = async (email: string) => {
    const { data, error } = await useFetch('/api/subscribe', {
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
