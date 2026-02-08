
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface Item {
    id: number;
    x: number;
    y: number;
    type: 'chocolate' | 'heart';
}

const LoveCatcher = () => {
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [items, setItems] = useState<Item[]>([]);
    const requestRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(30);
        setItems([]);
    };

    // Game Loop
    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsPlaying(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const spawnItem = () => {
            if (Math.random() > 0.3) return; // Control spawn rate

            const id = Date.now() + Math.random();
            const type = Math.random() > 0.6 ? 'heart' : 'chocolate';
            const x = Math.random() * 80 + 10; // 10% to 90% width

            setItems((prev) => [...prev, { id, x, y: -10, type }]);
        };

        const spawnTimer = setInterval(spawnItem, 800);

        return () => {
            clearInterval(timer);
            clearInterval(spawnTimer);
        };
    }, [isPlaying]);

    // Tick for physics (falling items)
    useEffect(() => {
        if (!isPlaying) return;

        const animate = () => {
            setItems(prevItems =>
                prevItems
                    .map(item => ({ ...item, y: item.y + 0.8 })) // Fall speed
                    .filter(item => item.y < 110) // Remove if out of bounds
            );
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [isPlaying]);

    const handleCatch = (id: number, type: 'chocolate' | 'heart') => {
        setItems(prev => prev.filter(item => item.id !== id));
        setScore(prev => prev + (type === 'heart' ? 20 : 10));
    };

    return (
        <div className="p-8 glass-card max-w-md mx-auto my-12 text-center relative overflow-hidden min-h-[400px]">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-2">
                Sweet Catcher 🧺
            </h3>

            {!isPlaying && timeLeft === 30 && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                    <p className="text-chocolate-600 mb-6 px-4">
                        Catch as many falling hearts & chocolates as you can in 30 seconds!
                    </p>
                    <Button onClick={startGame} className="bg-chocolate-600 hover:bg-chocolate-800 text-cream-100 text-lg px-8 py-6 rounded-full animate-bounce">
                        Start Game ▶️
                    </Button>
                </div>
            )}

            {!isPlaying && timeLeft === 0 && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                    <h4 className="text-3xl font-bold text-chocolate-dark mb-2">Time's Up!</h4>
                    <p className="text-xl text-chocolate-600 mb-6">You collected {score} sweetness points!</p>
                    <Button onClick={startGame} className="bg-gold-500 hover:bg-gold-600 text-chocolate-900 font-bold">
                        Play Again 🔄
                    </Button>
                </div>
            )}

            {/* Game Stats */}
            <div className="flex justify-between items-center mb-4 font-bold text-chocolate-800 bg-white/50 p-2 rounded-lg">
                <span>Score: {score}</span>
                <span>Time: {timeLeft}s</span>
            </div>

            {/* Game Area */}
            <div
                ref={containerRef}
                className="relative h-[300px] bg-sky-100/30 rounded-xl border-2 border-chocolate-200 overflow-hidden cursor-crosshair"
            >
                <AnimatePresence>
                    {items.map(item => (
                        <motion.button
                            key={item.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, top: `${item.y}%`, left: `${item.x}%` }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute transform -translate-x-1/2 p-2 focus:outline-none"
                            onClick={() => handleCatch(item.id, item.type)}
                            onMouseDown={() => handleCatch(item.id, item.type)} // Identify click faster
                        >
                            {item.type === 'heart' ? (
                                <Heart fill="#E11D48" className="text-rose-600 w-8 h-8 drop-shadow-md" />
                            ) : (
                                <span className="text-3xl drop-shadow-md">🍫</span>
                            )}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoveCatcher;
