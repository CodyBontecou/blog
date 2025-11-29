-- Add content column to lessons table for full markdown lesson content
-- This is separate from description which is a brief summary

ALTER TABLE lessons ADD COLUMN IF NOT EXISTS content TEXT;

-- Add comment for documentation
COMMENT ON COLUMN lessons.content IS 'Full markdown content for the lesson (separate from brief description)';
