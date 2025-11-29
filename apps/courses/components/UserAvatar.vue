<script setup lang="ts">
const { supabase, user } = useSupabase()

const showMenu = ref(false)

const userInitials = computed(() => {
  if (!user.value) return ''

  // Try to get name from user metadata
  const name = user.value.user_metadata?.full_name || user.value.email

  if (!name) return '?'

  // If it's an email, use first letter
  if (name.includes('@')) {
    return name.charAt(0).toUpperCase()
  }

  // Otherwise get initials from name
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  return name.charAt(0).toUpperCase()
})

async function handleSignOut() {
  await supabase.auth.signOut()
  showMenu.value = false
  await navigateTo('/')
}

function toggleMenu() {
  showMenu.value = !showMenu.value
}

// Close menu when clicking outside
if (process.client) {
  onMounted(() => {
    document.addEventListener('click', (e) => {
      const avatar = document.querySelector('.user-avatar-wrapper')
      if (avatar && !avatar.contains(e.target as Node)) {
        showMenu.value = false
      }
    })
  })
}
</script>

<template>
  <div class="user-avatar-wrapper">
    <!-- Not Authenticated -->
    <NuxtLink v-if="!user" to="/login" class="auth-link">
      <span class="auth-text">Sign In</span>
      <div class="auth-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"/>
          <path d="M3 15C3 12.2386 5.23858 10 8 10C10.7614 10 13 12.2386 13 15"/>
        </svg>
      </div>
    </NuxtLink>

    <!-- Authenticated -->
    <div v-else class="avatar-container">
      <button @click="toggleMenu" class="avatar-button" :class="{ active: showMenu }">
        <span class="avatar-initials">{{ userInitials }}</span>
        <div class="avatar-indicator"></div>
      </button>

      <!-- Dropdown Menu -->
      <Transition name="menu">
        <div v-if="showMenu" class="avatar-menu">
          <div class="menu-header">
            <div class="menu-email">{{ user.email }}</div>
          </div>
          <div class="menu-divider"></div>
          <button @click="handleSignOut" class="menu-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11 15H3C2.44772 15 2 14.5523 2 14V2C2 1.44772 2.44772 1 3 1H11"/>
              <path d="M11 11L14 8L11 5"/>
              <path d="M14 8H6"/>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

.user-avatar-wrapper {
  position: relative;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

/* Not Authenticated State */
.auth-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  text-decoration: none;
  color: #666;
  border: 1px solid #e0e0e0;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-link:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.auth-text {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.auth-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Authenticated State */
.avatar-button {
  position: relative;
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.avatar-button:hover,
.avatar-button.active {
  border-color: #1a1a1a;
  transform: translateY(-1px);
}

.avatar-initials {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.avatar-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 6px;
  height: 6px;
  background: #4caf50;
  border: 1px solid white;
}

/* Dropdown Menu */
.avatar-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.menu-header {
  padding: 16px;
}

.menu-email {
  font-size: 13px;
  color: #666;
  word-break: break-all;
  line-height: 1.5;
}

.menu-divider {
  height: 1px;
  background: #e0e0e0;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item svg {
  flex-shrink: 0;
}

/* Menu Transition */
.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .auth-link {
    background: #1a1a1a;
    border-color: #333;
    color: #999;
  }

  .auth-link:hover {
    border-color: #fafafa;
    color: #fafafa;
  }

  .avatar-button {
    background: #1a1a1a;
    border-color: #333;
  }

  .avatar-button:hover,
  .avatar-button.active {
    border-color: #fafafa;
  }

  .avatar-initials {
    color: #fafafa;
  }

  .avatar-indicator {
    border-color: #1a1a1a;
  }

  .avatar-menu {
    background: #1a1a1a;
    border-color: #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  .menu-email {
    color: #999;
  }

  .menu-divider {
    background: #333;
  }

  .menu-item {
    color: #fafafa;
  }

  .menu-item:hover {
    background: #2a2a2a;
  }
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .auth-text {
    display: none;
  }

  .auth-link {
    padding: 10px;
  }

  .avatar-button {
    width: 36px;
    height: 36px;
  }

  .avatar-initials {
    font-size: 13px;
  }

  .avatar-menu {
    right: -8px;
  }
}
</style>
