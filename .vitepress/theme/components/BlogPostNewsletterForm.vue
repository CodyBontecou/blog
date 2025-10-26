<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '../../../components/ui/toast/use-toast'
import { useI18n } from '../composables/useI18n'
import { useNewsletter } from '../composables/useNewsletter'
import Card from '../../../components/ui/card/Card.vue'
import CardHeader from '../../../components/ui/card/CardHeader.vue'
import CardContent from '../../../components/ui/card/CardContent.vue'
import CardTitle from '../../../components/ui/card/CardTitle.vue'
import CardDescription from '../../../components/ui/card/CardDescription.vue'
import Input from '../../../components/ui/input/Input.vue'
import Button from '../../../components/ui/button/Button.vue'

const { toast } = useToast()
const { t } = useI18n()
const emailInput = ref('')
const isLoading = ref(false)
const { subscribeUserToNewsletter } = useNewsletter()

const handleSubmit = async () => {
    if (!emailInput.value.trim()) {
        toast({
            title: 'Email Required',
            description: 'Please enter your email address.',
            variant: 'destructive'
        })
        return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput.value.trim())) {
        toast({
            title: 'Invalid Email',
            description: 'Please enter a valid email address.',
            variant: 'destructive'
        })
        return
    }

    isLoading.value = true

    try {
        const result = await subscribeUserToNewsletter(emailInput.value.trim())

        if (result.success) {
            emailInput.value = ''
            toast({
                title: result.confirmationRequired ? 'Check Your Email' : 'Success!',
                description: result.message || 'You\'ve been successfully subscribed to the newsletter!',
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
    <div class="blog-post-newsletter">
        <Card>
            <CardHeader>
                <CardTitle>{{ t('newsletter.cardTitle') }}</CardTitle>
                <CardDescription>
                    {{ t('newsletter.cardDescription') }}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleSubmit">
                    <div class="flex flex-col gap-2 sm:flex-row sm:gap-1.5">
                        <Input
                            name="emailInput"
                            v-model="emailInput"
                            type="email"
                            placeholder="Enter your email"
                            :disabled="isLoading"
                            required
                            class="flex-1"
                        />
                        <Button type="submit" :disabled="isLoading" class="whitespace-nowrap">
                            {{ isLoading ? 'Subscribing...' : t('newsletter.submit') }}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>
.blog-post-newsletter {
    margin-top: 3rem;
    margin-bottom: 2rem;
}
</style>
