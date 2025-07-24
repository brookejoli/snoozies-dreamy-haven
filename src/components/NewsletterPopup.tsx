import { useState, useEffect } from 'react';
import { X, Mail, Star, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import logoImage from '@/assets/snoozies-logo.png';

interface NewsletterPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewsletterPopup = ({ isVisible, onClose }: NewsletterPopupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name and email to send you magical bedtime stories.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the Snoozies family! ✨",
      description: "You'll receive your first magical bedtime story soon. Sweet dreams!",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl shadow-dreamy max-w-md w-full p-8 relative border border-border/50 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-full p-1 hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logoImage} alt="Snoozies Logo" className="h-12 w-auto" />
          </div>
          <h3 className="text-2xl font-nunito font-bold text-foreground mb-2">
            Sweet Dreams Await ✨
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Join our dreamy community and receive a new magical bedtime story every week. 
            Let us help make your little one's nights more peaceful and enchanting.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Little dreamer's guardian
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border focus:border-primary transition-colors duration-300"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Where shall we send the magic?
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-border focus:border-primary transition-colors duration-300"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-dreamy text-lg py-3 mt-6"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending magic...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Begin the Journey
              </div>
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          No spam, just peaceful bedtime stories. Unsubscribe anytime with a simple click.
        </p>
      </div>
    </div>
  );
};

export default NewsletterPopup;