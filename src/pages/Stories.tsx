import { Link } from 'react-router-dom'
import { stories } from '../data/stories'
import { useEffect } from 'react'
import { Book, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Stories() {
  useEffect(() => {
    document.title = 'Stories Archive | Snoozies - Magical Bedtime Stories'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse our collection of soothing bedtime stories designed to help children relax and fall asleep peacefully.')
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-night overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-10 left-10 w-2 h-2 bg-star-yellow rounded-full sparkle" />
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary rounded-full sparkle" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Book className="h-16 w-16 text-star-yellow mx-auto mb-4 float" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-nunito font-bold text-white mb-6">
            Story Archive
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover all our magical bedtime stories, each crafted to bring peace and wonder to your little one's dreams.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map(story => (
              <div key={story.slug} className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant hover:-translate-y-1">
                <div className="mb-4">
                  <Star className="h-8 w-8 text-star-yellow mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-nunito font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {story.summary}
                  </p>
                </div>
                <Button asChild variant="ghost" className="w-full group-hover:bg-primary/10 transition-colors duration-300">
                  <Link to={`/stories/${story.slug}`} className="flex items-center justify-center gap-2">
                    Read Story
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
