import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md mx-auto px-4 text-center"
    >
      <div className="mb-8">
        <h1 className="text-3xl mb-4">Blood Sugar Awareness Quiz</h1>
        <p className="text-gray-600">
          A science-forward exploration of your relationship with blood sugar and food.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-sm">
              8
            </div>
            <div>
              <p className="text-sm text-gray-600">Questions to understand your patterns</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-sm">
              ✓
            </div>
            <div>
              <p className="text-sm text-gray-600">Select one or more options per question</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-sm">
              ℹ
            </div>
            <div>
              <p className="text-sm text-gray-600">Insights appear as you select answers</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-blue-500 text-white py-4 rounded-full hover:bg-blue-600 transition-colors"
      >
        Begin Quiz
      </button>
    </motion.div>
  );
}
