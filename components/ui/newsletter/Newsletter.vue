<script setup lang="ts">
import { addToMailchimp } from '~/lib/utils/addToMailchimp'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')

const handleSubmit = async () => {
    await addToMailchimp(emailInput.value)

    emailInput.value = ''

    toast({
        title: t('newsletter.successTitle'),
        description: t('newsletter.successDescription'),
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
                    <div class="flex flex-col space-y-1.5">
                        <Label for="emailInput">
                            {{ $t('newsletter.email') }}
                        </Label>
                        <Input
                            name="emailInput"
                            v-model="emailInput"
                            type="email"
                            placeholder="Your email"
                        />
                    </div>
                    <Button class="self-end" type="submit">
                        {{ $t('newsletter.submit') }}
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
