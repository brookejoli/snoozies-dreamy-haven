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