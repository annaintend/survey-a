import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface QuizQuestionProps {
  question: string;
  options: Array<{
    text: string;
    supportText: string;
  }>;
  selectedOption: string[] | string | null;
  onSelectOption: (option: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  onSelectOption,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  const [revealedSupport, setRevealedSupport] = useState<Set<string>>(new Set());

  // Reset revealed support when question changes
  useEffect(() => {
    setRevealedSupport(new Set());
  }, [questionNumber]);

  const handleOptionClick = (optionText: string) => {
    onSelectOption(optionText);
    // Reveal support text for this option
    setRevealedSupport((prev) => new Set([...prev, optionText]));
  };

  const isSelected = (optionText: string) => {
    if (Array.isArray(selectedOption)) {
      return selectedOption.includes(optionText);
    }
    return selectedOption === optionText;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-xl mb-6">{question}</h2>
      </div>

      <div className="space-y-4">
        {options.map((option, index) => (
          <div key={index}>
            <button
              onClick={() => handleOptionClick(option.text)}
              className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${
                isSelected(option.text)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {option.text}
            </button>
            
            <AnimatePresence>
              {revealedSupport.has(option.text) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 ml-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                    <p className="text-sm text-gray-700 italic">{option.supportText}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}