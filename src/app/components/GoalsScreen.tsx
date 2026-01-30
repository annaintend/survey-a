import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface GoalsScreenProps {
  onContinue: (goals: string[]) => void;
  onBack: () => void;
  initialGoals?: string[];
}

const goalOptions = [
  {
    id: 'steady-energy',
    emoji: '⚡',
    title: 'Steady daily energy',
    description: 'No more sharp crashes or afternoon slumps',
  },
  {
    id: 'clear-focus',
    emoji: '🧠',
    title: 'Clear focus and mental clarity',
    description: 'Stay sharp without relying on caffeine or snacks',
  },
  {
    id: 'weight-regulation',
    emoji: '⚖️',
    title: 'Easier weight regulation',
    description: 'Support fat balance by reducing glucose and insulin spikes',
  },
  {
    id: 'calm-eating',
    emoji: '🍽️',
    title: 'Calm, guilt-free eating',
    description: 'Eat without fear, overthinking, or restriction',
  },
  {
    id: 'mood-stability',
    emoji: '😊',
    title: 'Improved mood stability',
    description: 'Fewer mood swings driven by blood sugar drops',
  },
  {
    id: 'appetite-control',
    emoji: '🎯',
    title: 'Better appetite control',
    description: 'Reduce impulsive snacking and reactive eating',
  },
];

export function GoalsScreen({ onContinue, onBack, initialGoals = [] }: GoalsScreenProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialGoals);

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      onContinue(selectedGoals);
      window.amplitude?.track?.("goal_selected", {
        goal_type: selectedGoals.join(', ')
      })
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE] flex items-center justify-center">
      {/* Content Wrapper - Centered with max-width */}
      <div className="w-full max-w-[430px] h-full flex flex-col relative">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-4 pt-[0px] pr-[16px] pb-[0px] pl-[4px]">
          <div className="h-[44px] relative flex items-center justify-center">
            <button
              onClick={onBack}
              className="absolute left-4 bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-2 pb-6"
          >
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4 text-center">
              Choose your{' '}
              <span className="text-[#0a84ff]">goals</span>
            </h1>
            <p className="text-[16px] font-normal leading-[22px] tracking-[-0.43px] text-[rgba(60,60,67,0.6)] text-center">
              Select all the outcomes you want to achieve by improving blood sugar stability
            </p>
          </motion.div>

          {/* Goal Cards */}
          <div className="space-y-3">
            {goalOptions.map((goal, index) => {
              const isSelected = selectedGoals.includes(goal.id);
              
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full p-5 rounded-[32px] text-left transition-all border-2 ${
                    isSelected
                      ? 'bg-[#E8F3FF] border-[#0a84ff]'
                      : 'bg-white border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Emoji */}
                    <div className="text-[32px] flex-shrink-0">
                      {goal.emoji}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`text-[17px] font-semibold leading-[22px] tracking-[-0.43px] mb-1 ${
                        isSelected ? 'text-[#0a84ff]' : 'text-black'
                      }`}>
                        {goal.title}
                      </h3>
                      <p className={`text-[15px] font-normal leading-[20px] tracking-[-0.24px] ${
                        isSelected ? 'text-[#0a84ff]' : 'text-[rgba(60,60,67,0.6)]'
                      }`}>
                        {goal.description}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#0a84ff] border-2 border-[#0a84ff]'
                        : 'bg-transparent border-2 border-[rgba(60,60,67,0.3)]'
                    }`}>
                      {isSelected && (
                        <svg
                          width="14"
                          height="11"
                          viewBox="0 0 14 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 5.5L5 9.5L13 1.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#90C7FE] pb-6 pt-4 px-6">
          <button
            onClick={handleContinue}
            disabled={selectedGoals.length === 0}
            className={`w-full py-4 rounded-[20px] transition-all text-[17px] font-medium leading-[22px] tracking-[-0.43px] active:scale-[0.98] ${
              selectedGoals.length > 0
                ? 'bg-[#f14e58] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add to my plan
          </button>
        </div>
      </div>
    </div>
  );
}