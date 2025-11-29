-- Create articles table for admin content management
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  topics TEXT[] DEFAULT '{}',
  draft BOOLEAN DEFAULT TRUE,
  ignore BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_modified TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create article revisions table for version history
CREATE TABLE IF NOT EXISTS article_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  topics TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  revision_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_draft ON articles(draft);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_topics ON articles USING GIN(topics);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_article_revisions_article_id ON article_revisions(article_id);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_revisions ENABLE ROW LEVEL SECURITY;

-- Create policies for articles table (only authenticated users can manage)
CREATE POLICY "Enable read for authenticated users" ON articles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users" ON articles
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON articles
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Enable delete for authenticated users" ON articles
  FOR DELETE TO authenticated
  USING (true);

-- Create policies for article_revisions table
CREATE POLICY "Enable read for authenticated users" ON article_revisions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Enable insert for authenticated users" ON article_revisions
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Create trigger to auto-update last_modified
CREATE TRIGGER update_articles_last_modified
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to update last_modified (reusing the function name pattern)
CREATE OR REPLACE FUNCTION update_article_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Update the trigger to use the specific function
DROP TRIGGER IF EXISTS update_articles_last_modified ON articles;
CREATE TRIGGER update_articles_last_modified
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_article_last_modified();

-- Create function to create revision on article update
CREATE OR REPLACE FUNCTION create_article_revision()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create revision if content or title changed
  IF OLD.content != NEW.content OR OLD.title != NEW.title THEN
    INSERT INTO article_revisions (
      article_id,
      title,
      content,
      topics,
      metadata,
      revision_number,
      created_by
    )
    SELECT
      OLD.id,
      OLD.title,
      OLD.content,
      OLD.topics,
      OLD.metadata,
      COALESCE((SELECT MAX(revision_number) FROM article_revisions WHERE article_id = OLD.id), 0) + 1,
      NEW.author_id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic revision creation
CREATE TRIGGER create_article_revision_trigger
  AFTER UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION create_article_revision();
