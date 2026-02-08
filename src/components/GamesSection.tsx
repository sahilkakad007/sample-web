
import { motion } from 'framer-motion';
import YesNoButton from './games/YesNoButton';
import LoveMeter from './games/LoveMeter';
import MemoryQuiz from './games/MemoryQuiz';
import ChocolateGenerator from './games/ChocolateGenerator';
import LoveCatcher from './games/LoveCatcher';

const GamesSection = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-chocolate-100/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-display font-bold text-chocolate-900 text-shadow-sm mb-4">
                        Fun & Games Zone 🎲
                    </h2>
                    <p className="text-chocolate-800 font-medium text-lg">Let's play some sweet games together!</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-12">
                        <MemoryQuiz />
                        <ChocolateGenerator />
                    </div>
                    <div className="space-y-12">
                        <LoveMeter />
                        <LoveCatcher />
                        <YesNoButton />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GamesSection;
