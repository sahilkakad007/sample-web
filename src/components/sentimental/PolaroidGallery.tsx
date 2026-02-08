
import { useState } from 'react';
import { motion } from 'framer-motion';

const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop', caption: 'Sweet Beginnings' },
    { id: 2, url: 'https://images.unsplash.com/photo-1549488344-c7052fb51661?w=400&h=400&fit=crop', caption: 'Our First Coffee' },
    { id: 3, url: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400&h=400&fit=crop', caption: 'Choco Date' },
    { id: 4, url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop', caption: 'Adventures' },
];

const PolaroidGallery = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div className="py-16 overflow-hidden">
            <h3 className="text-3xl font-display font-bold text-center text-chocolate-white mb-12">
                Our Sweetest Memories 📸
            </h3>

            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto px-4 perspective-1000">
                {photos.map((photo, index) => {
                    const rotation = index % 2 === 0 ? -3 : 3;
                    const isHovered = hoveredId === photo.id;

                    return (
                        <motion.div
                            key={photo.id}
                            className="relative bg-white p-4 pb-12 shadow-xl shrink-0 w-64 md:w-72 transform cursor-pointer"
                            initial={{ rotate: rotation * 2, opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            animate={{
                                rotate: isHovered ? 0 : rotation * 2,
                                scale: isHovered ? 1.1 : 1,
                                zIndex: isHovered ? 50 : 1
                            }}
                            onHoverStart={() => setHoveredId(photo.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            style={{
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                                <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <p className="font-handwriting text-2xl text-center text-gray-800 rotate-1">
                                {photo.caption}
                            </p>

                            {/* Tape Effect */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm" />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default PolaroidGallery;
