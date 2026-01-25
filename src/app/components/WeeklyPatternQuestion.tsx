import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';

interface WeeklyPatternQuestionProps {
  onContinue: () => void;
  onBack: () => void;
  onAnswer: (answers: { frequency: string; portion: string }) => void;
  currentStep: number;
  totalSteps: number;
}

export function WeeklyPatternQuestion({ onContinue, onBack, onAnswer, currentStep, totalSteps }: WeeklyPatternQuestionProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null);
  const [showHelperModal, setShowHelperModal] = useState(false);

  const frequencyOptions = [
    { value: 'daily', label: 'Daily', emoji: '📅' },
    { value: 'few-days', label: 'Every few days', emoji: '🗓️' },
    { value: 'weekly', label: 'About once a week', emoji: '📆' },
  ];

  const portionOptions = [
    {
      value: 'small',
      label: 'Small',
      emoji: '🥗',
      calories: '150 cal',
      description: 'Light portion, usually combined with protein or fat',
    },
    {
      value: 'medium',
      label: 'Medium',
      emoji: '🍽️',
      calories: '250 cal',
      description: 'Standard meal or snack portion',
    },
    {
      value: 'large',
      label: 'Large',
      emoji: '🍱',
      calories: '425 cal',
      description: 'High-carb dominant meal or multiple servings',
    },
  ];

  const handleNext = () => {
    if (selectedFrequency && selectedPortion) {
      onAnswer({ frequency: selectedFrequency, portion: selectedPortion });
      onContinue();
    }
  };

  const hasValidSelection = selectedFrequency !== null && selectedPortion !== null;

  return (
    <>
      {/* Header */}
      <div className="bg-[#f2f2f7] sticky top-0 z-10">
        {/* Progress Bar Section */}
        <div className="h-[44px] relative flex items-center justify-center px-4">
          <button
            onClick={onBack}
            className="absolute left-4 bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center">
            <ProgressBar current={currentStep} total={totalSteps} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="mb-8 mt-3">
          <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black text-center">
            Let's find out<br /><span className="text-[#0a84ff]">your pattern</span>
          </h1>
        </div>

        {/* Question 1: Frequency */}
        <div className="mb-8">
          <h2 className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black mb-4">
            How often do you eat high-carb foods?
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {frequencyOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setSelectedFrequency(option.value)}
                className={`flex flex-col items-center justify-center p-4 rounded-[24px] transition-all min-h-[120px] border ${
                  selectedFrequency === option.value
                    ? 'bg-[#E8F3FF] border-[#0a84ff]'
                    : 'bg-white border-transparent'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-5xl mb-2">{option.emoji}</div>
                <div className={`text-[15px] font-semibold leading-[20px] tracking-[-0.43px] text-center ${
                  selectedFrequency === option.value ? 'text-[#0a84ff]' : 'text-black'
                }`}>
                  {option.label}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Question 2: Portion Size */}
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold leading-[22px] tracking-[-0.43px] text-black mb-4">
            Average portion size
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {portionOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => setSelectedPortion(option.value)}
                className={`flex flex-col items-center justify-center p-4 rounded-[24px] transition-all border ${
                  selectedPortion === option.value
                    ? 'bg-[#E8F3FF] border-[#0a84ff]'
                    : 'bg-white border-transparent'
                }`}
                whileTap={{ scale: 0.95 }}
                style={{
                  aspectRatio: '1',
                }}
              >
                <div className="text-5xl mb-2">{option.emoji}</div>
                <div className={`text-[17px] font-semibold leading-[22px] tracking-[-0.43px] mb-1 ${
                  selectedPortion === option.value ? 'text-[#0a84ff]' : 'text-black'
                }`}>
                  {option.label}
                </div>
                <div className={`text-[15px] font-medium leading-[20px] tracking-[-0.43px] ${
                  selectedPortion === option.value
                    ? 'text-[#0a84ff]/60'
                    : 'text-[rgba(60,60,67,0.6)]'
                }`}>
                  {option.calories}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Helper Link */}
        <div className="text-center mb-24">
          <button
            onClick={() => setShowHelperModal(true)}
            className="text-[#0a84ff] text-[17px] font-semibold leading-[22px] tracking-[-0.43px]"
          >
            Why do we ask?
          </button>
        </div>
      </div>

      {/* Bottom Button Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#f2f2f7] pb-3 pt-4 px-6">
        <motion.button
          onClick={handleNext}
          disabled={!hasValidSelection}
          className={`w-full py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px] transition-all ${
            hasValidSelection
              ? 'bg-[#f14e58] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileTap={hasValidSelection ? { scale: 0.98 } : {}}
        >
          Next
        </motion.button>
      </div>

      {/* Helper Modal */}
      <AnimatePresence>
        {showHelperModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowHelperModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-48px)] max-w-[400px] bg-white rounded-[24px] p-6 z-50"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[20px] font-semibold leading-[24px] tracking-[0.38px] text-black">
                  Why do we ask?
                </h3>
                <button
                  onClick={() => setShowHelperModal(false)}
                  className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#f2f2f7]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[17px] font-medium leading-[22px] tracking-[-0.43px] text-[rgba(60,60,67,0.8)]">
                Portion size and frequency strongly influence blood sugar response and energy stability — often more than the food itself.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}