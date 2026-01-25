import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface PotentialBalanceScreenProps {
  onContinue: () => void;
  onBack: () => void;
  answers: Record<number, string[] | string>;
}

export function PotentialBalanceScreen({ onContinue, onBack, answers }: PotentialBalanceScreenProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, []);

  // Calculate current scores (same logic as CurrentBalanceScreen)
  const calculateCurrentScores = () => {
    let energyStability = 50;
    let appetiteControl = 50;
    let motivation = 50;
    let mentalClarity = 50;
    let consistency = 50;

    // Question 1: How do you see yourself
    const q1 = answers[1];
    if (q1 === 'learning-improving') {
      motivation += 10;
      consistency += 8;
    } else if (q1 === 'need-tools') {
      motivation += 5;
    } else if (q1 === 'trying-better') {
      motivation += 3;
    } else if (q1 === 'out-of-control') {
      motivation -= 15;
      consistency -= 10;
    }

    // Question 2: What frustrates you (multi-select)
    const q2 = answers[2];
    if (Array.isArray(q2)) {
      if (q2.includes('inconsistent')) {
        energyStability -= 8;
        consistency -= 8;
      }
      if (q2.includes('eat-normally')) {
        energyStability -= 5;
      }
      if (q2.length >= 3) {
        mentalClarity -= 5;
      }
    }

    // Question 3: Social situations
    const q3 = answers[3];
    if (q3 === 'adjust-portions') {
      appetiteControl += 12;
      consistency += 10;
    } else if (q3 === 'anxious-overthink') {
      mentalClarity -= 8;
      motivation -= 5;
    } else if (q3 === 'avoid-certain-foods') {
      appetiteControl -= 5;
    } else if (q3 === 'eat-without-knowing') {
      appetiteControl -= 10;
      consistency -= 8;
    }

    // Question 4: How you feel when others eat sugar
    const q4 = answers[4];
    if (q4 === 'confident-limits') {
      motivation += 10;
      mentalClarity += 8;
    } else if (q4 === 'frustrated-unpredictable') {
      energyStability -= 5;
    } else if (q4 === 'worried-crash') {
      energyStability -= 8;
      mentalClarity -= 5;
    } else if (q4 === 'confused-comparison') {
      motivation -= 8;
    }

    // Question 5: Area most affected (multi-select)
    const q5 = answers[5];
    if (Array.isArray(q5)) {
      if (q5.includes('energy-focus')) {
        energyStability -= 8;
        mentalClarity -= 6;
      }
      if (q5.includes('mood-stability')) {
        mentalClarity -= 5;
      }
      if (q5.includes('food-relationship')) {
        appetiteControl -= 6;
        motivation -= 4;
      }
    }

    // Question 6: When negative effects (multi-select)
    const q6 = answers[6];
    if (Array.isArray(q6)) {
      if (q6.includes('healthy-meals')) {
        consistency -= 8;
      }
      if (q6.includes('afternoon-evening')) {
        energyStability -= 6;
      }
      if (q6.includes('stress-overwhelm')) {
        mentalClarity -= 5;
      }
    }

    // Question 7: Symptoms (multi-select)
    const q7 = answers[7];
    if (Array.isArray(q7)) {
      if (q7.includes('energy-crashes')) {
        energyStability -= 8;
      }
      if (q7.includes('strong-cravings')) {
        appetiteControl -= 8;
      }
      if (q7.includes('mood-swings')) {
        mentalClarity -= 6;
      }
      if (q7.includes('planning-around-food')) {
        consistency -= 6;
      }
    }

    // Question 9: Predictability outcomes (multi-select)
    const q9 = answers[9];
    if (Array.isArray(q9)) {
      if (q9.includes('confident-choices')) {
        motivation += 5;
      }
      if (q9.includes('focused-clear')) {
        mentalClarity += 5;
      }
    }

    // Question 10: What balance means (multi-select)
    const q10 = answers[10];
    if (Array.isArray(q10)) {
      if (q10.includes('consistent-energy')) {
        energyStability += 5;
      }
      if (q10.includes('eat-without-fear')) {
        appetiteControl += 5;
      }
    }

    // Ensure all scores are between 0-100
    energyStability = Math.max(0, Math.min(100, energyStability));
    appetiteControl = Math.max(0, Math.min(100, appetiteControl));
    motivation = Math.max(0, Math.min(100, motivation));
    mentalClarity = Math.max(0, Math.min(100, mentalClarity));
    consistency = Math.max(0, Math.min(100, consistency));

    const overall = Math.round(
      (energyStability + appetiteControl + motivation + mentalClarity + consistency) / 5
    );

    return {
      overall,
      energyStability,
      appetiteControl,
      motivation,
      mentalClarity,
      consistency,
    };
  };

  // Calculate potential scores (target scores with improvement)
  const calculatePotentialScores = (currentScores: ReturnType<typeof calculateCurrentScores>) => {
    // Potential scores are calculated based on realistic improvement potential
    // Higher current scores have less room for improvement
    const calculatePotential = (current: number) => {
      const remainingRoom = 100 - current;
      // Most people can achieve 75-90% of the remaining room with proper tools
      const improvement = Math.round(remainingRoom * 0.85);
      return Math.min(100, current + improvement);
    };

    const potentialEnergy = calculatePotential(currentScores.energyStability);
    const potentialAppetite = calculatePotential(currentScores.appetiteControl);
    const potentialMotivation = calculatePotential(currentScores.motivation);
    const potentialClarity = calculatePotential(currentScores.mentalClarity);
    const potentialConsistency = calculatePotential(currentScores.consistency);

    const potentialOverall = Math.round(
      (potentialEnergy + potentialAppetite + potentialMotivation + potentialClarity + potentialConsistency) / 5
    );

    return {
      overall: potentialOverall,
      energyStability: potentialEnergy,
      appetiteControl: potentialAppetite,
      motivation: potentialMotivation,
      mentalClarity: potentialClarity,
      consistency: potentialConsistency,
    };
  };

  const currentScores = calculateCurrentScores();
  const potentialScores = calculatePotentialScores(currentScores);

  const scoreCards = [
    { 
      emoji: '⭐', 
      label: 'Overall metabolic health', 
      current: currentScores.overall,
      potential: potentialScores.overall,
      isMain: true 
    },
    { 
      emoji: '😊', 
      label: 'Mood', 
      current: currentScores.mentalClarity,
      potential: potentialScores.mentalClarity,
      isMain: false 
    },
    { 
      emoji: '🎯', 
      label: 'Appetite', 
      current: currentScores.appetiteControl,
      potential: potentialScores.appetiteControl,
      isMain: false 
    },
    { 
      emoji: '⚡', 
      label: 'Energy', 
      current: currentScores.energyStability,
      potential: potentialScores.energyStability,
      isMain: false 
    },
    { 
      emoji: '🧠', 
      label: 'Mental clarity', 
      current: currentScores.mentalClarity,
      potential: potentialScores.mentalClarity,
      isMain: false 
    },
    { 
      emoji: '💪', 
      label: 'Consistency', 
      current: currentScores.consistency,
      potential: potentialScores.consistency,
      isMain: false 
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#f2f2f7] flex items-center justify-center">
      <div className="w-full max-w-[430px] h-full bg-[#f2f2f7] flex flex-col relative">
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
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 pb-24">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-2 pb-6"
          >
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4 text-center">
              Your health profile{' '}
              <span className="text-[#34c759]">in 30 days</span>
            </h1>
            <p className="text-[16px] font-normal leading-[22px] tracking-[-0.43px] text-[rgba(60,60,67,0.6)] text-center">
              New year, new you! Let's make that glow up!
            </p>
          </motion.div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-3">
            {scoreCards.map((card, index) => {
              const improvement = card.potential - card.current;
              
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className={`rounded-[32px] p-5 ${
                    card.isMain
                      ? 'col-span-2 bg-gradient-to-br from-[#34c759] to-[#30d158]'
                      : 'bg-white'
                  }`}
                >
                  <div className="text-center">
                    {/* Label with emoji */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-[20px]">{card.emoji}</span>
                      <p
                        className={`text-[13px] font-medium leading-[18px] tracking-[-0.08px] ${
                          card.isMain ? 'text-white/90' : 'text-[rgba(60,60,67,0.6)]'
                        }`}
                      >
                        {card.label}
                      </p>
                    </div>

                    {/* Score and improvement */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className={`text-[40px] font-semibold leading-[120%] tracking-[0.4px] ${
                        card.isMain ? 'text-white' : 'text-black'
                      }`}>
                        {card.potential}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-[13px] font-semibold ${
                        card.isMain 
                          ? 'bg-white/20 text-white' 
                          : 'bg-[#34c759]/10 text-[#34c759]'
                      }`}>
                        +{improvement}
                      </div>
                    </div>

                    <p
                      className={`text-[13px] font-medium leading-[18px] tracking-[-0.08px] mb-4 ${
                        card.isMain ? 'text-white/70' : 'text-[rgba(60,60,67,0.4)]'
                      }`}
                    >
                      out of 100
                    </p>

                    {/* Progress Bar */}
                    <div
                      className={`h-2 rounded-full overflow-hidden ${
                        card.isMain ? 'bg-white/20' : 'bg-[rgba(60,60,67,0.1)]'
                      }`}
                    >
                      <motion.div
                        initial={{ width: `${card.current}%` }}
                        animate={{ width: `${card.potential}%` }}
                        transition={{ delay: index * 0.08 + 0.5, duration: 1.2, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          card.isMain
                            ? 'bg-white'
                            : 'bg-gradient-to-r from-[#34c759] to-[#30d158]'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Encouragement Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 bg-white rounded-[20px] p-5"
          >
            <div className="flex items-start gap-3">
              <div className="text-[24px] flex-shrink-0">🎯</div>
              <div>
                <p className="text-[15px] leading-[22px] tracking-[-0.24px] text-[rgba(60,60,67,0.8)]">
                  These improvements are{' '}
                  <span className="font-semibold text-black">
                    realistic and achievable
                  </span>
                  {' '}with proper awareness and feedback. Most people see meaningful changes within the first 2-4 weeks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#f2f2f7] pb-6 pt-4 px-6">
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-[20px] bg-[#f14e58] text-white text-[17px] font-medium leading-[22px] tracking-[-0.43px] active:scale-[0.98] transition-transform"
          >
            Let's do this!
          </button>
        </div>
      </div>
    </div>
  );
}