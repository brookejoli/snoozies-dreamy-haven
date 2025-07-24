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
      year: "2020",
      title: "The Beginning",
      description: "Founded by a sleep-deprived parent who believed bedtime could be magical, not stressful."
    },
    {
      year: "2021",
      title: "First Stories",
      description: "Launched with 25 carefully crafted bedtime stories, reaching 1,000 families in our first month."
    },
    {
      year: "2022",
      title: "Growing Community",
      description: "Reached 50,000 active families and introduced personalized story recommendations."
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Expanded internationally with multilingual stories, serving families in 15 countries."
    },
    {
      year: "2024",
      title: "Innovation Continues",
      description: "Launched AI-powered sleep insights and interactive storytelling features."
    }
  ];

  return (
    <div className="min-h-screen py-12">
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
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Snoozies was born from a simple realization: bedtime doesn't have to be a battle. Our founder, Sarah Johnson, was a pediatric sleep specialist who saw countless families struggling with evening routines.
              </p>
              <p>
                After years of research into the science of sleep and storytelling, she discovered that the right combination of narrative structure, calming audio design, and age-appropriate content could transform bedtime into a peaceful, anticipated part of the day.
              </p>
              <p>
                Today, we're proud to serve over 100,000 families worldwide, with a growing library of stories that help children not just fall asleep, but develop a lifelong love of bedtime.
              </p>
            </div>
          </div>
          <div className="bg-gradient-sunset rounded-3xl p-8 flex items-center justify-center h-80">
            <Book className="h-32 w-32 text-white/50" />
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

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-nunito font-bold text-sm flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="font-nunito font-semibold text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
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
                <Link to="/subscribe">
                  Start Free Trial
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