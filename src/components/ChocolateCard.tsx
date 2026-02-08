import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface ChocolateCardProps {
  type: 'dark' | 'milk' | 'white';
  title: string;
  message: string;
  emoji: string;
  delay?: number;
}

const chocolateStyles = {
  dark: {
    background: 'linear-gradient(145deg, #3E2723 0%, #4E342E 50%, #5D4037 100%)',
    accent: '#8D6E63',
    text: '#EFEBE9',
  },
  milk: {
    background: 'linear-gradient(145deg, #5D4037 0%, #6D4C41 50%, #795548 100%)',
    accent: '#A1887F',
    text: '#EFEBE9',
  },
  white: {
    background: 'linear-gradient(145deg, #F5F5DC 0%, #FFF8E1 50%, #FFFDE7 100%)',
    accent: '#D7A86E',
    text: '#4E342E',
  },
};

const ChocolateCard = ({ type, title, message, emoji, delay = 0 }: ChocolateCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const style = chocolateStyles[type];

  return (
    <motion.div
      className="relative w-full aspect-[4/5] perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="interactive relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: style.background,
            backfaceVisibility: 'hidden',
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(78, 52, 46, 0.5)'
              : '0 10px 30px -10px rgba(78, 52, 46, 0.3)',
          }}
          animate={{
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Chocolate Pattern */}
          <div className="absolute inset-4 grid grid-cols-3 gap-2 opacity-30">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            }}
            animate={{
              x: isHovered ? ['0%', '100%'] : '0%',
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.span
              className="text-6xl mb-4"
              animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.3 }}
            >
              {emoji}
            </motion.span>
            <h3
              className="text-2xl font-display font-bold mb-2"
              style={{ color: style.text }}
            >
              {title}
            </h3>
            <p
              className="text-sm opacity-80"
              style={{ color: style.text }}
            >
              Click to reveal message
            </p>
          </div>

          {/* Decorative Hearts */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -20, 0],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      y: { duration: 1.5, repeat: Infinity },
                    }}
                    style={{
                      top: `${20 + i * 25}%`,
                      right: '10%',
                    }}
                  >
                    <Heart
                      size={16}
                      fill={style.accent}
                      color={style.accent}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Back Face (Message) */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center p-8"
          style={{
            background: style.background,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '0 25px 50px -12px rgba(78, 52, 46, 0.5)',
          }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full transition-colors"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: style.text,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <Heart
              className="mx-auto mb-4 animate-heartbeat"
              size={40}
              fill={style.accent}
              color={style.accent}
            />
            <p
              className="text-lg font-medium leading-relaxed"
              style={{ color: style.text }}
            >
              {message}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChocolateCard;
