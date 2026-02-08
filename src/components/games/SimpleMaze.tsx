
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 0: Wall, 1: Path, 2: Start, 3: End
const initialMaze = [
    [2, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 3],
];

const SimpleMaze = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Grid coordinates
    const [won, setWon] = useState(false);

    const move = (dx: number, dy: number) => {
        if (won) return;
        const newX = position.x + dx;
        const newY = position.y + dy;

        if (
            newY >= 0 && newY < initialMaze.length &&
            newX >= 0 && newX < initialMaze[0].length &&
            initialMaze[newY][newX] !== 0
        ) {
            setPosition({ x: newX, y: newY });
            if (initialMaze[newY][newX] === 3) {
                setWon(true);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp') move(0, -1);
        if (e.key === 'ArrowDown') move(0, 1);
        if (e.key === 'ArrowLeft') move(-1, 0);
        if (e.key === 'ArrowRight') move(1, 0);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position, won]);

    return (
        <div className="p-8 glass-card max-w-md mx-auto my-12 text-center">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-4">
                Help the Chocolate Reach the Heart! ❤️
            </h3>
            <p className="text-sm text-chocolate-600 mb-4 hidden md:block">Use arrow keys to move</p>

            <div className="inline-grid grid-cols-5 gap-1 bg-chocolate-800 p-2 rounded-lg relative">
                {initialMaze.map((row, y) => (
                    row.map((cell, x) => {
                        const isPlayer = position.x === x && position.y === y;
                        return (
                            <div
                                key={`${x}-${y}`}
                                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm transition-colors duration-300
                    ${cell === 0 ? 'bg-chocolate-900' : 'bg-chocolate-400/30'}
                    ${cell === 3 ? 'bg-red-400/20' : ''}
                  `}
                            >
                                {cell === 3 && !isPlayer && <span className="text-xl">❤️</span>}
                                {isPlayer && (
                                    <motion.div layoutId="player" className="text-xl">🍫</motion.div>
                                )}
                            </div>
                        );
                    })
                ))}
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex flex-col items-center mt-6 gap-2">
                <Button size="sm" onClick={() => move(0, -1)}>⬆️</Button>
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => move(-1, 0)}>⬅️</Button>
                    <Button size="sm" onClick={() => move(0, 1)}>⬇️</Button>
                    <Button size="sm" onClick={() => move(1, 0)}>➡️</Button>
                </div>
            </div>

            {won && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 text-xl font-bold text-gold-500"
                >
                    You Made It! Love Found! 🎉
                </motion.div>
            )}
        </div>
    );
};

export default SimpleMaze;
