import { Mail, Phone, MapPin, Clock, MessageCircle, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help from our friendly support team",
      contact: "hello@snoozies.com",
      responseTime: "Usually within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available in app",
      responseTime: "Mon-Fri, 9AM-5PM EST"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "1-800-SNOOZIE",
      responseTime: "Mon-Fri, 9AM-6PM EST"
    }
  ];

  const faqs = [
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings or by contacting our support team."
    },
    {
      question: "Can I download stories for offline listening?",
      answer: "Yes! Premium subscribers can download unlimited stories for offline listening, perfect for travel or areas with poor internet."
    },
    {
      question: "What age groups are your stories designed for?",
      answer: "Our stories are crafted for children ages 2-10, with age-appropriate content and themes for different developmental stages."
    },
    {
      question: "Do you offer family plans?",
      answer: "Yes! Our Family plan allows up to 6 child profiles and includes additional parental controls and features."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-nunito font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help make your bedtime experience magical. Reach out with questions, feedback, or just to say hello!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card key={index} className="card-story text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-nunito font-semibold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {method.description}
                </p>
                <p className="font-medium text-primary mb-2">
                  {method.contact}
                </p>
                <Badge variant="outline" className="text-xs">
                  {method.responseTime}
                </Badge>
              </Card>
            );
          })}
        </div>

        {/* Contact Form & Info */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-story">
              <h2 className="text-2xl font-nunito font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground">
                    <option>General Question</option>
                    <option>Technical Support</option>
                    <option>Billing & Subscription</option>
                    <option>Story Suggestion</option>
                    <option>Partnership Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    className="bg-background border-border"
                  />
                </div>
                
                <Button type="submit" className="btn-dreamy w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="card-story">
              <h3 className="font-nunito font-semibold text-foreground mb-4">
                <MapPin className="h-5 w-5 inline mr-2" />
                Our Office
              </h3>
              <div className="text-muted-foreground space-y-2">
                <p>Snoozies Sleep Stories</p>
                <p>123 Dreamy Lane</p>
                <p>Peaceful Valley, CA 90210</p>
                <p>United States</p>
              </div>
            </Card>

            <Card className="card-story">
              <h3 className="font-nunito font-semibold text-foreground mb-4">
                <Clock className="h-5 w-5 inline mr-2" />
                Business Hours
              </h3>
              <div className="text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9AM - 6PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10AM - 4PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </Card>

            <Card className="card-story bg-gradient-dreamy text-white">
              <Heart className="h-8 w-8 mb-4" />
              <h3 className="font-nunito font-semibold mb-2">
                We Love Hearing from You!
              </h3>
              <p className="text-white/90 text-sm">
                Your feedback helps us create better bedtime experiences for families worldwide. Every message matters to us.
              </p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-nunito font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-story">
                <h3 className="font-nunito font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <Card className="card-story text-center bg-gradient-night text-white">
          <h2 className="text-2xl font-nunito font-bold mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-white/80 mb-6">
            If you're experiencing technical issues that prevent your child from accessing their bedtime stories, we're here to help right away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-foreground hover:bg-white/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="border-white text-black bg-white hover:bg-white/90 hover:text-black">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;