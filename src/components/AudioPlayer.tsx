import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface AudioPlayerProps {
  src: string;
  title: string;
  duration?: string;
  compact?: boolean;
}

const AudioPlayer = ({ src, title, duration = "0:00", compact = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (value[0] / 100) * totalDuration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  if (compact) {
    return (
      <div className="flex items-center space-x-3 bg-card rounded-xl p-3 shadow-soft">
        <audio ref={audioRef} src={src} />
        <Button
          onClick={togglePlay}
          size="sm"
          className="btn-dreamy h-10 w-10 rounded-full p-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground truncate">{title}</p>
          <Slider
            value={[progress]}
            onValueChange={handleSeek}
            max={100}
            step={1}
            className="mt-1"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTime(currentTime)} / {totalDuration > 0 ? formatTime(totalDuration) : duration}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft">
      <audio ref={audioRef} src={src} />
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-fredoka font-medium text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">Duration: {totalDuration > 0 ? formatTime(totalDuration) : duration}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{totalDuration > 0 ? formatTime(totalDuration) : duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <Button
          onClick={() => {/* Skip back 10s */}}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
        >
          <SkipBack className="h-5 w-5" />
        </Button>

        <Button
          onClick={togglePlay}
          className="btn-dreamy h-14 w-14 rounded-full p-0"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>

        <Button
          onClick={() => {/* Skip forward 10s */}}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-8">{volume}%</span>
      </div>
    </div>
  );
};

export default AudioPlayer;