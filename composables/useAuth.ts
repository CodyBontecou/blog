import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase-client'
import type { User } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const loading = ref(true)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  const getCurrentUser = async () => {
    loading.value = true
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
    } catch (error) {
      console.error('Error getting user:', error)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const initialize = async () => {
    // Get initial session
    await getCurrentUser()

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  return {
    user,
    loading,
    isAuthenticated,
    signInWithGitHub,
    signOut,
    getCurrentUser,
    initialize,
  }
}
