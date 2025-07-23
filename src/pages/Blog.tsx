import { Clock, User, Tag, ArrowRight, Heart, BookOpen, Moon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Creating the Perfect Bedtime Routine",
      excerpt: "Discover science-backed strategies to help your child wind down and prepare for a restful night's sleep.",
      content: "A consistent bedtime routine is one of the most important things you can establish for your child's healthy sleep habits...",
      author: "Dr. Sarah Wilson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Sleep Tips",
      featured: true,
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "The Science Behind Bedtime Stories",
      excerpt: "Learn how storytelling affects your child's brain development and emotional well-being.",
      content: "Recent research shows that bedtime stories do more than just help children fall asleep...",
      author: "Dr. Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Child Development",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "Managing Bedtime Anxiety in Children",
      excerpt: "Practical strategies to help anxious children feel safe and secure at bedtime.",
      content: "Many children experience anxiety around bedtime, which can make the evening routine challenging...",
      author: "Emma Thompson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Mental Health",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "Age-Appropriate Sleep Schedules: A Parent's Guide",
      excerpt: "Understanding how much sleep your child needs at different developmental stages.",
      content: "Sleep needs change dramatically as children grow and develop...",
      author: "Dr. Lisa Park",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Sleep Tips",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 5,
      title: "Creating a Sleep-Friendly Bedroom Environment",
      excerpt: "Simple changes to make your child's bedroom the perfect place for peaceful sleep.",
      content: "The environment where your child sleeps plays a crucial role in the quality of their rest...",
      author: "Home & Sleep Expert",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Sleep Environment",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 6,
      title: "Screen Time and Sleep: Finding the Right Balance",
      excerpt: "How to manage technology use to protect your child's natural sleep patterns.",
      content: "In our digital age, managing screen time has become an essential part of healthy sleep hygiene...",
      author: "Dr. Sarah Wilson",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "Digital Wellness",
      featured: false,
      image: "/api/placeholder/800/400"
    }
  ];

  const categories = ["All", "Sleep Tips", "Child Development", "Mental Health", "Sleep Environment", "Digital Wellness"];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-foreground mb-6">
            Bedtime & Sleep Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert tips, research insights, and practical advice to help your family get better sleep
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <Card className="overflow-hidden shadow-dreamy">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-64 md:h-full bg-gradient-dreamy flex items-center justify-center">
                    <BookOpen className="h-24 w-24 text-white/50" />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-primary text-primary-foreground mb-4">
                    ✨ Featured Article
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-foreground mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {featuredPost.category}
                    </div>
                  </div>
                  <Button className="btn-dreamy">
                    Read Full Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="btn-sleepy"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {regularPosts.map((post) => (
            <Card key={post.id} className="card-story group">
              <div className="h-48 bg-gradient-sunset rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
                <div className="relative z-10">
                  {post.category === "Sleep Tips" && <Moon className="h-12 w-12 text-white/70" />}
                  {post.category === "Child Development" && <Heart className="h-12 w-12 text-white/70" />}
                  {post.category === "Mental Health" && <Heart className="h-12 w-12 text-white/70" />}
                  {post.category === "Sleep Environment" && <Moon className="h-12 w-12 text-white/70" />}
                  {post.category === "Digital Wellness" && <BookOpen className="h-12 w-12 text-white/70" />}
                </div>
                <Badge className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-primary text-xs">
                  {post.category}
                </Badge>
              </div>
              
              <h3 className="text-lg font-fredoka font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
              
              <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                Read More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-night rounded-3xl p-12 text-center">
          <Moon className="h-12 w-12 text-star-yellow mx-auto mb-6 float" />
          <h2 className="text-3xl font-fredoka font-bold text-white mb-4">
            Never Miss a Sleep Tip
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our weekly newsletter for the latest sleep research, bedtime tips, and exclusive content from sleep experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-star-yellow"
            />
            <Button className="bg-star-yellow text-foreground hover:bg-star-yellow/90 px-8 py-3 rounded-full font-medium">
              Subscribe
            </Button>
          </div>
          <p className="text-white/60 text-sm mt-4">
            No spam, just helpful sleep tips. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;