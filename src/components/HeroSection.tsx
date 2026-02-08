import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface HeroSectionProps {
  onUnwrap: () => void;
}

const HeroSection = ({ onUnwrap }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden melted-bg">
      {/* Animated Background Drips */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-b-full opacity-60"
            style={{
              left: `${10 + i * 12}%`,
              width: '60px',
              height: '150px',
              background: 'linear-gradient(180deg, hsl(16 25% 24%) 0%, hsl(16 24% 34%) 100%)',
              animation: `drip ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          >
            <Heart
              className="text-blush"
              fill="currentColor"
              size={20 + Math.random() * 20}
              style={{ opacity: 0.6 + Math.random() * 0.4 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Valentine's Week Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium text-chocolate-dark">
              💝 Valentine's Week
            </span>
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-semibold">
              Chocolate Day - Feb 9
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-chocolate-white text-shadow-chocolate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Life Is Sweeter
            <br />
            <span className="text-gradient">With You</span>{' '}
            <span className="inline-block animate-bounce">🍫</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-xl md:text-2xl text-chocolate-white/80 mb-8 font-light max-w-2xl mx-auto typewriter mx-auto inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            This Chocolate Day, I have something sweet for you
          </motion.p>

          <CountdownTimer />

          <div className="h-8"></div> {/* Spacer */}

          {/* CTA Button */}
          <motion.button
            onClick={onUnwrap}
            className="interactive chocolate-button chocolate-shine group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Unwrap the Chocolate
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                💝
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Decorative Chocolates */}
        <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-8 opacity-80">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-8 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #6D4C41 0%, #4E342E 100%)',
                boxShadow: '0 4px 15px rgba(78, 52, 46, 0.4)',
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-chocolate-white/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-chocolate-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
