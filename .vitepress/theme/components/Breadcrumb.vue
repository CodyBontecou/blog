<template>
  <nav aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="index">
        <template v-if="index > 0">
          <span>/</span>
        </template>

        <template v-if="item.path && !item.isActive">
          <a
            :href="item.path"
            :aria-current="item.isActive ? 'page' : undefined"
          >
            {{ item.name }}
          </a>
        </template>

        <template v-else>
          <span
            :aria-current="item.isActive ? 'page' : undefined"
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