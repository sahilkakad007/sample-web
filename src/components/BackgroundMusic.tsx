
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // You can replace this URL with a local file or a specific URL provided by the user
        // Ideally, we should add an audio file to public/
        // For now using a placeholder or a common royalty free one if available, 
        // but code assumes a file exists. Let's use a placeholder.
        audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/02/07/audio_1822436d65.mp3'); // Soft romantic piano
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        // Auto-play might be blocked by browsers, so we start paused or try to play on interaction
        // We'll leave it to user interaction to start if blocked.

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="rounded-full bg-chocolate-600/80 hover:bg-chocolate-800 text-cream-100 border-gold-500 shadow-lg backdrop-blur-sm"
            >
                {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
        </div>
    );
};

export default BackgroundMusic;
