export interface Course {
  id: string
  slug: string
  title: string
  description: string | null
  thumbnail_url: string | null
  is_free: boolean
  price: number
  stripe_product_id: string | null
  stripe_price_id: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  course_id: string
  slug: string
  title: string
  description: string | null
  content: string | null
  video_url: string | null
  duration: number
  order_index: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  stripe_payment_intent_id: string | null
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  course_id: string
  watched_seconds: number
  completed: boolean
  last_watched_at: string
}

export interface CourseWithLessons extends Course {
  lessons: Lesson[]
}

export interface LessonWithProgress extends Lesson {
  progress?: LessonProgress
}

export interface CourseWithProgress extends Course {
  lessons: LessonWithProgress[]
  enrollment?: Enrollment
  total_lessons: number
  completed_lessons: number
  progress_percentage: number
}
