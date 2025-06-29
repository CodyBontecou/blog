import { ref, watch, Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): [Ref<T>, (value: T) => void] {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue
  
  const state = ref<T>(initialValue)
  
  const setValue = (value: T) => {
    state.value = value
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  
  // Watch for changes and sync to localStorage
  watch(state, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })
  
  return [state, setValue]
}