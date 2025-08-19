import { useParams, Link } from 'react-router-dom'
import { StoriesService, type Story } from '../services/storiesService'
import { useEffect, useState } from 'react'
import { ArrowLeft, Book, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StoryDetail() {
  const { slug } = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return
      
      try {
        const fetchedStory = await StoriesService.getStoryBySlug(slug)
        setStory(fetchedStory)
        
        if (fetchedStory) {
          document.title = `${fetchedStory.title} - Snoozies Dreamy Haven`
          document.querySelector('meta[name="description"]')?.setAttribute('content', 
            fetchedStory.summary || fetchedStory.excerpt || 'A magical bedtime story for children.')
        }
      } catch (error) {
        console.error('Failed to fetch story:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchStory()
  }, [slug])

  useEffect(() => {
    if (story) {
      document.title = `${story.title} | Snoozies - Magical Bedtime Stories`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', story.summary)
      }
    }
  }, [story])

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-night">
        <div className="text-center max-w-lg mx-auto px-4">
          <Book className="h-24 w-24 text-star-yellow mx-auto mb-6 float opacity-50" />
          <h1 className="text-4xl font-nunito font-bold text-white mb-4">Story Not Found</h1>
          <p className="text-white/80 mb-8 text-lg">
            This story seems to have wandered off into dreamland.
          </p>
          <Button asChild className="bg-white text-foreground hover:bg-white/90">
            <Link to="/stories" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-night">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 mb-6">
            <Link to="/stories" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </Button>
        </div>
      </section>

      {/* Story Content */}
      <article className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/20 shadow-elegant">
            <div className="mb-8">
              <Star className="h-12 w-12 text-star-yellow mb-4 float" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito font-bold text-foreground mb-6 leading-tight">
                {story.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {story.summary}
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none prose-headings:font-nunito prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: story.body || '' }} />
            </div>
            
            <div className="mt-12 pt-8 border-t border-border/20">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/stories" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Explore More Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}