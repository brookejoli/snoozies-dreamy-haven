import { Heart, Users, Star, Moon, Book, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former pediatric sleep specialist with 15+ years helping families establish healthy sleep routines.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Chen",
      role: "Head of Content",
      bio: "Award-winning children's author and storyteller, creator of over 200 bedtime stories.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Emma Rodriguez",
      role: "Child Development Expert",
      bio: "PhD in Child Psychology, specializing in the cognitive benefits of bedtime storytelling.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "David Kim",
      role: "Audio Producer",
      bio: "Professional audio engineer dedicated to creating the most soothing soundscapes for children.",
      image: "/api/placeholder/300/300"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Child-Centered Design",
      description: "Every story and feature is designed with children's developmental needs and emotional well-being in mind."
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      description: "We take child safety seriously, with robust privacy protections and age-appropriate content guidelines."
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Our stories are professionally written, narrated, and produced to the highest standards."
    },
    {
      icon: Users,
      title: "Family Connection",
      description: "We believe bedtime stories strengthen family bonds and create lasting memories."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "The Beginning",
      description: "Founded by a sleep-deprived parent who believed bedtime could be magical, not stressful."
    },
    {
      year: "Early 2024",
      title: "First Stories",
      description: "Launched with our first collection of carefully crafted bedtime stories, focusing on gentle, boring tales."
    },
    {
      year: "Mid 2024",
      title: "Growing Community",
      description: "Building our YouTube channel and connecting with families who believe in peaceful bedtime routines."
    },
    {
      year: "Late 2024",
      title: "Story Collaboration",
      description: "Launched story suggestion platform, inviting families to help create the bedtime stories they dream about."
    },
    {
      year: "2025",
      title: "Expanding the Dream",
      description: "Planning new features, more stories, and building the ultimate bedtime community for families worldwide."
    }
  ];

  return (
    <div className="min-h-screen pt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
            About Snoozies
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to transform bedtime from a daily struggle into a cherished family ritual filled with wonder, connection, and peaceful sleep.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-dreamy rounded-3xl p-12 text-center mb-16">
          <Moon className="h-16 w-16 text-white mx-auto mb-6 float" />
          <h2 className="text-3xl font-nunito font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            Every child deserves a peaceful, magical bedtime experience. Through carefully crafted stories and innovative sleep solutions, we help families establish healthy sleep routines that nurture both rest and imagination.
          </p>
        </div>

        {/* Story */}
        <div className="bg-gradient-dreamy rounded-3xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-kalam font-bold text-white mb-8 text-center">
              My Story
            </h2>
            <div className="space-y-6 text-white font-kalam text-lg font-bold leading-relaxed">
              <p>
                I created Snoozies because I know what it's like to struggle with sleep.
              </p>
              <p>
                I've always had trouble falling asleep — and I'm not alone. Some of my friends' kids have the same challenge. They're full of energy, full of stories, and sometimes just can't slow down at the end of the day.
              </p>
              <p>
                That's why I started Snoozies: a bedtime story series made to be simple, soothing, and actually helpful. These stories are slow, gentle, and sometimes a little boring — on purpose. They're designed to quiet busy minds and help kids (and grownups) drift off peacefully.
              </p>
              <div className="my-8">
                <p className="mb-4"><strong>Snoozies features:</strong></p>
                <div className="space-y-2 ml-4">
                  <p>🌙 Sleep stories read in a soft, calming voice</p>
                  <p>🎵 Quiet music and peaceful visuals for wind-down routines</p>
                  <p>📚 Stories with no big twists, just slow, cozy pacing</p>
                  <p>💭 Magical, mundane, and sleepy tales — inspired by real kids' imaginations</p>
                </div>
              </div>
              <p>
                I'm still building this — it's a work in progress. I'm always open to story ideas from listeners, because the best ones usually come from kids themselves.
              </p>
              <p>
                Whether you're a parent, teacher, therapist, or someone like me who just wants a little calm at the end of the day… I hope Snoozies helps you or someone you love feel a little more peaceful.
              </p>
              <p>
                Thanks for being here. Sweet dreams.
              </p>
              <div className="text-right mt-8">
                <p className="text-xl">xoxo,</p>
                <p className="text-2xl font-bold">Brooke</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from story creation to product development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="card-story text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-nunito font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate experts in child development, storytelling, and sleep science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-story text-center">
                <div className="w-24 h-24 bg-gradient-dreamy rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-nunito font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to helping families worldwide sleep better
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="bg-gradient-dreamy text-white rounded-full w-24 h-24 flex flex-col items-center justify-center font-nunito font-bold text-sm flex-shrink-0 shadow-dreamy">
                  <div className="text-xs opacity-90">Year</div>
                  <div className="text-lg">{milestone.year}</div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-2xl font-nunito font-bold text-foreground mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recognition */}
        <div className="bg-card rounded-3xl p-12 shadow-soft mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Recognition & Awards
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Star className="h-12 w-12 text-star-yellow mx-auto mb-4" />
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Parent's Choice Gold Award
              </h3>
              <p className="text-muted-foreground text-sm">
                2023 - Best Children's App
              </p>
            </div>

            <div>
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Family App of the Year
              </h3>
              <p className="text-muted-foreground text-sm">
                2022 - Digital Health Awards
              </p>
            </div>

            <div>
              <Shield className="h-12 w-12 text-dreamy-blue mx-auto mb-4" />
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Child Safety Certified
              </h3>
              <p className="text-muted-foreground text-sm">
                kidSAFE COPPA Certified
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="card-story max-w-2xl mx-auto">
            <Moon className="h-12 w-12 text-primary mx-auto mb-6 sparkle" />
            <h3 className="text-2xl font-nunito font-bold text-foreground mb-4">
              Join Our Mission
            </h3>
            <p className="text-muted-foreground mb-6">
              Be part of transforming bedtime for families around the world. Start your peaceful bedtime journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-dreamy">
                <Link to="/stories">
                  Browse Stories
                </Link>
              </Button>
              <Button asChild variant="outline" className="btn-sleepy">
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;