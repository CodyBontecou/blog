<template>
  <nav aria-label="Breadcrumb" class="mb-8">
    <ol class="flex items-center flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400">/</span>
        </template>
        
        <template v-if="item.path && !item.isActive">
          <a 
            :href="item.path" 
            class="hover:text-gray-900 transition-colors"
            :aria-current="item.isActive ? 'page' : undefined"
          >
            {{ item.name }}
          </a>
        </template>
        
        <template v-else>
          <span 
            class="text-gray-900 font-medium max-w-xs sm:max-w-none truncate"
            :aria-current="item.isActive ? 'page' : undefined"
            :title="item.name"
          >
            {{ item.name }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  path?: string
  isActive?: boolean
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>