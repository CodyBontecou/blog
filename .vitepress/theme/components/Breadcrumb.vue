<template>
  <nav aria-label="Breadcrumb" class="mb-8">
    <ol class="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <li v-for="(item, index) in items" :key="index" class="flex items-center max-w-full">
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400 dark:text-gray-500 flex-shrink-0">/</span>
        </template>

        <template v-if="item.path && !item.isActive">
          <a
            :href="item.path"
            class="hover:text-gray-900 dark:hover:text-white transition-colors truncate"
            :aria-current="item.isActive ? 'page' : undefined"
            :title="item.name"
          >
            {{ item.name }}
          </a>
        </template>

        <template v-else>
          <span
            class="text-gray-900 dark:text-gray-100 font-medium truncate max-w-md"
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