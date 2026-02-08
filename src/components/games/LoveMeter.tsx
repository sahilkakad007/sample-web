
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveMeter = () => {
    const [level, setLevel] = useState(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(parseInt(e.target.value));
    };

    return (
        <div className="p-8 glass-card max-w-md mx-auto my-12 text-center">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-2">
                Chocolate Love Meter
            </h3>
            <p className="text-chocolate-600/80 mb-6">How much do you love chocolate (and me)?</p>

            <div className="relative h-64 w-full flex items-center justify-center">
                {/* Heart container that fills up */}
                <div className="relative w-40 h-40">
                    <Heart
                        className="w-full h-full text-chocolate-200"
                        width={160}
                        height={160}
                        strokeWidth={1}
                    />
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden flex items-end justify-center" style={{ height: `${level}%`, transition: 'height 0.3s ease' }}>
                        <Heart
                            className="w-full h-full text-red-500 fill-red-500 absolute bottom-0"
                            width={160}
                            height={160}
                            strokeWidth={0}
                            preserveAspectRatio="xMidYMax slice"
                        />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl drop-shadow-md z-10">
                        {level}%
                    </div>
                </div>
            </div>

            <input
                type="range"
                min="0"
                max="100"
                value={level}
                onChange={handleChange}
                className="w-full h-2 bg-chocolate-200 rounded-lg appearance-none cursor-pointer accent-chocolate-600 mt-6"
            />

            <p className="mt-4 font-handwriting text-xl text-chocolate-800 font-bold min-h-[2rem]">
                {level < 20 && "Needs more sweetness! 🍫"}
                {level >= 20 && level < 50 && "Getting there... 🍬"}
                {level >= 50 && level < 80 && "Now we're talking! 🍩"}
                {level >= 80 && level < 100 && "So much love! ❤️"}
                {level === 100 && "MAXIMUM SWEETNESS GLITCH! 🤯💖"}
            </p>
        </div>
    );
};

export default LoveMeter;
