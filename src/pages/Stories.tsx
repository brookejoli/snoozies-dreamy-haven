import { Link } from 'react-router-dom'
import { StoriesService, type Story } from '../services/storiesService'
import { useEffect, useState } from 'react'
import { Book, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = 'Stories Archive | Snoozies - Magical Bedtime Stories'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our collection of soothing bedtime stories designed to help children relax and fall asleep peacefully.')
    }
    
    const fetchStories = async () => {
      try {
        const fetchedStories = await StoriesService.getAllStories()
        setStories(fetchedStories)
      } catch (error) {
        console.error('Failed to fetch stories:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchStories()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-night overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-10 left-10 w-2 h-2 bg-star-yellow rounded-full sparkle" />
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary rounded-full sparkle" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <Book className="h-12 w-12 sm:h-16 sm:w-16 text-star-yellow mx-auto mb-4 float" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-nunito font-bold text-white mb-4 sm:mb-6 leading-tight">
            Story Archive
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover all our magical bedtime stories, each crafted to bring peace and wonder to your little one's dreams.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-muted-foreground">Stories will appear here once they're added to the database.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map(story => (
                <div key={story.slug} className="group bg-card/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                  <div className="mb-4">
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-star-yellow mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg sm:text-xl font-nunito font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {story.summary || story.excerpt}
                    </p>
                  </div>
                  <Button asChild variant="ghost" className="w-full group-hover:bg-primary/10 transition-colors duration-300 min-h-[44px] text-sm sm:text-base">
                    <Link to={`/stories/${story.slug}`} className="flex items-center justify-center gap-2">
                      Read Story
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
