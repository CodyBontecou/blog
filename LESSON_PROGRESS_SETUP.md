# Lesson Progress Tracking - Setup Guide

This document explains how the lesson progress tracking and authentication system works.

## Features Implemented

✅ **User Authentication** - Login/signup pages
✅ **Progress Tracking** - Track which lessons users have completed
✅ **Database Integration** - Store progress in Supabase
✅ **Protected Actions** - Require login to mark lessons as complete
✅ **Smart Redirects** - After login, redirect to next lesson
✅ **Real-time Updates** - Progress updates immediately in UI

## Database Setup

### 1. Run the Migration

Execute the lesson progress schema in your Supabase database:

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Manually in Supabase Dashboard
# Go to SQL Editor and run the contents of:
# supabase/lesson-progress-schema.sql
```

This creates:
- `lesson_progress` table with user_id, course_id, lesson_id, completed status
- Proper indexes for performance
- Row Level Security (RLS) policies - users can only see/edit their own progress
- Unique constraint to prevent duplicate progress records

### 2. Configure OAuth Providers

The login page supports Google and GitHub authentication. To enable these:

#### **Google OAuth**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Set **Application type** to **Web application**
7. Add **Authorized redirect URIs**:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
8. Copy **Client ID** and **Client Secret**
9. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Paste Client ID and Client Secret
   - Save

#### **GitHub OAuth**

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in details:
   - **Application name**: Your app name
   - **Homepage URL**: Your site URL
   - **Authorization callback URL**:
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
4. Click **Register application**
5. Copy **Client ID**
6. Generate a **Client Secret** and copy it
7. In Supabase Dashboard:
   - Go to **Authentication** → **Providers**
   - Enable **GitHub**
   - Paste Client ID and Client Secret
   - Save

**Note**: For local development, also add:
```
http://localhost:54321/auth/v1/callback
```
to your OAuth app's authorized redirect URIs.

## How It Works

### Authentication Flow

1. **User clicks "Mark as Complete"**
   - If not logged in → redirects to `/login?redirect=/course/next-lesson`
   - If logged in → saves progress and navigates to next lesson

2. **Login Page** (`/login`)
   - Clean, minimal design matching your aesthetic
   - Three authentication methods:
     - **Google OAuth** - One-click sign in with Google
     - **GitHub OAuth** - One-click sign in with GitHub
     - **Email/Password** - Traditional sign up/login
   - Preserves redirect URL from query params
   - After successful auth → redirects to intended lesson

3. **OAuth Flow**
   - User clicks "Continue with Google" or "Continue with GitHub"
   - Redirected to provider for authentication
   - Provider redirects back to Supabase callback
   - Supabase creates/updates user account
   - User redirected to original destination

4. **Auth State Management**
   - Handled by `useSupabase()` composable
   - Tracks current user globally
   - Persists across page navigations
   - Works seamlessly with all auth methods

### Progress Tracking

1. **Loading Progress**
   - When a user visits a lesson, we load their progress from `lesson_progress` table
   - Completed lessons are shown with green indicators
   - Progress percentage is calculated and displayed

2. **Marking Complete**
   - Saves/updates record in `lesson_progress` table
   - Sets `completed = true` and `completed_at = current timestamp`
   - Uses `upsert` to handle first-time completions and updates

3. **Progress Display**
   - **Desktop**: Progress widget in right sidebar (percentage + X/Y lessons)
   - **Mobile**: Progress badge in header + progress widget in drawer

## Files Modified/Created

### New Files
- `apps/courses/pages/login.vue` - Login/signup page
- `supabase/lesson-progress-schema.sql` - Database migration

### Modified Files
- `apps/courses/composables/useSupabase.ts` - Added auth state management
- `apps/courses/pages/[slug]/[lessonSlug].vue` - Added progress tracking logic

## Usage

### For Users

1. Browse lessons without login (view-only)
2. Click "Mark as Complete" → prompted to create account
3. After login, progress is tracked automatically
4. Return anytime to see completed lessons and resume where you left off

### For Developers

**Check if user is authenticated:**
```vue
<script setup>
const { user } = useSupabase()
</script>

<template>
  <div v-if="user">
    Welcome, {{ user.email }}!
  </div>
</template>
```

**Load user's progress:**
```typescript
const { data } = await supabase
  .from('lesson_progress')
  .select('*')
  .eq('user_id', user.value.id)
  .eq('completed', true)
```

**Mark lesson complete:**
```typescript
await supabase
  .from('lesson_progress')
  .upsert({
    user_id: user.value.id,
    course_id: course.value.id,
    lesson_id: lesson.value.id,
    completed: true,
    completed_at: new Date().toISOString()
  })
```

## Security

### Row Level Security (RLS)

The `lesson_progress` table has RLS enabled with policies that ensure:

- Users can only SELECT their own progress records
- Users can only INSERT/UPDATE/DELETE their own records
- Prevents users from seeing or modifying other users' progress

### Authentication

- Uses Supabase Auth
- Passwords are hashed and secured by Supabase
- Session tokens are stored in httpOnly cookies
- Auth state persists across page reloads

## Testing

1. **Test Anonymous Flow:**
   ```
   1. Visit any lesson
   2. Click "Mark as Complete"
   3. Should redirect to /login with redirect param
   ```

2. **Test Login Flow:**
   ```
   1. Create account on /login
   2. Should redirect to lesson after signup
   3. Progress should save and show in UI
   ```

3. **Test Progress Persistence:**
   ```
   1. Mark multiple lessons complete
   2. Refresh page
   3. Progress should persist (green indicators, percentage)
   ```

## Next Steps (Optional Enhancements)

- [ ] Add "forgot password" functionality
- [ ] Add email verification
- [ ] Add course completion certificates
- [ ] Add user dashboard to see all course progress
- [ ] Add lesson bookmarking
- [ ] Add notes/annotations per lesson
- [ ] Add more OAuth providers (Twitter, LinkedIn, etc.)

## Troubleshooting

**Q: Progress not saving?**
- Check browser console for errors
- Verify migration ran successfully
- Check Supabase table browser to confirm `lesson_progress` table exists

**Q: Login not working?**
- Verify Supabase credentials in `.env`
- Check Supabase Auth settings are enabled
- Verify email confirmation is disabled for testing (or check email)

**Q: RLS errors?**
- Verify policies were created correctly
- Check that `auth.uid()` is available
- Try running migration again

**Q: OAuth not working?**
- Verify OAuth apps are created in Google/GitHub
- Check redirect URIs match exactly (including http vs https)
- Confirm Client ID and Secret are correctly entered in Supabase
- Check browser console for specific OAuth errors
- Ensure OAuth providers are enabled in Supabase Dashboard

**Q: OAuth redirects not working locally?**
- Add `http://localhost:3000` (or your local port) to authorized redirect URIs
- Add `http://localhost:54321/auth/v1/callback` for Supabase local development
- Check that your local dev server is running on the correct port
