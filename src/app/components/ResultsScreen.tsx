import { motion } from 'motion/react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function ResultsScreen({ totalQuestions, onRestart }: ResultsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto px-4 text-center"
    >
      <div className="mb-8">
        <h1 className="text-3xl mb-4">Thank You!</h1>
        <p className="text-gray-600">You've completed all {totalQuestions} questions</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="mb-6">
          <div className="text-6xl mb-2">✓</div>
          <p className="text-gray-600">Your responses have been recorded</p>
        </div>

        <div className="py-6 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            Understanding your relationship with blood sugar is the first step toward balance and confidence with food.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 text-white py-4 rounded-full hover:bg-blue-600 transition-colors"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  );
}
