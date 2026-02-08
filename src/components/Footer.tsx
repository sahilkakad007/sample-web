import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 bg-primary overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-caramel via-blush to-caramel" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Valentine's Week Timeline */}
          <div className="mb-12">
            <h3 className="text-xl font-display text-chocolate-white mb-6 opacity-80">
              Valentine's Week 2026
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { day: 'Rose Day', date: 'Feb 7', emoji: '🌹' },
                { day: 'Propose Day', date: 'Feb 8', emoji: '💍' },
                { day: 'Chocolate Day', date: 'Feb 9', emoji: '🍫', active: true },
                { day: 'Teddy Day', date: 'Feb 10', emoji: '🧸' },
                { day: 'Promise Day', date: 'Feb 11', emoji: '🤙' },
                { day: 'Hug Day', date: 'Feb 12', emoji: '🤗' },
                { day: 'Kiss Day', date: 'Feb 13', emoji: '💋' },
                { day: "Valentine's", date: 'Feb 14', emoji: '❤️' },
              ].map((item, index) => (
                <motion.div
                  key={item.day}
                  className={`px-3 py-2 rounded-full text-sm ${item.active
                    ? 'bg-caramel text-primary font-semibold'
                    : 'bg-primary-foreground/10 text-chocolate-white/70'
                    }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="mr-1">{item.emoji}</span>
                  <span className="hidden sm:inline">{item.day}</span>
                  <span className="sm:hidden">{item.date}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Message */}
          <div className="flex items-center justify-center gap-2 text-chocolate-white">
            <span className="opacity-80">Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={20} fill="#FFB6C1" color="#FFB6C1" />
            </motion.div>
            <span className="opacity-80">and lots of</span>
            <span className="text-xl">🍫</span>
          </div>

          <p className="text-chocolate-white/60 text-sm mt-4">
            Happy Chocolate Day! May your day be as sweet as you are.
          </p>
          <p className="text-chocolate-white/60 text-sm mt-4">
            Vaishu's_Sahil
          </p>
        </motion.div>
      </div>

      {/* Floating Chocolates */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-8 h-5 rounded bg-chocolate-milk"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
