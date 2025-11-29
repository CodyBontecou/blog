-- Sync newsletter_sent metadata for articles that have been sent in campaigns
-- This fixes articles that were sent before the metadata field was being updated

UPDATE articles
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{newsletter_sent}',
  'true'::jsonb
)
FROM newsletter_campaigns
WHERE articles.slug = newsletter_campaigns.article_slug
  AND (metadata->>'newsletter_sent' IS NULL OR metadata->>'newsletter_sent' = 'false');
