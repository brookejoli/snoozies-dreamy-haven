-- Create stories table with all necessary fields
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  excerpt TEXT,
  body TEXT,
  full_text TEXT,
  thumbnail_url TEXT,
  audio_url TEXT,
  youtube_id TEXT,
  duration TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (stories are public content)
CREATE POLICY "Stories are publicly readable" 
ON public.stories 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on slug lookups
CREATE INDEX idx_stories_slug ON public.stories(slug);

-- Create index for published_at for ordering
CREATE INDEX idx_stories_published_at ON public.stories(published_at DESC);