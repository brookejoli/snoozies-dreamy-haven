import { useState } from 'react';
import { Lightbulb, Send, Heart, Star, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import logoImage from '@/assets/snoozies-logo.png';

const StorySuggestions = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    email: '',
    storyIdea: '',
    themes: '',
    characters: '',
    additionalDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.parentName || !formData.storyIdea || !formData.email) {
      toast({
        title: "Please fill in required fields",
        description: "We need your name, email, and story idea to create magic!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Your magical idea has been received! ✨",
      description: "Thank you for sharing your creativity. We'll review your suggestion and might just turn it into a dreamy bedtime story!",
    });
    
    // Reset form
    setFormData({
      parentName: '',
      childName: '',
      childAge: '',
      email: '',
      storyIdea: '',
      themes: '',
      characters: '',
      additionalDetails: ''
    });
    
    setIsSubmitting(false);
  };

  const inspirationPrompts = [
    "A sleepy dragon who helps children overcome their fears",
    "A magical library where books come to life at bedtime",
    "A gentle giant who waters the dream flowers every night",
    "A curious kitten who explores the land of peaceful dreams",
    "A friendly cloud who carries children to dreamland",
    "A wise owl who tells stories to the stars"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-night">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 text-star-yellow float">
            <Lightbulb className="h-6 w-6" />
          </div>
          <div className="absolute top-32 right-16 text-cloud-white float-delayed">
            <Star className="h-8 w-8" />
          </div>
          <div className="absolute bottom-20 left-1/4 text-moon-silver float">
            <Heart className="h-10 w-10" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={logoImage} alt="Snoozies Logo" className="h-12 w-auto float" />
          </div>
          <Moon className="h-12 w-12 text-star-yellow mx-auto mb-6 sparkle" />
          <h1 className="text-5xl md:text-6xl font-nunito font-bold text-white mb-6 drop-shadow-2xl">
            Share Your Story Ideas
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Have a magical story idea? We'd love to hear it! Your creativity could become the next beloved Snoozies bedtime story.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Main Form */}
        <Card className="card-story mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent & Child Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <Input
                  id="parentName"
                  name="parentName"
                  type="text"
                  placeholder="Parent/Guardian name"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="childName" className="block text-sm font-medium text-foreground mb-2">
                  Child's Name (Optional)
                </label>
                <Input
                  id="childName"
                  name="childName"
                  type="text"
                  placeholder="Little dreamer's name"
                  value={formData.childName}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="childAge" className="block text-sm font-medium text-foreground mb-2">
                  Child's Age
                </label>
                <select 
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:border-primary transition-colors duration-300"
                >
                  <option value="">Select age</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-7">6-7 years</option>
                  <option value="8-10">8-10 years</option>
                  <option value="11+">11+ years</option>
                </select>
              </div>
            </div>

            {/* Story Details */}
            <div>
              <label htmlFor="storyIdea" className="block text-sm font-medium text-foreground mb-2">
                Your Story Idea *
              </label>
              <Textarea
                id="storyIdea"
                name="storyIdea"
                placeholder="Tell us about your magical story idea... What happens? Who are the characters? Where does it take place?"
                value={formData.storyIdea}
                onChange={handleChange}
                rows={4}
                className="bg-background border-border focus:border-primary transition-colors duration-300"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="themes" className="block text-sm font-medium text-foreground mb-2">
                  Themes or Lessons
                </label>
                <Input
                  id="themes"
                  name="themes"
                  type="text"
                  placeholder="e.g., friendship, courage, kindness"
                  value={formData.themes}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="characters" className="block text-sm font-medium text-foreground mb-2">
                  Main Characters
                </label>
                <Input
                  id="characters"
                  name="characters"
                  type="text"
                  placeholder="e.g., a sleepy bear, magical fairy"
                  value={formData.characters}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-foreground mb-2">
                Additional Details
              </label>
              <Textarea
                id="additionalDetails"
                name="additionalDetails"
                placeholder="Any other details, inspiration, or special requests for your story..."
                value={formData.additionalDetails}
                onChange={handleChange}
                rows={3}
                className="bg-background border-border focus:border-primary transition-colors duration-300"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-dreamy text-lg py-4"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending your magical idea...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Share Your Story Idea
                </div>
              )}
            </Button>
          </form>
        </Card>

        {/* Inspiration Section */}
        <Card className="card-story bg-gradient-dreamy text-white mb-12">
          <div className="text-center mb-8">
            <Moon className="h-10 w-10 mx-auto mb-4 float" />
            <h2 className="text-2xl font-nunito font-bold mb-4">
              Need Some Inspiration?
            </h2>
            <p className="text-white/90">
              Here are some magical story ideas to spark your creativity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {inspirationPrompts.map((prompt, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <Star className="h-4 w-4 text-star-yellow flex-shrink-0 mt-1" />
                  <p className="text-white/90 text-sm">
                    {prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-story text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-nunito font-semibold text-foreground mb-2">
              Community Driven
            </h3>
            <p className="text-sm text-muted-foreground">
              Our best stories come from families like yours who share their creative ideas with us.
            </p>
          </Card>

          <Card className="card-story text-center">
            <Lightbulb className="h-8 w-8 text-star-yellow mx-auto mb-4" />
            <h3 className="font-nunito font-semibold text-foreground mb-2">
              Every Idea Matters
            </h3>
            <p className="text-sm text-muted-foreground">
              We read every suggestion and many have become beloved bedtime stories in our collection.
            </p>
          </Card>

          <Card className="card-story text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-nunito font-semibold text-foreground mb-2">
              Credit Where Due
            </h3>
            <p className="text-sm text-muted-foreground">
              If we use your idea, we'll credit you as the story inspiration and send you early access!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StorySuggestions;