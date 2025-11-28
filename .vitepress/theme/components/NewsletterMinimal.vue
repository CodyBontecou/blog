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
            variant: 'default',
        })
    } else {
        toast({
            title: t('newsletter.signupError'),
            description: result.message || t('newsletter.signupErrorDescription'),
            variant: 'destructive',
        })
    }
}
</script>

<template>
    <div class="newsletter-minimal">
        <div class="newsletter-frame">
            <div class="newsletter-accent-bar"></div>
            <div class="newsletter-content">
                <div class="newsletter-header">
                    <div class="newsletter-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                    </div>
                    <h3 class="newsletter-title">Stay in the Loop</h3>
                    <p class="newsletter-description">
                        Get thoughtful insights on web development, AI, and emerging tech delivered to your inbox. No spam, just good reads.
                    </p>
                </div>
                <form @submit.prevent="handleSubmit" class="newsletter-form">
                    <div class="input-wrapper">
                        <input
                            v-model="emailInput"
                            type="email"
                            name="emailInput"
                            placeholder="your@email.com"
                            class="newsletter-input"
                            required
                        />
                        <div class="input-line"></div>
                    </div>
                    <button type="submit" class="newsletter-button">
                        <span class="button-text">Subscribe</span>
                        <span class="button-arrow">→</span>
                    </button>
                </form>
                <div class="newsletter-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>Unsubscribe anytime</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap');

.newsletter-minimal {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Frame Container */
.newsletter-frame {
    position: relative;
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    padding: 32px 28px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
}

.newsletter-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 80% 20%, rgba(26, 26, 26, 0.02) 0%, transparent 50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.newsletter-frame:hover::before {
    opacity: 1;
}

.newsletter-frame:hover {
    border-color: #1a1a1a;
    box-shadow: 0 8px 32px rgba(26, 26, 26, 0.08);
    transform: translateY(-2px);
}

/* Accent Bar */
.newsletter-accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #1a1a1a 0%, #666 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.newsletter-frame:hover .newsletter-accent-bar {
    transform: scaleX(1);
}

.newsletter-content {
    position: relative;
}

/* Header */
.newsletter-header {
    margin-bottom: 24px;
}

.newsletter-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(26, 26, 26, 0.05);
    border-radius: 50%;
    color: #1a1a1a;
    margin-bottom: 16px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.newsletter-frame:hover .newsletter-icon {
    background: #1a1a1a;
    color: #fafafa;
    transform: rotate(360deg) scale(1.1);
}

.newsletter-title {
    font-family: 'Crimson Pro', serif;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #1a1a1a;
    margin: 0 0 12px 0;
}

.newsletter-description {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    line-height: 1.6;
    color: #666;
    margin: 0;
}

/* Form */
.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.input-wrapper {
    position: relative;
}

.newsletter-input {
    width: 100%;
    padding: 14px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1a1a;
    background: transparent;
    border: none;
    border-bottom: 2px solid #e0e0e0;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.newsletter-input::placeholder {
    color: #999;
    font-style: italic;
}

.newsletter-input:focus {
    border-bottom-color: transparent;
}

.input-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #1a1a1a 0%, #666 100%);
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.newsletter-input:focus + .input-line {
    width: 100%;
}

/* Button */
.newsletter-button {
    align-self: flex-start;
    position: relative;
    padding: 12px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #fafafa;
    background: #1a1a1a;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 8px;
}

.newsletter-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(250, 250, 250, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
}

.newsletter-button:hover::before {
    width: 300px;
    height: 300px;
}

.newsletter-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26, 26, 26, 0.25);
}

.newsletter-button:active {
    transform: translateY(0);
}

.button-text {
    position: relative;
    z-index: 1;
}

.button-arrow {
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-size: 16px;
}

.newsletter-button:hover .button-arrow {
    transform: translateX(4px);
}

/* Badge */
.newsletter-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: #999;
    opacity: 0.8;
}

.newsletter-badge svg {
    flex-shrink: 0;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    .newsletter-frame {
        background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
        border-color: #333;
    }

    .newsletter-frame::before {
        background: radial-gradient(circle at 80% 20%, rgba(250, 250, 250, 0.03) 0%, transparent 50%);
    }

    .newsletter-frame:hover {
        border-color: #fafafa;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .newsletter-accent-bar {
        background: linear-gradient(90deg, #fafafa 0%, #999 100%);
    }

    .newsletter-icon {
        background: rgba(250, 250, 250, 0.08);
        color: #fafafa;
    }

    .newsletter-frame:hover .newsletter-icon {
        background: #fafafa;
        color: #1a1a1a;
    }

    .newsletter-title {
        color: #fafafa;
    }

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

    .input-line {
        background: linear-gradient(90deg, #fafafa 0%, #999 100%);
    }

    .newsletter-button {
        color: #1a1a1a;
        background: #fafafa;
    }

    .newsletter-button::before {
        background: rgba(26, 26, 26, 0.15);
    }

    .newsletter-button:hover {
        box-shadow: 0 8px 24px rgba(250, 250, 250, 0.2);
    }

    .newsletter-badge {
        color: #666;
    }
}

/* Responsive */
@media (max-width: 640px) {
    .newsletter-frame {
        padding: 24px 20px;
    }

    .newsletter-title {
        font-size: 20px;
    }

    .newsletter-description {
        font-size: 12px;
    }
}
</style>
