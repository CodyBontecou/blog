export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (typeof window !== 'undefined' && (window as any).__addToast) {
      (window as any).__addToast(message, type)
    }
  }

  const success = (message: string) => showToast(message, 'success')
  const error = (message: string) => showToast(message, 'error')
  const info = (message: string) => showToast(message, 'info')

  return {
    showToast,
    success,
    error,
    info
  }
}
