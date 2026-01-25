import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Check } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';

interface AgeScreenProps {
  onContinue: (age: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  initialAge?: string;
}

const ageRanges = [
  {
    value: '18-29',
    label: '18-29 years',
    emoji: '👧',
    supportText: 'Age significantly affects how your body processes glucose. Younger adults often have faster metabolism and different hormonal patterns that influence blood sugar stability.',
  },
  {
    value: '30-39',
    label: '30-39 years',
    emoji: '👱‍♀️',
    supportText: 'Metabolic changes in your 30s can affect glucose response. Understanding your age-specific patterns helps us provide more accurate insights and recommendations.',
  },
  {
    value: '40-49',
    label: '40-49 years',
    emoji: '👩',
    supportText: 'Hormonal shifts and metabolic changes become more pronounced in your 40s. Age-specific guidance is essential for maintaining stable blood sugar levels.',
  },
  {
    value: '50-59',
    label: '50-59 years',
    emoji: '👩‍🏫',
    supportText: 'Significant hormonal transitions in your 50s directly impact glucose regulation. Personalized age-based strategies are crucial for optimal metabolic health.',
  },
  {
    value: '60-80',
    label: '60-80 years',
    emoji: '👵🏻',
    supportText: 'Age-related metabolic changes require specialized attention. Understanding how your body processes glucose at this stage is key to maintaining energy and health.',
  },
];

export function AgeScreen({ onContinue, onBack, currentStep, totalSteps, initialAge }: AgeScreenProps) {
  const [selectedAge, setSelectedAge] = useState<string | null>(initialAge || null);

  const handleContinue = () => {
    if (selectedAge) {
      onContinue(selectedAge);
    }
  };

  const selectedRange = ageRanges.find((range) => range.value === selectedAge);

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
        <div className="mb-6 mt-3">
          <h1 className="text-[24px] font-semibold leading-[120%] tracking-[0.4px] text-black">
            How old are you?
          </h1>
        </div>

        {/* Age Options */}
        <div className="space-y-2 mb-24">
          {ageRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedAge(range.value)}
              className={`w-full transition-all rounded-[24px] pl-2 pr-4 border ${
                selectedAge === range.value
                  ? 'bg-[#E8F3FF] border-[#0a84ff]'
                  : 'bg-white border-transparent'
              }`}
            >
              <div className="py-3">
                <div className="flex items-center gap-1">
                  {/* Avatar Image */}
                  <div className="flex items-center justify-center w-11 h-11 shrink-0">
                    <div className="w-11 h-11 overflow-hidden flex items-center justify-center">
                      <p className="text-3xl">{range.emoji}</p>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="flex-1 text-left">
                    <p
                      className={`text-[16px] font-normal leading-[22px] tracking-[-0.2px] ${
                        selectedAge === range.value ? 'text-[#0a84ff]' : 'text-black'
                      }`}
                    >
                      {range.label}
                    </p>
                  </div>

                  {/* Checkmark */}
                  <div className="flex items-center justify-center w-6 h-6 shrink-0">
                    {selectedAge === range.value ? (
                      <div className="w-[22px] h-[22px] rounded-full bg-[#0a84ff] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-300 bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#f2f2f7] pb-3 pt-4 px-6">
        {/* Support Text Card */}
        {selectedRange && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-3 bg-white rounded-2xl p-4"
          >
            <h3 className="text-[15px] font-semibold leading-[20px] tracking-[-0.2px] text-[#34C759] mb-2">
              ✓ Age matters for accuracy
            </h3>
            <p className="text-[15px] font-normal leading-[20px] tracking-[-0.2px] text-black">
              {selectedRange.supportText}
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={handleContinue}
          disabled={!selectedAge}
          className={`w-full py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px] transition-colors ${
            selectedAge
              ? 'bg-[#f14e58] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileTap={selectedAge ? { scale: 0.98 } : {}}
        >
          Next
        </motion.button>
      </div>
    </>
  );
}