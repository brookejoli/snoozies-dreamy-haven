import { supabase } from "@/integrations/supabase/client";

export type Story = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  excerpt?: string;
  body?: string;
  full_text?: string;
  thumbnail_url?: string;
  audio_url?: string;
  youtube_id?: string;
  duration?: string;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  updated_at?: string;
};

export class StoriesService {
  static async getAllStories(): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
    
    return data || [];
  }

  static async getStoryBySlug(slug: string): Promise<Story | null> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching story by slug:', error);
      throw error;
    }
    
    return data;
  }

  static async getStoriesByTag(tag: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .contains('tags', [tag])
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching stories by tag:', error);
      throw error;
    }
    
    return data || [];
  }

  static async searchStories(searchTerm: string): Promise<Story[]> {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
      .order('published_at', { ascending: false });
    
    if (error) {
      console.error('Error searching stories:', error);
      throw error;
    }
    
    return data || [];
  }

  static async insertStory(story: Omit<Story, 'id' | 'created_at' | 'updated_at'>): Promise<Story> {
    const { data, error } = await supabase
      .from('stories')
      .insert(story)
      .select()
      .single();
    
    if (error) {
      console.error('Error inserting story:', error);
      throw error;
    }
    
    return data;
  }
}