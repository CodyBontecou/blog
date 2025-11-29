-- Storage policies for course videos
-- Run this after creating the 'course-videos' bucket in Supabase

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-videos');

-- Allow authenticated users to update videos
CREATE POLICY "Authenticated users can update videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'course-videos');

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated users can delete videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-videos');

-- Allow users to view videos if they're enrolled in the course
CREATE POLICY "Enrolled users can view videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-videos' AND (
    -- User is enrolled in the course
    EXISTS (
      SELECT 1 FROM enrollments e
      INNER JOIN lessons l ON l.course_id = e.course_id
      WHERE e.user_id = auth.uid()
      AND storage.objects.name LIKE CONCAT(
        (SELECT c.slug FROM courses c WHERE c.id = l.course_id),
        '/%'
      )
    )
    OR
    -- Course is free
    EXISTS (
      SELECT 1 FROM courses c
      INNER JOIN lessons l ON l.course_id = c.id
      WHERE c.is_free = true
      AND storage.objects.name LIKE CONCAT(c.slug, '/%')
    )
  )
);
