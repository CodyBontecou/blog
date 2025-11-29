<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<Toast[]>([])
let nextId = 0

function addToast(message: string, type: Toast['type'] = 'info') {
  const id = nextId++
  toasts.value.push({ id, message, type })

  // Auto remove after 4 seconds
  setTimeout(() => {
    removeToast(id)
  }, 4000)
}

function removeToast(id: number) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose methods globally after mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    (window as any).__addToast = addToast
  }
})

defineExpose({ addToast })
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        @click="removeToast(toast.id)"
      >
        <div class="toast-icon">
          <svg v-if="toast.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg v-else-if="toast.type === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click.stop="removeToast(toast.id)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  max-width: 480px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-success {
  border-color: #2e7d32;
}

.toast-success .toast-icon {
  color: #2e7d32;
}

.toast-error {
  border-color: #d32f2f;
}

.toast-error .toast-icon {
  color: #d32f2f;
}

.toast-info {
  border-color: #1976d2;
}

.toast-info .toast-icon {
  color: #1976d2;
}

.toast-message {
  flex: 1;
  color: #1a1a1a;
  line-height: 1.5;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  color: #1a1a1a;
}

/* Animations */
.toast-enter-active {
  animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  animation: toastSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes toastSlideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toastSlideOut {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .toast {
    background: #1a1a1a;
    border-color: #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  .toast:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  }

  .toast-message {
    color: #fafafa;
  }

  .toast-success {
    border-color: #4caf50;
  }

  .toast-success .toast-icon {
    color: #4caf50;
  }

  .toast-error {
    border-color: #f44336;
  }

  .toast-error .toast-icon {
    color: #f44336;
  }

  .toast-info {
    border-color: #2196f3;
  }

  .toast-info .toast-icon {
    color: #2196f3;
  }

  .toast-close {
    color: #666;
  }

  .toast-close:hover {
    color: #fafafa;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .toast-container {
    top: 16px;
    right: 16px;
    left: 16px;
  }

  .toast {
    min-width: auto;
    max-width: none;
  }
}
</style>
