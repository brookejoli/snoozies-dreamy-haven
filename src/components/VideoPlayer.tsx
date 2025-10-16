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
  // When both YouTube and audio are available, show YouTube with audio fallback
  if (youtubeId && audioUrl) {
    return (
      <div className="space-y-4 mb-8">
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
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="text-2xl">🎧</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Can't see the video?</h3>
              <p className="text-sm text-gray-600">If YouTube is blocked on your network, listen to the audio version below:</p>
            </div>
          </div>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    );
  }

  // Embed YouTube when only an ID is provided
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

  // Show audio player when only audio is available
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
