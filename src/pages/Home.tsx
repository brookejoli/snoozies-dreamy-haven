import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Moon, Cloud, Play, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AudioPlayer from '@/components/AudioPlayer';
import NewsletterPopup from '@/components/NewsletterPopup';
import heroImage from '@/assets/hero-bedtime.jpg';
import featuredStoryImage from '@/assets/lets-talk-dirt-friendly.jpg';
import littleCloudJourneyImage from '@/assets/little-cloud-journey-new.jpg';
import treeMakingToastImage from '@/assets/tree-making-toast.jpg';
import broccoliTreeImage from '@/assets/broccoli-tree.jpg';

const Home = () => {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  // Show newsletter popup after 18 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterPopup(true);
    }, 18000);

    return () => clearTimeout(timer);
  }, []);

  const featuredStories = [
    {
      id: 1,
      title: "The Little Cloud's Evening Journey",
      description: "Float along with a tiny cloud as it drifts across skies and rooftops on a gentle evening adventure.",
      duration: "8:45",
      category: "Magical + Mundane",
      image: littleCloudJourneyImage,
      audioSrc: "/audio/the-little-clouds-evening-journey.mp3",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 2,
      title: "The Tree That Made Toast",
      description: "This is a boring bedtime story. On purpose. In this slow, sleepy tale, a tree quietly makes toast.",
      duration: "6:30",
      category: "Mundane",
      image: treeMakingToastImage,
      audioSrc: "/audio/the-tree-that-made-toast.mp3",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    },
    {
      id: 3,
      title: "The Tree That Looked Like Broccoli",
      description: "Meet a tree that looks suspiciously like broccoli — and the kid who thinks it might just be too broccoli-like.",
      duration: "10:15",
      category: "Magical + Mundane",
      image: broccoliTreeImage,
      audioSrc: "/audio/the-tree-that-looked-like-broccoli.mp3",
      youtubeUrl: "https://www.youtube.com/@snooziestories"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-secondary/30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Star className="h-12 w-12 text-star-yellow mx-auto mb-4 float" />
            <h1 className="text-6xl md:text-8xl font-nunito font-bold text-white mb-4 leading-tight drop-shadow-2xl">
              Snoozies
            </h1>
            <p className="text-2xl md:text-3xl font-nunito font-medium text-white/95 mb-2 drop-shadow-lg">
              Boring Stories for Sleepy Kids
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Magical bedtime stories designed to help your little ones drift off to peaceful sleep
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="btn-dreamy text-lg px-8 py-4">
              <Link to="/stories">
                <Play className="h-5 w-5 mr-2" />
                Listen Now
              </Link>
            </Button>
            <Button 
              onClick={() => setShowNewsletterPopup(true)}
              variant="outline" 
              className="btn-sleepy text-lg px-8 py-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Get New Stories
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-star-yellow float">
          <Star className="h-6 w-6" />
        </div>
        <div className="absolute top-32 right-16 text-cloud-white float-delayed">
          <Cloud className="h-8 w-8" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-moon-silver float">
          <Moon className="h-10 w-10" />
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="py-20 bg-gradient-sunset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
              Tonight's Featured Story
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every night, we handpick a special story to help your child fall asleep peacefully
            </p>
          </div>

          <div className="bg-card rounded-3xl overflow-hidden shadow-dreamy max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredStoryImage} 
                  alt="Tonight's featured story"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-6">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    ✨ Featured Tonight
                  </span>
                  <h3 className="text-2xl md:text-3xl font-nunito font-bold text-foreground mb-4">
                    Let's Talk About Dirt
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    A wonderfully boring bedtime story about dirt. Just dirt. Perfect for helping little minds slow down and drift off to sleep with gentle, earthy thoughts.
                  </p>
                </div>

                <AudioPlayer 
                  src="/audio/lets-talk-about-dirt.mp3" 
                  title="Let's Talk About Dirt"
                  duration="7:20"
                  compact={true}
                />

                <div className="mt-6 flex gap-3">
                  <Button asChild className="btn-dreamy">
                    <Link to="/stories">
                      Listen to More Stories
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => setShowNewsletterPopup(true)}
                    variant="outline" 
                    className="btn-sleepy"
                  >
                    Get Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Collection Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
              A World of Dreamy Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From magical adventures to gentle nature tales, discover stories that make bedtime the best time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredStories.map((story) => (
              <Card key={story.id} className="card-story group flex flex-col">
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
                  <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                    {story.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">
                    {story.duration}
                  </span>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-nunito font-semibold text-foreground mb-3">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {story.description}
                  </p>
                  <div className="mt-auto">
                    <AudioPlayer 
                      src={story.audioSrc} 
                      title={story.title}
                      duration={story.duration}
                      compact={true}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="btn-dreamy text-lg px-8 py-4">
              <Link to="/stories">
                Explore All Stories
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Snoozies */}
      <section className="py-20 bg-gradient-night">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
              Why Parents Love Snoozies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughtfully crafted stories that create the perfect bedtime routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Moon className="h-8 w-8 text-star-yellow" />
              </div>
              <h3 className="text-xl font-nunito font-semibold text-foreground mb-4">
                Calming & Peaceful
              </h3>
              <p className="text-muted-foreground">
                Every story is designed with gentle narratives and soothing soundscapes to help children relax
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-star-yellow" />
              </div>
              <h3 className="text-xl font-nunito font-semibold text-foreground mb-4">
                Age-Appropriate
              </h3>
              <p className="text-muted-foreground">
                Stories crafted for different age groups, ensuring content that's just right for your child
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-star-yellow sparkle" />
              </div>
              <h3 className="text-xl font-nunito font-semibold text-foreground mb-4">
                New Stories Weekly
              </h3>
              <p className="text-muted-foreground">
                Fresh adventures delivered every week to keep bedtime exciting and anticipated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-3xl p-12 shadow-dreamy">
            <Star className="h-12 w-12 text-star-yellow mx-auto mb-6 sparkle" />
            <h2 className="text-3xl md:text-4xl font-nunito font-bold text-foreground mb-6">
              Join Our Story Community
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Help us create the bedtime stories your family dreams about. Together, we'll build a magical world of peaceful sleep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-dreamy text-lg px-8 py-4">
                <Link to="/story-suggestions">
                  <Heart className="h-5 w-5 mr-2" />
                  Help Create Stories
                </Link>
              </Button>
              <Button 
                onClick={() => setShowNewsletterPopup(true)}
                variant="outline" 
                className="btn-sleepy text-lg px-8 py-4"
              >
                Get Story Updates
              </Button>
              <Button asChild variant="secondary" className="text-lg px-8 py-4">
                <Link to="/stories">
                  Browse Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      <NewsletterPopup 
        isVisible={showNewsletterPopup} 
        onClose={() => setShowNewsletterPopup(false)} 
      />
    </div>
  );
};

export default Home;