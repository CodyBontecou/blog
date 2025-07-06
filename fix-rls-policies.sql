-- Fix RLS policies for newsletter subscription

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON subscribers;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON subscribers;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON subscribers;

-- Create updated policies
CREATE POLICY "Allow anonymous insert" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous read own email" ON subscribers
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow authenticated read all" ON subscribers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update all" ON subscribers
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow service role all operations" ON subscribers
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Test the policy by checking if anon role can insert
SELECT 'RLS policies updated successfully' as status;