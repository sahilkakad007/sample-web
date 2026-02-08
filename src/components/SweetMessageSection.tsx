import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

const messages = [
  "You make my life sweeter than any chocolate 🍫❤️",
  "Every moment with you is like a box of happiness",
  "You're the sweetest thing that ever happened to me",
  "My love for you melts like chocolate in summer ☀️",
];

const SweetMessageSection = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const message = messages[currentMessage];
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Wait and move to next message
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentMessage, isInView]);

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(16 24% 34%) 0%, hsl(16 25% 24%) 100%)',
      }}
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart
              size={12 + Math.random() * 16}
              fill="#FFB6C1"
              color="#FFB6C1"
              className="opacity-40"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Pulsing Heart */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="relative">
              <Heart
                size={60}
                fill="#FFB6C1"
                color="#FFB6C1"
                className="drop-shadow-lg"
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={60} fill="transparent" color="#FFB6C1" />
              </motion.div>
            </div>
          </motion.div>

          {/* Typewriter Text */}
          <div className="min-h-[120px] flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-chocolate-white leading-relaxed">
              {displayedText}
              <motion.span
                className="inline-block w-1 h-8 md:h-12 ml-1 bg-blush"
                animate={{ opacity: isTyping ? [1, 0] : 0 }}
                transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
              />
            </h2>
          </div>

          {/* Message Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {messages.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{
                  background: index === currentMessage ? '#FFB6C1' : 'rgba(255,182,193,0.3)',
                }}
                animate={{
                  scale: index === currentMessage ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto fill-background">
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,60 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default SweetMessageSection;
