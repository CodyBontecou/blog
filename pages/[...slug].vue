<script setup lang="ts">
import { BlogPost } from '@/components/ui/blogPost'
</script>

<template>
    <div class="max-w-3xl mx-0 md:mx-auto py-8 px-4">
        <TopNav />

        <Suspense>
            <!-- Main content -->
            <template #default>
                <BlogPost />
            </template>

            <!-- Loading state -->
            <template #fallback>
                <div class="animate-pulse">
                    <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
                    <div class="space-y-4">
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>
