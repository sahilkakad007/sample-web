
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

const YesNoButton = () => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [yesPressed, setYesPressed] = useState(false);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100; // -100 to 100
        const y = Math.random() * 200 - 100;
        setNoBtnPosition({ x, y });
    };

    const handleYesClick = () => {
        setYesPressed(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D2691E', '#8B4513', '#FFFDD0'], // Chocolate colors
        });
    };

    return (
        <div className="text-center p-8 glass-card max-w-md mx-auto my-12">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-6">
                Will you be my Chocolate Date forever? 🍫
            </h3>

            {!yesPressed ? (
                <div className="flex justify-center gap-8 items-center h-20">
                    <Button
                        onClick={handleYesClick}
                        className="bg-chocolate-600 hover:bg-chocolate-800 text-cream-100 text-lg px-8 py-6 rounded-full transition-transform hover:scale-110"
                    >
                        YES! ❤️
                    </Button>

                    <motion.div
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onHoverStart={moveNoButton}
                        onClick={moveNoButton} // For mobile touch
                    >
                        <Button
                            variant="outline"
                            className="border-chocolate-400 text-chocolate-600 hover:bg-transparent hover:text-chocolate-600"
                        >
                            No 😢
                        </Button>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-chocolate-600 mt-4"
                >
                    Yay! Best decision ever! 💖🍫
                </motion.div>
            )}
        </div>
    );
};

export default YesNoButton;
