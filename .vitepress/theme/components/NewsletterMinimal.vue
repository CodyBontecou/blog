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
    <div class="newsletter-minimal">
        <div class="newsletter-header">
            <div class="section-label">Newsletter</div>
            <p class="newsletter-description">
                {{ t('newsletter.cardDescription') }}
            </p>
        </div>
        <form @submit.prevent="handleSubmit" class="newsletter-form">
            <input
                v-model="emailInput"
                type="email"
                name="emailInput"
                placeholder="your@email.com"
                class="newsletter-input"
                required
            />
            <button type="submit" class="newsletter-button">
                Subscribe
            </button>
        </form>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

.newsletter-minimal {
    /* No background, minimal styling */
}

.newsletter-header {
    margin-bottom: 20px;
}

.section-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
    margin-bottom: 12px;
}

.newsletter-description {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    margin: 0;
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.newsletter-input {
    width: 100%;
    padding: 12px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1a1a;
    background: transparent;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    transition: border-color 0.3s ease;
}

.newsletter-input::placeholder {
    color: #999;
}

.newsletter-input:focus {
    border-bottom-color: #1a1a1a;
}

.newsletter-button {
    align-self: flex-start;
    padding: 10px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
    background: transparent;
    border: 1px solid #1a1a1a;
    cursor: pointer;
    transition: all 0.3s ease;
}

.newsletter-button:hover {
    background: #1a1a1a;
    color: #fafafa;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    .newsletter-description {
        color: #999;
    }

    .newsletter-input {
        color: #fafafa;
        border-bottom-color: #333;
    }

    .newsletter-input::placeholder {
        color: #666;
    }

    .newsletter-input:focus {
        border-bottom-color: #fafafa;
    }

    .newsletter-button {
        color: #fafafa;
        border-color: #fafafa;
    }

    .newsletter-button:hover {
        background: #fafafa;
        color: #1a1a1a;
    }
}
</style>
