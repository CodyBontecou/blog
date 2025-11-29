import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

const COURSE_VIDEOS_BUCKET = 'course-videos'

export async function uploadCourseVideo(
  file: File,
  courseSlug: string,
  lessonSlug: string
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${courseSlug}/${lessonSlug}.${fileExt}`

    const { data, error } = await supabase.storage
      .from(COURSE_VIDEOS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Error uploading video:', error)
      return null
    }

    return data.path
  } catch (error) {
    console.error('Error uploading video:', error)
    return null
  }
}

export async function getVideoUrl(videoPath: string, expiresIn = 3600): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(COURSE_VIDEOS_BUCKET)
      .createSignedUrl(videoPath, expiresIn)

    if (error) {
      console.error('Error creating signed URL:', error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error('Error creating signed URL:', error)
    return null
  }
}

export async function deleteVideo(videoPath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(COURSE_VIDEOS_BUCKET)
      .remove([videoPath])

    if (error) {
      console.error('Error deleting video:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting video:', error)
    return false
  }
}

export async function createCourseVideosBucket() {
  try {
    const { data, error } = await supabase.storage.createBucket(COURSE_VIDEOS_BUCKET, {
      public: false,
      fileSizeLimit: 524288000, // 500MB
      allowedMimeTypes: ['video/mp4', 'video/webm', 'video/ogg']
    })

    if (error && error.message !== 'Bucket already exists') {
      console.error('Error creating bucket:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error creating bucket:', error)
    return false
  }
}
