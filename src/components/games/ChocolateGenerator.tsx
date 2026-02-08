
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const chocolateTypes = [
    { name: "Dark Chocolate with Sea Salt", desc: "Sophisticated, deep, and slightly salty." },
    { name: "Milk Chocolate Hazelnut", desc: "Sweet, nutty, and everyone's favorite." },
    { name: "White Chocolate Raspberry", desc: "Unique, fruity, and delightfully sweet." },
    { name: "Spicy Chili Chocolate", desc: "Exciting, bold, and full of surprises." },
    { name: "Caramel Filled Truffle", desc: "Soft on the inside, sweet all over." },
    { name: "Mint Dark Chocolate", desc: "Cool, refreshing, and intense." },
];

const ChocolateGenerator = () => {
    const [name, setName] = useState('');
    const [result, setResult] = useState<{ name: string, desc: string } | null>(null);

    const generate = () => {
        if (!name.trim()) return;
        // Simple deterministic hash
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % chocolateTypes.length;
        setResult(chocolateTypes[index]);
    };

    return (
        <div className="p-8 glass-card max-w-md mx-auto my-12 text-center">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-4">
                What Chocolate Are You? 🍫
            </h3>

            <div className="flex gap-2 mb-6">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="bg-white/50 border-chocolate-200 text-chocolate-900"
                />
                <Button onClick={generate} className="bg-chocolate-600 hover:bg-chocolate-800 text-cream-100">
                    Find Out
                </Button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/40 p-6 rounded-xl border border-gold-500/30"
                >
                    <p className="text-sm text-chocolate-600 mb-2">{name} is a...</p>
                    <h4 className="text-xl font-bold text-chocolate-800 mb-2">{result.name}</h4>
                    <p className="text-chocolate-700 italic">"{result.desc}"</p>
                </motion.div>
            )}
        </div>
    );
};

export default ChocolateGenerator;
