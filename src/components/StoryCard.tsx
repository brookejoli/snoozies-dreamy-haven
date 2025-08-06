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