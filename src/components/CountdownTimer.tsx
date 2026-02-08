
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // Target: Feb 9th of current year (or next if passed)
        const now = new Date();
        let targetYear = now.getFullYear();
        let targetDate = new Date(`${targetYear}-02-09T00:00:00`);

        if (now > targetDate) {
            // If today is past Feb 9, maybe countdown to next year or just show "It's Chocolate Day!"
            // If it's ON Feb 9, show message.
            // Let's make it so if it's past, we show the message immediately or countdown to next year? 
            // User request implies a countdown. Let's assume it's for the 'event'.
            // If strictly past, let's target next year for the timer logic, 
            // BUT if it is Feb 9, we show surprise.
            const isToday = now.getMonth() === 1 && now.getDate() === 9;
            if (isToday) {
                setIsExpired(true);
                return;
            }
            targetDate = new Date(`${targetYear + 1}-02-09T00:00:00`);
        }

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const distance = targetDate.getTime() - currentTime;

            if (distance < 0) {
                clearInterval(interval);
                setIsExpired(true);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (isExpired) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mt-8 p-4 glass-card border-gold-500/50"
            >
                <h3 className="text-2xl font-display font-bold text-gold-500 animate-pulse">
                    🎉 Today is Chocolate Day! 🍫
                </h3>
                <p className="text-cream-100/80">Make it sweetest day ever!</p>
            </motion.div>
        );
    }

    return (
        <div className="flex justify-center gap-4 mt-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 glass-card flex items-center justify-center border-chocolate-400">
                        <span className="text-2xl md:text-3xl font-bold text-gold-400 font-mono">
                            {value.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-xs md:text-sm uppercase tracking-wider mt-2 text-chocolate-white/60">
                        {unit}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
