import { useState } from 'react';
import { Check, Star, Crown, Gift, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Subscribe = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free on YouTube",
      price: "0",
      period: "forever",
      description: "Basic bedtime stories to get started",
      features: [
        "5-8 minute story previews",
        "Basic audio quality",
        "Ads included",
        "No downloads",
        "Limited story library"
      ],
      buttonText: "Visit YouTube",
      popular: false,
      icon: Gift,
      isYoutube: true
    },
    {
      name: "Premium Stories",
      price: isAnnual ? "59" : "9.99",
      period: isAnnual ? "year" : "month",
      description: "Extended stories & exclusive premium content",
      features: [
        "20-30 minute extended story versions",
        "Exclusive premium-only stories",
        "Ad-free, uninterrupted listening",
        "Offline downloads for travel",
        "Sleep timer with gentle fade-out",
        "Early access to new stories",
        "High-quality lossless audio",
        "Personalized story recommendations"
      ],
      buttonText: "Get Premium Access",
      popular: true,
      icon: Star
    },
    {
      name: "Family Plus",
      price: isAnnual ? "99" : "15.99",
      period: isAnnual ? "year" : "month",
      description: "Premium features + personalized family content",
      features: [
        "Everything in Premium Stories",
        "Custom stories with your child's name",
        "Up to 6 personalized child profiles",
        "Monthly story requests & suggestions",
        "Interactive bedtime routine guides",
        "Seasonal & holiday story collections",
        "Live monthly story sessions",
        "Printable story companion books",
        "Priority customer support"
      ],
      buttonText: "Get Family Plus",
      popular: false,
      icon: Crown
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      children: "Mom of 2",
      quote: "Snoozies has completely transformed our bedtime routine. My kids actually look forward to going to bed now!",
      rating: 5
    },
    {
      name: "David K.",
      children: "Dad of 3",
      quote: "The stories are beautifully crafted and really help my children relax. Worth every penny.",
      rating: 5
    },
    {
      name: "Emma L.",
      children: "Mom of 1",
      quote: "As a working parent, having these calming stories ready at bedtime is a lifesaver.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
            Choose Your Bedtime Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of families who have made bedtime peaceful and magical
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-star-yellow text-foreground ml-2">
                Save 50%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative p-8 ${
                  plan.popular 
                    ? 'border-primary shadow-dreamy scale-105 bg-gradient-to-b from-primary/5 to-secondary/5' 
                    : 'card-story'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-nunito font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  {isAnnual && plan.name === "Premium Stories" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually ($59/year)
                    </p>
                  )}
                  {isAnnual && plan.name === "Family Plus" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually ($99/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.isYoutube ? (
                  <Button 
                    className="btn-sleepy w-full"
                    onClick={() => window.open('https://www.youtube.com/@snooziestories', '_blank')}
                  >
                    {plan.buttonText}
                  </Button>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-muted-foreground text-sm">Coming Soon</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-card rounded-3xl p-12 shadow-soft mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              What's Included in Your Subscription
            </h2>
            <p className="text-muted-foreground">
              Everything you need for peaceful, magical bedtimes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
               <h3 className="font-nunito font-semibold text-foreground mb-2">
                 Extended Premium Stories
               </h3>
               <p className="text-sm text-muted-foreground">
                 20-30 minute extended versions of stories available only to subscribers
               </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
               <h3 className="font-nunito font-semibold text-foreground mb-2">
                 Personalized Content
               </h3>
               <p className="text-sm text-muted-foreground">
                 Custom stories featuring your child's name and personalized adventures
               </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
               <h3 className="font-nunito font-semibold text-foreground mb-2">
                 Early Access & Exclusives
               </h3>
               <p className="text-sm text-muted-foreground">
                 Get new stories 2 weeks before they're released on YouTube
               </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-primary" />
              </div>
               <h3 className="font-nunito font-semibold text-foreground mb-2">
                 Ad-Free Experience
               </h3>
               <p className="text-sm text-muted-foreground">
                 Uninterrupted listening with offline downloads and sleep timer
               </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-muted-foreground">
              Thousands of families trust Snoozies for peaceful bedtimes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-story text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-star-yellow fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-nunito font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.children}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-3xl p-12 shadow-soft">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                How many devices can I use?
              </h3>
              <p className="text-muted-foreground">
                You can use Snoozies on up to 5 devices simultaneously with your subscription.
              </p>
            </div>

            <div>
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Are new stories really added every week?
              </h3>
              <p className="text-muted-foreground">
                Yes! Our team of writers and narrators create fresh, original content every week to keep your bedtime routine exciting.
              </p>
            </div>

            <div>
              <h3 className="font-nunito font-semibold text-foreground mb-2">
                Is there a family discount?
              </h3>
              <p className="text-muted-foreground">
                Our Family plan is designed for households with multiple children and includes additional features at a discounted per-child rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;