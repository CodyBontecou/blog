<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')
const isLoading = ref(false)
const { subscribeUserToNewsletter } = useNewsletter()

// Add debug log to verify component is loading
console.log('📋 Newsletter component loaded, useNewsletter:', typeof subscribeUserToNewsletter)

const handleSubmit = async () => {
    console.log('🚀 Newsletter form submitted with email:', emailInput.value)
    
    if (!emailInput.value.trim()) {
        toast({
            title: 'Email Required',
            description: 'Please enter your email address.',
            variant: 'destructive'
        })
        return
    }

    isLoading.value = true
    
    try {
        console.log('📞 Calling subscribeUserToNewsletter...')
        const result = await subscribeUserToNewsletter(emailInput.value.trim())
        console.log('📬 Newsletter subscription result:', result)
        
        if (result.success) {
            emailInput.value = ''
            toast({
                title: result.confirmationRequired ? 'Check Your Email' : 'Success!',
                description: result.message,
            })
        } else {
            toast({
                title: 'Subscription Failed',
                description: result.message || 'Please try again.',
                variant: 'destructive'
            })
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
            variant: 'destructive'
        })
    } finally {
        isLoading.value = false
    }
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
                        <Button class="self-end" type="submit" :disabled="isLoading">
                            {{ isLoading ? 'Subscribing...' : $t('newsletter.submit') }}
                        </Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
