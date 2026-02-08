
import { useState } from 'react';
import { motion } from 'framer-motion';

interface BreakableBarProps {
    onBreak: () => void;
}

const BreakableBar = ({ onBreak }: BreakableBarProps) => {
    const [isBroken, setIsBroken] = useState(false);

    const handleBreak = () => {
        if (!isBroken) {
            setIsBroken(true);
            setTimeout(onBreak, 1000); // Wait for animation
        }
    };

    return (
        <div className="cursor-pointer" onClick={handleBreak}>
            {!isBroken ? (
                <motion.div
                    className="w-64 h-32 bg-gradient-to-br from-[#5D4037] to-[#3E2723] rounded-lg shadow-xl grid grid-cols-4 gap-1 p-2 border-b-4 border-r-4 border-[#2D1B18]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Chocolate Squares */}
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-[#6D4C41] rounded-sm shadow-inner" />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold uppercase tracking-widest pointer-events-none">
                        Break Me
                    </div>
                </motion.div>
            ) : (
                <div className="relative w-64 h-32">
                    <motion.div
                        className="absolute top-0 left-0 w-[52%] h-full bg-gradient-to-br from-[#5D4037] to-[#3E2723] rounded-l-lg p-2 grid grid-cols-2 gap-1 overflow-hidden"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -15, x: -20, y: 20, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-[#6D4C41] rounded-sm shadow-inner" />
                        ))}
                    </motion.div>
                    <motion.div
                        className="absolute top-0 right-0 w-[48%] h-full bg-gradient-to-br from-[#5D4037] to-[#3E2723] rounded-r-lg p-2 grid grid-cols-2 gap-1 overflow-hidden"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 15, x: 20, y: 20, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-[#6D4C41] rounded-sm shadow-inner" />
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default BreakableBar;
