<script setup lang="ts">
interface BreadcrumbItem {
    name: string
    path?: string
    isActive?: boolean
}

interface Props {
    items: BreadcrumbItem[]
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

// Generate structured data for breadcrumbs
useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.path ? `${config.public.siteUrl}${item.path}` : undefined,
    })),
})
</script>

<template>
    <nav aria-label="Breadcrumb" class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <template v-if="index > 0">
                    <span class="mx-2 text-gray-400">/</span>
                </template>
                
                <template v-if="item.path && !item.isActive">
                    <NuxtLink 
                        :to="item.path" 
                        class="hover:text-gray-900 transition-colors"
                        :aria-current="item.isActive ? 'page' : undefined"
                    >
                        {{ item.name }}
                    </NuxtLink>
                </template>
                
                <template v-else>
                    <span 
                        class="text-gray-900 font-medium"
                        :aria-current="item.isActive ? 'page' : undefined"
                    >
                        {{ item.name }}
                    </span>
                </template>
            </li>
        </ol>
    </nav>
</template>