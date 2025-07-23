import { useState } from 'react';
import { Search, Filter, Play, Clock, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from '@/components/AudioPlayer';
import featuredStoryImage from '@/assets/featured-story.jpg';

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Adventure', 'Nature', 'Fantasy', 'Animals', 'Friendship'];

  const stories = [
    {
      id: 1,
      title: "Luna's Moonlight Adventure",
      description: "Join Luna as she travels through dreamy clouds to help the sleepy moon find his way home.",
      duration: "8:45",
      category: "Adventure",
      image: featuredStoryImage,
      featured: true,
      rating: 4.9,
      ageGroup: "3-7 years"
    },
    {
      id: 2,
      title: "The Sleepy Forest Friends",
      description: "Discover how woodland animals prepare for their peaceful night's sleep.",
      duration: "6:30",
      category: "Nature",
      image: featuredStoryImage,
      featured: false,
      rating: 4.8,
      ageGroup: "2-6 years"
    },
    {
      id: 3,
      title: "Captain Cozy's Dream Ship",
      description: "Sail away on Captain Cozy's magical ship through the sea of dreams.",
      duration: "10:15",
      category: "Fantasy",
      image: featuredStoryImage,
      featured: true,
      rating: 4.9,
      ageGroup: "4-8 years"
    },
    {
      id: 4,
      title: "Whiskers the Sleepy Cat",
      description: "Follow Whiskers as he finds the perfect cozy spot for his afternoon nap.",
      duration: "5:45",
      category: "Animals",
      image: featuredStoryImage,
      featured: false,
      rating: 4.7,
      ageGroup: "2-5 years"
    },
    {
      id: 5,
      title: "The Gentle Giant's Lullaby",
      description: "A kind giant helps the village children sleep with his magical lullabies.",
      duration: "9:20",
      category: "Fantasy",
      image: featuredStoryImage,
      featured: false,
      rating: 4.8,
      ageGroup: "4-9 years"
    },
    {
      id: 6,
      title: "Best Friends' Sleepover",
      description: "Two best friends learn that bedtime can be fun even when you're not at home.",
      duration: "7:15",
      category: "Friendship",
      image: featuredStoryImage,
      featured: false,
      rating: 4.6,
      ageGroup: "3-7 years"
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-foreground mb-6">
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
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-dreamy" : "btn-sleepy"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-star-yellow" />
            <h2 className="text-2xl font-fredoka font-semibold text-foreground">
              Featured Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {stories.filter(story => story.featured).map((story) => (
              <Card key={story.id} className="card-story overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-star-yellow text-foreground">
                      ✨ Featured
                    </Badge>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {story.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-star-yellow fill-current" />
                        <span className="text-xs text-muted-foreground">{story.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-fredoka font-semibold text-foreground mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {story.duration}
                      </div>
                      <span>{story.ageGroup}</span>
                    </div>
                    <AudioPlayer 
                      src="/audio/sample-story.mp3" 
                      title={story.title}
                      duration={story.duration}
                      compact={true}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Stories */}
        <div>
          <h2 className="text-2xl font-fredoka font-semibold text-foreground mb-6">
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
                    <Button className="btn-dreamy">
                      <Play className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-card/90 backdrop-blur-sm text-primary text-xs">
                      {story.category}
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
                
                <h3 className="text-lg font-fredoka font-semibold text-foreground mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {story.description}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" className="btn-dreamy flex-1">
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
              <h3 className="text-xl font-fredoka font-semibold mb-2">No stories found</h3>
              <p>Try adjusting your search or filters to find more stories.</p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
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
            <h3 className="text-2xl font-fredoka font-bold text-foreground mb-4">
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