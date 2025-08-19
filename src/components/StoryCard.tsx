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
      <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border/20">
        <div className="relative">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-40 sm:h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1.5 min-h-[44px] sm:min-h-auto">
            <Clock className="w-3 h-3" /> {duration}
          </div>
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Play className="w-4 h-4" />
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 overflow-hidden text-sm sm:text-base leading-relaxed">
            {excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
            <span>{publishedAt}</span>
            <div className="flex items-center gap-1 min-h-[44px] min-w-[44px] justify-center">
              <Heart className="w-4 h-4 hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};