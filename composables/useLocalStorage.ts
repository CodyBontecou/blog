// composables/useLocalStorage.ts
export const useLocalStorage = () => {
    const setValue = (key: string, value: any): void => {
        if (process.client) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    const getValue = <T>(key: string, defaultValue?: T): T | null => {
        if (process.client) {
            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : defaultValue || null
        }
        return defaultValue || null
    }

    const removeValue = (key: string): void => {
        if (process.client) {
            localStorage.setItem(key, '')
        }
    }

    return {
        setValue,
        getValue,
        removeValue,
    }
}
