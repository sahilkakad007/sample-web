import { useState, useEffect } from 'react';
import ChocolateCursor from '@/components/ChocolateCursor';
import FloatingElements from '@/components/FloatingElements';
import HeroSection from '@/components/HeroSection';
import ChocolateSection from '@/components/ChocolateSection';
import SweetMessageSection from '@/components/SweetMessageSection';
import GamesSection from '@/components/GamesSection';
import SentimentalSection from '@/components/SentimentalSection';
import GiftBoxSection from '@/components/GiftBoxSection';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnwrapped, setHasUnwrapped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUnwrap = () => {
    setHasUnwrapped(true);
    // Smooth scroll to chocolate section
    document.getElementById('chocolates')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Custom Cursor */}
      <ChocolateCursor />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-7xl inline-block"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🍫
              </motion.span>
              <motion.p
                className="text-chocolate-white text-xl mt-4 font-display"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Preparing something sweet...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onUnwrap={handleUnwrap} />

        {/* Chocolate Cards Section */}
        <section id="chocolates">
          <ChocolateSection />
        </section>

        {/* Sweet Message Section */}
        <SweetMessageSection />

        {/* Games Section */}
        <GamesSection />

        {/* Sentimental Section */}
        <SentimentalSection />

        {/* GiftBox Section */}
        <GiftBoxSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Index;
