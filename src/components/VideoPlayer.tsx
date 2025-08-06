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
  // Embed YouTube when an ID is provided
  if (youtubeId) {
    return (
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg mb-8">
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

  // Otherwise show a styled audio player
  if (audioUrl) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎧 Listen to Audio</h2>
        <audio controls className="w-full">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  // Nothing to render if neither is provided
  return null;
};
