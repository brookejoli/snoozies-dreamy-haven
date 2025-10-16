import React, { useState } from 'react';
import { Mail, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters')
});

export const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Validate input
      const validation = emailSchema.safeParse({ email: email.trim() });
      if (!validation.success) {
        toast({
          title: "Invalid email",
          description: validation.error.issues[0].message,
          variant: "destructive",
        });
        setStatus('error');
        return;
      }

      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email: validation.data.email }]);
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed!",
            description: "This email is already on our magical mailing list.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (error) {
      console.error('Email signup error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl text-center">
        <Star className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Thanks for subscribing!</h3>
        <p>Check your email for the latest Snoozies stories.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
      <div className="text-center mb-4">
        <Mail className="w-10 h-10 text-purple-600 mx-auto mb-2" />
        <h3 className="text-xl font-bold text-purple-900 mb-1">Join Our Newsletter</h3>
        <p className="text-purple-700">Get weekly bedtime stories straight to your inbox.</p>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {status === 'loading' ? 'Submitting...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>}
    </form>
  );
};