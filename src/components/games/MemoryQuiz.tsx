
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // index
}

const questions: Question[] = [
    {
        id: 1,
        text: "What is the sweetest chocolate?",
        options: ["Dark", "Milk", "White", "You!"],
        correctAnswer: 3,
    },
    {
        id: 2,
        text: "How many chocolates equal my love?",
        options: ["10", "100", "Infinite", "Zero"],
        correctAnswer: 2,
    },
    {
        id: 3,
        text: "What day is today?",
        options: ["Just Sunday", "Chocolate Day", "Work Day", "Nap Day"],
        correctAnswer: 1,
    },
];

const MemoryQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
        // Auto-advance after small delay
        setTimeout(() => {
            if (index === questions[currentQuestion].correctAnswer) {
                setScore(score + 1);
            }

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    return (
        <div className="p-8 glass-card max-w-lg mx-auto my-12 text-center min-h-[400px] flex flex-col justify-center">
            <h3 className="text-2xl font-display font-bold text-chocolate-dark mb-6">
                Sweet Memory Quiz 🧠🍫
            </h3>

            <AnimatePresence mode="wait">
                {!showResult ? (
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-lg text-chocolate-600 mb-6 font-medium">
                            {questions[currentQuestion].text}
                        </p>
                        <div className="grid gap-3">
                            {questions[currentQuestion].options.map((option, index) => {
                                const isSelected = selectedOption === index;
                                const isCorrect = index === questions[currentQuestion].correctAnswer;
                                // Show color immediately on selection
                                let btnClass = "bg-white/50 text-chocolate-800 hover:bg-white/80";
                                if (selectedOption !== null && isSelected) {
                                    btnClass = isCorrect ? "bg-green-500 text-white" : "bg-red-400 text-white";
                                }

                                return (
                                    <Button
                                        key={index}
                                        onClick={() => selectedOption === null && handleOptionClick(index)}
                                        className={`w-full py-6 text-lg justify-start px-6 ${btnClass}`}
                                        disabled={selectedOption !== null}
                                    >
                                        <span className="mr-auto">{option}</span>
                                        {selectedOption !== null && isSelected && (
                                            isCorrect ? <Check size={20} /> : <X size={20} />
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                        <div className="mt-6 text-sm text-chocolate-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-6xl mb-4">🏆</div>
                        <h4 className="text-xl font-bold text-chocolate-dark mb-2">Quiz Complete!</h4>
                        <p className="text-chocolate-600 mb-6">
                            You scored {score} out of {questions.length}!
                            {score === questions.length ? " Perfect! You know me so well! 🥰" : " Good try! Have a chocolate anyway! 🍫"}
                        </p>
                        <Button onClick={resetQuiz} className="bg-chocolate-600 text-cream-100">
                            Play Again
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemoryQuiz;
