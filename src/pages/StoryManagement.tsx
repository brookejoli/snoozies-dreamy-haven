import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, Upload, Save, X, BookOpen, Image, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import { StoriesService, type Story } from '@/services/storiesService'
import { useToast } from '@/hooks/use-toast'

export default function StoryManagement() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    excerpt: '', 
    body: '',
    full_text: '',
    youtube_id: '',
    duration: '',
    tags: '',
    published_at: new Date().toISOString().slice(0, 16)
  })

  // File uploads
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Story Management | Snoozies Admin'
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const fetchedStories = await StoriesService.getAllStories()
      setStories(fetchedStories)
    } catch (error) {
      console.error('Failed to fetch stories:', error)
      toast({
        title: "Error",
        description: "Failed to load stories",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      summary: '',
      excerpt: '', 
      body: '',
      full_text: '',
      youtube_id: '',
      duration: '',
      tags: '',
      published_at: new Date().toISOString().slice(0, 16)
    })
    setImageFile(null)
    setAudioFile(null)
    setImagePreview(null)
    setEditingStory(null)
    setShowForm(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug when title changes
      ...(name === 'title' && !editingStory ? { slug: generateSlug(value) } : {})
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      return urlData.publicUrl
    } catch (error) {
      console.error(`Error uploading file to ${bucket}:`, error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let thumbnail_url = editingStory?.thumbnail_url || null
      let audio_url = editingStory?.audio_url || null

      // Upload image if provided
      if (imageFile) {
        const imagePath = `${Date.now()}-${imageFile.name}`
        thumbnail_url = await uploadFile(imageFile, 'story-images', imagePath)
      }

      // Upload audio if provided  
      if (audioFile) {
        const audioPath = `${Date.now()}-${audioFile.name}`
        audio_url = await uploadFile(audioFile, 'story-audio', audioPath)
      }

      const storyData = {
        ...formData,
        thumbnail_url,
        audio_url,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : null,
        published_at: new Date(formData.published_at).toISOString()
      }

      if (editingStory) {
        // Update existing story
        const { error } = await supabase
          .from('stories')
          .update(storyData)
          .eq('id', editingStory.id)

        if (error) throw error

        toast({
          title: "Success!",
          description: "Story updated successfully",
        })
      } else {
        // Create new story
        const { error } = await supabase
          .from('stories')
          .insert(storyData)

        if (error) throw error

        toast({
          title: "Success!",
          description: "Story created successfully",
        })
      }

      resetForm()
      fetchStories()

    } catch (error) {
      console.error('Error saving story:', error)
      toast({
        title: "Error",
        description: "Failed to save story",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (story: Story) => {
    setEditingStory(story)
    setFormData({
      title: story.title || '',
      slug: story.slug || '',
      summary: story.summary || '',
      excerpt: story.excerpt || '',
      body: story.body || '',
      full_text: story.full_text || '',
      youtube_id: story.youtube_id || '',
      duration: story.duration || '',
      tags: story.tags?.join(', ') || '',
      published_at: story.published_at ? new Date(story.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
    })
    setImagePreview(story.thumbnail_url || null)
    setShowForm(true)
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return

    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', storyId)

      if (error) throw error

      toast({
        title: "Success!",
        description: "Story deleted successfully",
      })
      fetchStories()
    } catch (error) {
      console.error('Error deleting story:', error)
      toast({
        title: "Error", 
        description: "Failed to delete story",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-night py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-nunito font-bold text-white mb-2">
                Story Management
              </h1>
              <p className="text-white/80">
                Create and manage your bedtime stories collection
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-primary">
                <Link to="/stories">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Stories
                </Link>
              </Button>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-white text-primary hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Story Form */}
        {showForm && (
          <Card className="mb-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingStory ? 'Edit Story' : 'Add New Story'}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="The Sleepy Forest Friends"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="sleepy-forest-friends"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="A brief description of the story..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="A short teaser for the story..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="full_text">Story Content</Label>
                <Textarea
                  id="full_text"
                  name="full_text"
                  value={formData.full_text}
                  onChange={handleInputChange}
                  placeholder="Write your bedtime story here..."
                  rows={8}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="youtube_id">YouTube ID</Label>
                  <Input
                    id="youtube_id"
                    name="youtube_id"
                    value={formData.youtube_id}
                    onChange={handleInputChange}
                    placeholder="dQw4w9WgXcQ"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="12:30"
                  />
                </div>
                <div>
                  <Label htmlFor="published_at">Published Date</Label>
                  <Input
                    id="published_at"
                    name="published_at"
                    type="datetime-local"
                    value={formData.published_at}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="forest, animals, sleepy, peaceful"
                />
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Thumbnail Image</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Image className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Upload image</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Audio File</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioChange}
                      className="hidden"
                      id="audio-upload"
                    />
                    <label
                      htmlFor="audio-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <Music className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          {audioFile ? audioFile.name : 'Upload audio'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting} className="btn-dreamy">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingStory ? 'Update Story' : 'Create Story'}
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Stories List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Existing Stories ({stories.length})</h2>
          
          {stories.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
              <p className="text-muted-foreground mb-6">Create your first bedtime story to get started.</p>
              <Button onClick={() => setShowForm(true)} className="btn-dreamy">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Story
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {stories.map((story) => (
                <Card key={story.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        {story.thumbnail_url && (
                          <img
                            src={story.thumbnail_url}
                            alt={story.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {story.summary || story.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {story.duration && (
                              <Badge variant="secondary">{story.duration}</Badge>
                            )}
                            {story.youtube_id && (
                              <Badge variant="outline">YouTube</Badge>
                            )}
                            {story.audio_url && (
                              <Badge variant="outline">Audio</Badge>
                            )}
                            {story.tags?.map((tag) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Published: {story.published_at ? new Date(story.published_at).toLocaleDateString() : 'Draft'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(story)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(story.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}