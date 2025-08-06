/*
  src/components/StoryCard.tsx
  Story preview card component
*/
import React from 'react';
import { Play, Clock, Heart } from 'lucide-react';

export interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  duration: string;
  thumbnailUrl: string;
  publishedAt: string;
  tags: string[];
  onClick?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  excerpt,
  duration,
  thumbnailUrl,
  publishedAt,
  tags,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="block group cursor-pointer"
    >
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
            <Clock className="w-3 h-3" /> {duration}
          </div>
          <div className="absolute top-2 left-2 bg-purple-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-4 h-4" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 overflow-hidden">
            {excerpt.length > 120 ? `${excerpt.substring(0, 120)}...` : excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{publishedAt}</span>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
  src/components/VideoPlayer.tsx
  Handles embedding YouTube or audio playback
*/
import React from 'react';

interface VideoPlayerProps {
  youtubeId?: string;
  audioUrl?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeId, audioUrl }) => {
  if (youtubeId) {
    return (
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (audioUrl) {
    return (
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }
  return null;
};

/*
  src/components/EmailSignup.tsx
  Newsletter subscription form
*/
import React, { useState } from 'react';
import { Mail, Star } from 'lucide-react';

export const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.REACT_APP_BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed');
      }
    } catch {
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

/*
  src/components/AffiliateLinks.tsx
  Displays affiliate product recommendations
*/
import React from 'react';

export interface AffiliateProduct {
  name: string;
  amazonUrl: string;
  context: string;
}

interface AffiliateLinksProps {
  products: AffiliateProduct[];
}

export const AffiliateLinks: React.FC<AffiliateLinksProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🛍 Related Products</h2>
      <ul className="space-y-4">
        {products.map((product, idx) => (
          <li key={idx} className="border-t pt-4 first:border-none first:pt-0">
            <h3 className="font-semibold text-lg text-purple-700">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.context}</p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:underline"
            >
              View on Amazon
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
