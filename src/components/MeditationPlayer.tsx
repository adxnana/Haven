import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

interface MeditationTrack {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string;
  audioUrl: string;
}

// Using free ambient sound URLs - these are placeholder URLs that work with web audio
const meditationTracks: MeditationTrack[] = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    description: 'Soft rain sounds for relaxation',
    duration: '30 min',
    icon: '🌧️',
    audioUrl: 'https://www.soundjay.com/nature/sounds/rain-01.mp3',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Calming waves on a peaceful shore',
    duration: '30 min',
    icon: '🌊',
    audioUrl: 'https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3',
  },
  {
    id: 'forest',
    name: 'Forest Ambience',
    description: 'Birds and nature sounds',
    duration: '30 min',
    icon: '🌲',
    audioUrl: 'https://www.soundjay.com/nature/sounds/birds-1.mp3',
  },
  {
    id: 'wind',
    name: 'Gentle Wind',
    description: 'Soft breeze through trees',
    duration: '30 min',
    icon: '🍃',
    audioUrl: 'https://www.soundjay.com/nature/sounds/wind-1.mp3',
  },
];

interface MeditationPlayerProps {
  onClose?: () => void;
}

const MeditationPlayer = ({ onClose }: MeditationPlayerProps) => {
  const [selectedTrack, setSelectedTrack] = useState<MeditationTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const playTrack = (track: MeditationTrack) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.audioUrl);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume / 100;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    });

    audio.addEventListener('error', () => {
      // Handle audio load error gracefully
      console.log('Audio source not available');
    });

    audioRef.current = audio;
    setSelectedTrack(track);
    audio.play().catch(() => {
      // Silently handle autoplay errors
    });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const resetTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Track Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meditationTracks.map((track) => (
          <Card
            key={track.id}
            className={`p-4 cursor-pointer transition-smooth hover:shadow-elevated border-0 shadow-soft ${
              selectedTrack?.id === track.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => playTrack(track)}
          >
            <div className="text-center">
              <span className="text-4xl mb-2 block">{track.icon}</span>
              <h4 className="font-medium text-sm">{track.name}</h4>
              <p className="text-xs text-muted-foreground">{track.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Player Controls */}
      {selectedTrack && (
        <Card className="shadow-elevated p-6 border-0">
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-5xl mb-2 block">{selectedTrack.icon}</span>
              <h3 className="text-xl font-semibold">{selectedTrack.name}</h3>
              <p className="text-muted-foreground">{selectedTrack.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" variant="ghost" onClick={resetTrack}>
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button size="lg" onClick={togglePlay} className="w-16 h-16 rounded-full">
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-4 max-w-xs mx-auto">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={([v]) => setVolume(v)}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MeditationPlayer;
