import { useState } from 'react';
import { Search, Filter, Play, Clock, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from '@/components/AudioPlayer';
import featuredStoryImage from '@/assets/featured-story.jpg';
import treeMakingToastImage from '@/assets/tree-making-toast.jpg';
import littleCloudJourneyImage from '@/assets/little-cloud-journey.jpg';
import broccoliTreeImage from '@/assets/broccoli-tree.jpg';
import sleepySunflowerImage from '@/assets/sleepy-sunflower.jpg';
import lazyRiverImage from '@/assets/lazy-river.jpg';
import lightningBugImage from '@/assets/lightning-bug.jpg';
import letsTalkDirtImage from '@/assets/lets-talk-dirt.jpg';
import girlCollectingStarsImage from '@/assets/girl-collecting-stars.jpg';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All');

  const styles = ['All', 'Magical', 'Mundane', 'Magical + Mundane', 'Playful + Mundane', 'Really Boring'];

  const stories = [
    {
      id: 1,
      title: "The Little Clouds Evening Journey",
      description: "Float along with a tiny cloud as it drifts across skies and rooftops on a gentle evening adventure. With whispers of wind and soft glows of sunset, this calming tale will lull little listeners into sweet, sleepy dreams.",
      duration: "8:45",
      style: "Magical + Mundane",
      image: littleCloudJourneyImage,
      featured: false,
      rating: 4.9,
      ageGroup: "3-7 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 2,
      title: "The Tree That Looked Like Broccoli",
      description: "Meet a tree that looks suspiciously like broccoli — and the kid who thinks it might just be too broccoli-like. Nothing much happens. And that's kind of the point.",
      duration: "6:30",
      style: "Magical + Mundane",
      image: broccoliTreeImage,
      featured: false,
      rating: 4.8,
      ageGroup: "2-6 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 3,
      title: "The Sleepy Sunflower",
      description: "A tall sunflower in a garden slowly turns to follow the sun throughout a long summer day, eventually settling into peaceful sleep as twilight comes. The story follows her gentle observations of the garden's quiet summer rhythms - bees humming, butterflies visiting, and the soft evening breeze.",
      duration: "7:15",
      style: "Magical + Mundane",
      image: sleepySunflowerImage,
      featured: true,
      rating: 4.7,
      ageGroup: "3-8 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 4,
      title: "The Lazy River's Journey",
      description: "Following a gentle stream as it meanders through summer meadows, past sleepy cattle, under old stone bridges, carrying lily pads and reflecting clouds. The water moves slowly, peacefully, with no urgency - just the quiet music of flowing water.",
      duration: "9:20",
      style: "Really Boring",
      image: lazyRiverImage,
      featured: false,
      rating: 4.6,
      ageGroup: "2-7 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 5,
      title: "Luna the Lightning Bug's First Glow",
      description: "A young firefly discovers her gentle light for the first time on a warm summer evening. She practices her soft blinking among the tall grass, joins the peaceful dance of other lightning bugs, and learns that her glow is perfect for lighting the way to dreams.",
      duration: "8:10",
      style: "Playful + Mundane",
      image: lightningBugImage,
      featured: false,
      rating: 4.8,
      ageGroup: "3-6 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 6,
      title: "Let's Talk About Dirt",
      description: "Dirt doesn't ask for much. Dust's older cousin, crumb's quiet friend — this sleepy story celebrates the quiet, cozy world underfoot.",
      duration: "5:45",
      style: "Really Boring",
      image: letsTalkDirtImage,
      featured: false,
      rating: 4.5,
      ageGroup: "2-8 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 7,
      title: "The Girl Who Collected Stars",
      description: "In a town where the sky never rushed, a quiet girl begins to notice something… different. A shimmering, starry tale about collecting, letting go, and learning to see beauty without needing to keep it.",
      duration: "10:30",
      style: "Magical + Mundane",
      image: girlCollectingStarsImage,
      featured: true,
      rating: 4.9,
      ageGroup: "4-9 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 8,
      title: "The Tree That Made Toast",
      description: "This is a boring bedtime story. On purpose. In this slow, sleepy tale, a tree quietly makes toast. That's it. Nothing much happens, which is exactly what you need to drift off.",
      duration: "5:20",
      style: "Mundane",
      image: treeMakingToastImage,
      featured: false,
      rating: 4.6,
      ageGroup: "2-8 years",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStyle = selectedStyle === 'All' || story.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
            Bedtime Story Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover magical tales designed to help your little ones drift off to peaceful sleep
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {styles.map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStyle(style)}
                  className={selectedStyle === style ? "btn-dreamy" : "btn-sleepy"}
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-star-yellow" />
            <h2 className="text-2xl font-nunito font-semibold text-foreground">
              Featured Stories
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {stories.filter(story => story.featured).map((story) => (
              <Card key={story.id} className="card-story overflow-hidden">
                <div className="flex flex-col">
                  <div className="relative">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-56 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-star-yellow text-foreground">
                      ✨ Featured
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {story.style}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-star-yellow fill-current" />
                        <span className="text-xs text-muted-foreground">{story.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-nunito font-semibold text-foreground mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {story.duration}
                      </div>
                      <span>{story.ageGroup}</span>
                    </div>
                    <div className="mt-auto">
                      <AudioPlayer 
                        src="/audio/sample-story.mp3" 
                        title={story.title}
                        duration={story.duration}
                        compact={true}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Stories */}
        <div>
          <h2 className="text-2xl font-nunito font-semibold text-foreground mb-6">
            All Stories ({filteredStories.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Card key={story.id} className="card-story group">
                <div className="relative mb-4">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                   <div className="absolute inset-0 bg-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      className="btn-dreamy"
                      onClick={() => window.open(story.youtubeUrl, '_blank')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-card/90 backdrop-blur-sm text-primary text-xs">
                      {story.style}
                    </Badge>
                    {story.featured && (
                      <Badge className="bg-star-yellow text-foreground text-xs">
                        ✨
                      </Badge>
                    )}
                  </div>
                  <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-muted-foreground text-xs">
                    {story.duration}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-star-yellow fill-current" />
                    <span className="text-sm text-muted-foreground">{story.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{story.ageGroup}</span>
                </div>
                
                <h3 className="text-lg font-nunito font-semibold text-foreground mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {story.description}
                </p>
                
                 <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="btn-dreamy flex-1"
                    onClick={() => window.open(story.youtubeUrl, '_blank')}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                  <Button size="sm" variant="outline" className="btn-sleepy">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-nunito font-semibold mb-2">No stories found</h3>
              <p>Try adjusting your search or filters to find more stories.</p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedStyle('All');
              }}
              className="btn-dreamy"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="card-story max-w-2xl mx-auto">
            <Star className="h-8 w-8 text-star-yellow mx-auto mb-4 sparkle" />
            <h3 className="text-2xl font-nunito font-bold text-foreground mb-4">
              Want unlimited access to all stories?
            </h3>
            <p className="text-muted-foreground mb-6">
              Subscribe now and get access to our complete library of bedtime stories, plus new releases every week.
            </p>
            <Button className="btn-dreamy">
              Start Free Trial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stories;