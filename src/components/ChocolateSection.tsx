import { motion } from 'framer-motion';
import ChocolateCard from './ChocolateCard';

const chocolates = [
  {
    type: 'dark' as const,
    title: 'Dark Chocolate',
    emoji: '🍫',
    message: 'Like dark chocolate, my love for you is intense, deep, and unforgettable. You make my heart melt every single day.',
  },
  {
    type: 'milk' as const,
    title: 'Milk Chocolate',
    emoji: '🤎',
    message: 'Smooth and sweet like milk chocolate, being with you feels like coming home to warmth and comfort.',
  },
  {
    type: 'white' as const,
    title: 'White Chocolate',
    emoji: '🤍',
    message: 'Pure and gentle like white chocolate, your love brings light and sweetness into every corner of my life.',
  },
];

const ChocolateSection = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-warm overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-caramel blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blush blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Choose Your Flavor 🍫
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Every Chocolate Has a Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on each chocolate to discover a sweet message made just for you
          </p>
        </motion.div>

        {/* Chocolate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {chocolates.map((chocolate, index) => (
            <ChocolateCard
              key={chocolate.type}
              {...chocolate}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChocolateSection;
