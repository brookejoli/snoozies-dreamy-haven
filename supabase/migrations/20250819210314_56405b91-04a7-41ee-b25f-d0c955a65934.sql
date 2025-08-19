-- Create storage buckets for story assets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('story-images', 'story-images', true),
  ('story-audio', 'story-audio', true);

-- Create RLS policies for story images bucket
CREATE POLICY "Anyone can view story images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'story-images');

CREATE POLICY "Authenticated users can upload story images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update story images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete story images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'story-images' AND auth.role() = 'authenticated');

-- Create RLS policies for story audio bucket  
CREATE POLICY "Anyone can view story audio" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'story-audio');

CREATE POLICY "Authenticated users can upload story audio" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'story-audio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update story audio" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'story-audio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete story audio" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'story-audio' AND auth.role() = 'authenticated');

-- Add policies to allow story management (for now, anyone authenticated can manage stories)
-- Later you can restrict this to admin users only
CREATE POLICY "Authenticated users can insert stories" 
ON public.stories FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update stories" 
ON public.stories FOR UPDATE 
TO authenticated  
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stories" 
ON public.stories FOR DELETE 
TO authenticated
USING (true);