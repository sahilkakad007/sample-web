
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScratchCardProps {
    onReveal?: () => void;
    children: React.ReactNode;
}

const ScratchCard = ({ onReveal, children }: ScratchCardProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const isDrawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Fill with scratchable coating
        ctx.fillStyle = '#C0C0C0'; // Silver
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some texture/text to the coating
        ctx.font = '20px Arial';
        ctx.fillStyle = '#999';
        ctx.fillText('Scratch Here!', canvas.width / 2 - 60, canvas.height / 2);

        // Composite operation to "erase"
        ctx.globalCompositeOperation = 'destination-out';
    }, []);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || isRevealed) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        checkReveal();
    };

    const checkReveal = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Sample pixels to see how much is cleared
        // Optimization: check every 10th pixel
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let cleared = 0;
        const total = data.length / 4;

        for (let i = 0; i < data.length; i += 4 * 10) {
            if (data[i + 3] === 0) cleared++;
        }

        // If > 50% cleared, auto reveal rest
        if (cleared / (total / 10) > 0.5) {
            setIsRevealed(true);
            canvas.style.opacity = '0';
            canvas.style.pointerEvents = 'none';
            if (onReveal) onReveal();
        }
    };

    return (
        <div className="relative w-full h-[300px] bg-white rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center p-6">
                {children}
            </div>
            <canvas
                ref={canvasRef}
                width={400} // Fixed width for simplicity or dynamic
                height={300}
                className="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700"
                onMouseDown={() => isDrawing.current = true}
                onMouseUp={() => isDrawing.current = false}
                onMouseLeave={() => isDrawing.current = false}
                onMouseMove={handleMouseMove}
                onTouchStart={() => isDrawing.current = true}
                onTouchEnd={() => isDrawing.current = false}
                onTouchMove={handleMouseMove}
            />
        </div>
    );
};

export default ScratchCard;
