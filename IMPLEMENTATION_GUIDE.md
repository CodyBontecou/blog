# Monorepo Implementation Guide

## ✅ What's Been Set Up

### 1. Monorepo Structure
```
├── apps/
│   ├── admin/     # Nuxt admin app (:3001)
│   ├── courses/   # Nuxt courses app (:3002)
│   └── blog/      # VitePress blog (:5173)
├── packages/
│   └── shared/    # Shared Supabase & types
```

### 2. Configuration Complete
- ✅ pnpm workspace configured
- ✅ Tailwind + custom fonts (Crimson Pro + DM Sans)
- ✅ Supabase composables
- ✅ Base styles matching HomeLayoutRedesign aesthetic
- ✅ Admin dashboard with GitHub auth

### 3. Admin App (`apps/admin`)
**Completed:**
- `/` - Dashboard with auth & courses list ✅
- Tailwind + base styling ✅
- Supabase composable ✅

**Pages to Create:**

#### `/courses/[id].vue` - Course Editor
```vue
<script setup lang="ts">
import type { Course } from '@blog/shared/lib/types/courses'

const route = useRoute()
const router = useRouter()
const { supabase } = useSupabase()

const courseId = route.params.id as string
const course = ref<Course | null>(null)
const loading = ref(true)
const saving = ref(false)

const form = ref({
  id: '',
  slug: '',
  title: '',
  description: '',
  thumbnail_url: '',
  is_free: true,
  price: 0,
  published: false
})

onMounted(async () => {
  if (courseId !== 'new') {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (data) {
      course.value = data
      form.value = { ...data }
    }
  }
  loading.value = false
})

async function saveCourse() {
  saving.value = true
  const { id, ...courseData } = form.value

  try {
    if (id) {
      await supabase.from('courses').update(courseData).eq('id', id)
    } else {
      const { data } = await supabase.from('courses').insert(courseData).select().single()
      if (data) form.value.id = data.id
    }
    router.push('/')
  } finally {
    saving.value = false
  }
}

async function deleteCourse() {
  if (!course.value || !confirm(`Delete "${course.value.title}"?`)) return
  await supabase.from('courses').delete().eq('id', course.value.id)
  router.push('/')
}
</script>

<template>
  <!-- Use same Tailwind styling as index.vue -->
  <!-- Two-column layout: main content + sidebar -->
  <!-- Include: title, slug, description (markdown editor), thumbnail, pricing, publish status -->
</template>
```

#### `/lessons/[courseId]/index.vue` - Lessons List
```vue
<script setup lang="ts">
// Load course + lessons
// Display lessons in order
// Buttons: New Lesson, Edit Lesson, Reorder
</script>
```

#### `/lessons/[courseId]/[lessonId].vue` - Lesson Editor
```vue
<script setup lang="ts">
// Similar to course editor
// Fields: title, slug, description, content (markdown), video upload, duration, order_index, published
</script>
```

### 4. Courses App (`apps/courses`)

#### `/index.vue` - Public Courses Catalog
```vue
<script setup lang="ts">
const { supabase } = useSupabase()
const courses = ref([])

onMounted(async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  courses.value = data || []
})
</script>

<template>
  <!-- Grid of course cards -->
  <!-- Each card: thumbnail, title, description, price/free, CTA -->
</template>
```

#### `/[slug].vue` - Course Detail Page
```vue
<script setup lang="ts">
// Load course by slug
// Show course details + lessons list
// Handle purchase flow if not free
// Link to lesson viewer
</script>
```

#### `/[slug]/[lessonSlug].vue` - Lesson Viewer
```vue
<script setup lang="ts">
// Check if user has access (free course or purchased)
// Show video player + lesson content
// Navigation to prev/next lessons
</script>
```

## 🔧 Components to Create

### Shared Components

Create in `apps/admin/components/` and `apps/courses/components/`:

1. **MarkdownEditor.vue** - Copy from `.vitepress/theme/components/`
2. **MarkdownRenderer.vue** - For displaying markdown
3. **VideoPlayer.vue** - For course lessons
4. **LoadingSpinner.vue** - Reusable spinner

## 🚀 Quick Start Commands

```bash
# Install all dependencies
pnpm install

# Run admin app
pnpm dev:admin  # http://localhost:3001/admin

# Run courses app
pnpm dev:courses  # http://localhost:3002/courses

# Run blog
pnpm dev:blog  # http://localhost:5173

# Run everything
pnpm dev
```

## 📋 Next Steps (Priority Order)

1. **Copy existing components**:
   ```bash
   # Copy markdown editor
   cp .vitepress/theme/components/MarkdownEditor.vue apps/admin/components/

   # Copy course components to courses app
   cp .vitepress/theme/components/Course*.vue apps/courses/components/
   cp .vitepress/theme/components/Lesson*.vue apps/courses/components/
   cp .vitepress/theme/components/VideoPlayer.vue apps/courses/components/
   ```

2. **Complete admin pages** (use index.vue as template):
   - `courses/[id].vue`
   - `lessons/[courseId]/index.vue`
   - `lessons/[courseId]/[lessonId].vue`

3. **Complete courses pages**:
   - `index.vue` - Browse courses
   - `[slug].vue` - Course detail
   - `[slug]/[lessonSlug].vue` - Lesson viewer

4. **Add Stripe** (courses app):
   ```bash
   # Already in package.json
   ```
   - Create checkout flow
   - Handle payment success
   - Check purchase status

5. **Deploy**:
   - Vercel handles monorepos natively
   - Configure build settings for each app
   - Set environment variables

## 💡 Pro Tips

1. **Use the shared types**: `import type { Course } from '@blog/shared/lib/types/courses'`
2. **Supabase composable**: `const { supabase } = useSupabase()`
3. **Nuxt auto-imports**: `ref`, `computed`, `onMounted`, etc. are available
4. **Routing**: Use `<NuxtLink to="/path">` and `router.push('/path')`
5. **Tailwind classes**: Already configured with your brand colors

## 🎨 Design System

Colors (from tailwind.config.js):
- `bg-background` = #fafafa
- `text-primary` = #1a1a1a
- `border-border` = #e0e0e0

Fonts:
- `font-serif` = Crimson Pro (headings)
- `font-sans` = DM Sans (body)

Animation:
- `fade-in` class available globally

## 📦 Package References

All apps can import from `@blog/shared`:
- `@blog/shared/lib/supabase/storage` - Supabase client
- `@blog/shared/lib/types/courses` - Course/Lesson types

## 🐛 Troubleshooting

1. **Import errors**: Run `pnpm install` at root
2. **Type errors**: Check `packages/shared/lib/types/index.ts` exports
3. **Supabase errors**: Verify `.env` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. **Routing issues**: Remember baseURL is `/admin` and `/courses` respectively

## ✨ What You Get

- ✅ Clean URLs: `/admin/courses/abc123` instead of `?id=abc123`
- ✅ Proper routing with dynamic routes
- ✅ No SSR workarounds
- ✅ Independent deployment
- ✅ Code sharing via workspace
- ✅ Right tool for each job

The foundation is complete! Just copy components and fill in the remaining pages using the patterns established in `apps/admin/pages/index.vue`.
