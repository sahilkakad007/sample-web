
import { motion } from 'framer-motion';

const events = [
    { year: 'Day 1', title: 'We Met', description: 'Like finding the perfect truffle.' },
    { year: 'Month 1', title: 'First Date', description: 'Sweet as milk chocolate.' },
    { year: 'Now', title: 'Together', description: 'Better than the finest dark chocolate.' },
];

const PhotoTimeline = () => {
    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="relative border-l-4 border-chocolate-400/30 ml-4 md:ml-1/2 space-y-12">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        className="relative pl-8 md:pl-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        {/* Dot */}
                        <div className="absolute -left-[10px] top-0 w-6 h-6 rounded-full bg-chocolate-600 border-4 border-chocolate-900"
                            style={{ boxShadow: '0 0 10px var(--chocolate-600)' }} />

                        <div className="md:flex md:justify-between items-center w-full group">
                            <div className="mb-2 md:mb-0 md:w-[45%] md:text-right md:pr-8">
                                <span className="text-gold-500 font-bold font-mono">{event.year}</span>
                            </div>

                            {/* Content - shifts to right on desktop for visual balance? 
                     Actually simpler: Keep content on right for mobile, alternate for desktop.
                     Let's keep it simple: content always right of line.
                  */}
                            <div className="glass-card p-4 md:w-[full] hover:translate-x-2 transition-transform">
                                <h4 className="text-xl font-display font-bold text-chocolate-white">{event.title}</h4>
                                <p className="text-chocolate-white/70">{event.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhotoTimeline;
