
import { motion } from 'framer-motion';

const ChocolateLetter = () => {
    const letterContent = `My Dearest,

From the moment you walked into my life, everything became sweeter. 
You are my favorite flavor of joy, my daily dose of happiness, and the one person who melts my heart.

This Chocolate Day, I want to remind you that no chocolate in the world is as sweet as your smile.
Thank you for making life delicious.

Forever yours,
Your Secret Admirer ❤️`;

    return (
        <div className="max-w-2xl mx-auto my-16 px-6">
            <motion.div
                className="relative bg-[#f4e4bc] text-chocolate-900 p-8 md:p-12 rounded-sm shadow-xl rotate-1"
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
                    backgroundImage: 'linear-gradient(#e1c699 .1rem, transparent .1rem)',
                    backgroundSize: '100% 2rem'
                }}
            >
                <div className="absolute top-0 left-0 w-full h-8 bg-[rgba(0,0,0,0.05)]" />

                <h3 className="font-handwriting text-3xl mb-6 text-chocolate-800">A Letter for You...</h3>

                <div className="font-handwriting text-2xl leading-[2rem] whitespace-pre-wrap">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                    >
                        {letterContent}
                    </motion.div>
                </div>

                {/* Chocolate smudge decoration */}
                <div className="absolute bottom-4 right-8 w-16 h-16 opacity-20 pointer-events-none rounded-full bg-[#3e1c10] blur-sm transform scale-y-75 rotate-12" />
            </motion.div>
        </div>
    );
};

export default ChocolateLetter;
