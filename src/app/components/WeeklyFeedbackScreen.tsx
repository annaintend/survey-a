import { motion } from 'motion/react';
import { ChevronLeft, Check } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';
import imgDoughnut3D from "figma:asset/05b032611d53a344beb07d44c76066a4c74f4bf5.png";

interface WeeklyFeedbackScreenProps {
  onContinue: () => void;
  onBack: () => void;
  frequency: string;
  portionSize: string;
  currentStep: number;
  totalSteps: number;
}

export function WeeklyFeedbackScreen({ 
  onContinue, 
  onBack, 
  frequency, 
  portionSize,
  currentStep,
  totalSteps 
}: WeeklyFeedbackScreenProps) {
  // Calculate weekly treats count based on frequency
  const getWeeklyTreats = (freq: string): number => {
    console.log('Frequency received:', freq);
    switch (freq) {
      case 'daily': return 7;
      case 'few-days': return 3;
      case 'weekly': return 1;
      default: 
        console.warn('Unknown frequency:', freq);
        return 3;
    }
  };

  // Calculate calories per treat based on portion size
  const getCaloriesPerTreat = (portion: string): number => {
    console.log('Portion size received:', portion);
    switch (portion) {
      case 'small': return 150;
      case 'medium': return 250;
      case 'large': return 425;
      default: 
        console.warn('Unknown portion:', portion);
        return 250;
    }
  };

  // Calculate blood sugar impact score (1-10 scale)
  const getBloodSugarImpact = (freq: string, portion: string): number => {
    const frequencyMultiplier = freq === 'daily' ? 3 : freq === 'few-days' ? 2 : 1;
    const portionMultiplier = portion === 'large' ? 3 : portion === 'medium' ? 2 : 1;
    return frequencyMultiplier * portionMultiplier;
  };

  // Calculate realistic blood sugar spikes per week
  const getWeeklyBloodSugarSpikes = (freq: string, portion: string): number => {
    // Each treat causes multiple spikes depending on size
    const spikesPerTreat = portion === 'large' ? 6 : portion === 'medium' ? 4 : 2;
    
    // Baseline spikes from regular diet (assuming typical diet)
    const baselineSpikes = 12;
    
    // Calculate total treat-induced spikes
    const treatSpikes = weeklyTreats * spikesPerTreat;
    
    // Total weekly spikes
    return baselineSpikes + treatSpikes;
  };

  // Get blood sugar response level text
  const getBloodSugarResponse = (score: number): { level: string; color: string } => {
    if (score <= 2) return { level: 'Low', color: '#34c759' }; // Green
    if (score <= 4) return { level: 'Moderate', color: '#ff9500' }; // Orange
    if (score <= 6) return { level: 'High', color: '#ff6b4a' }; // Red-Orange
    return { level: 'Very High', color: '#e91e63' }; // Deep Red
  };

  const weeklyTreats = getWeeklyTreats(frequency);
  const caloriesPerTreat = getCaloriesPerTreat(portionSize);
  const totalWeeklyCalories = weeklyTreats * caloriesPerTreat;
  const bloodSugarImpactScore = getBloodSugarImpact(frequency, portionSize);
  const weeklyBloodSugarSpikes = getWeeklyBloodSugarSpikes(frequency, portionSize);
  const bloodSugarResponse = getBloodSugarResponse(bloodSugarImpactScore);

  console.log('WeeklyFeedbackScreen calculations:', { 
    frequency, 
    portionSize, 
    weeklyTreats, 
    caloriesPerTreat, 
    totalWeeklyCalories,
    bloodSugarImpactScore,
    weeklyBloodSugarSpikes,
    bloodSugarResponse
  });

  // Determine feedback based on strict combination rules (9 levels)
  const getFeedbackData = () => {
    // STRICT: Score 1 (Great) is now IMPOSSIBLE to achieve
    // Even weekly + small starts at score 2 (Good)
    if (bloodSugarImpactScore === 1) {
      // This case will never trigger with realistic inputs
      // Kept for legacy compatibility only
      return {
        icon: '✅',
        subtitle: "Your blood sugar management is outstanding",
        points: [
          { title: 'Insulin stays stable', description: 'Minimal carb load keeps insulin response stable', priority: 'Great' },
          { title: 'No glucose spikes', description: 'Low-frequency intake prevents glucose spikes', priority: 'Good' },
          { title: 'Consistent energy', description: 'Your body maintains consistent energy levels', priority: 'Monitor' },
          { title: 'Strong foundation', description: 'Excellent baseline for metabolic health', priority: 'Good' },
        ],
      };
    } else if (bloodSugarImpactScore === 2) {
      // weekly + medium OR few-days + small
      // This is now the BEST achievable result
      return {
        icon: '👍',
        subtitle: "You're doing well, but there's room for improvement",
        points: [
          { title: 'Glucose mostly controlled', description: 'Moderate carb intake allows some glucose control', priority: 'Good' },
          { title: 'Pancreas managing', description: 'Your pancreas handles current demands', priority: 'Monitor' },
          { title: 'Tweaks recommended', description: 'Adjustments could boost energy further', priority: 'Important' },
          { title: 'Could be more stable', description: 'Overall metabolic health could improve', priority: 'Monitor' },
        ],
      };
    } else if (bloodSugarImpactScore === 3) {
      // weekly + large
      return {
        icon: '⚠️',
        subtitle: "Your blood sugar needs attention",
        points: [
          { title: 'Weekly spikes occur', description: 'Weekly high-carb portions create glucose peaks', priority: 'Monitor' },
          { title: 'Recovery happening', description: 'Your body has time to reset between episodes', priority: 'Good' },
          { title: 'Reduce portions', description: 'Smaller portions would smooth energy levels', priority: 'Important' },
          { title: 'Pattern needs work', description: 'Current pattern could be optimized', priority: 'Monitor' },
        ],
      };
    } else if (bloodSugarImpactScore === 4) {
      // few-days + medium
      return {
        icon: '⚠️',
        subtitle: "Your blood sugar experiences regular fluctuations",
        points: [
          { title: 'Insulin under stress', description: 'Repeated carb loads strain insulin production', priority: 'Important' },
          { title: 'Multiple weekly spikes', description: 'Blood glucose rises and falls several times weekly', priority: 'Warning' },
          { title: 'Energy crashes likely', description: 'Post-meal spikes likely followed by drops', priority: 'Important' },
          { title: 'Reduce frequency', description: 'Reducing frequency would improve response', priority: 'Monitor' },
        ],
      };
    } else if (bloodSugarImpactScore === 6) {
      // few-days + large OR daily + medium
      return {
        icon: '⚠️',
        subtitle: "Frequent glucose spikes are impacting your metabolism",
        points: [
          { title: 'Pancreas overworking', description: 'Regular high-carb intake stresses your system', priority: 'Warning' },
          { title: 'Resistance risk rising', description: 'This pattern increases insulin resistance risk', priority: 'Urgent' },
          { title: 'Blood sugar swings', description: 'Blood sugar swings cause instability', priority: 'Warning' },
          { title: 'Act now', description: 'Immediate changes prevent metabolic damage', priority: 'Important' },
        ],
      };
    } else if (bloodSugarImpactScore === 7) {
      // daily + small
      return {
        icon: '🚨',
        subtitle: "Your blood sugar never gets a break",
        points: [
          { title: 'No recovery time', description: 'Daily carb intake prevents metabolic reset', priority: 'Urgent' },
          { title: 'Constant demand', description: 'Constant insulin demand strains pancreas', priority: 'Warning' },
          { title: 'Small portions add up', description: 'Even small portions add up over time', priority: 'Important' },
          { title: 'Stress accumulates', description: 'Stress accumulates despite portion control', priority: 'Warning' },
        ],
      };
    } else if (bloodSugarImpactScore === 8) {
      // daily + large (impossible in 3x3, but for completeness)
      return {
        icon: '🚨',
        subtitle: "Severe metabolic stress from carb overload",
        points: [
          { title: 'Daily spikes chaotic', description: 'Multiple daily spikes create disorder', priority: 'Critical' },
          { title: 'Regulation struggling', description: 'Your body cannot regulate blood sugar properly', priority: 'Urgent' },
          { title: 'High syndrome risk', description: 'High risk for metabolic syndrome', priority: 'Critical' },
          { title: 'Intervene immediately', description: 'Dietary intervention needed immediately', priority: 'Warning' },
        ],
      };
    } else {
      // bloodSugarImpactScore >= 9: daily + large
      return {
        icon: '🚨',
        subtitle: "Your metabolism is under severe strain",
        points: [
          { title: 'High-carb volatility', description: 'Daily high-carb loads cause glucose chaos', priority: 'Critical' },
          { title: 'Resistance present', description: 'Insulin resistance likely already present', priority: 'Critical' },
          { title: 'System damage', description: 'Chronic overwork damaging your system', priority: 'Urgent' },
          { title: 'Critical window', description: 'Immediate action prevents health damage', priority: 'Warning' },
        ],
      };
    }
  };

  // Get priority badge styling
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Great':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(44, 188, 80) 21.223%, rgb(85, 218, 118) 96.433%)',
          text: 'Great'
        };
      case 'Good':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(52, 199, 89) 21.223%, rgb(48, 209, 88) 96.433%)',
          text: 'Good'
        };
      case 'Monitor':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(10, 132, 255) 21.223%, rgb(70, 162, 255) 96.433%)',
          text: 'Monitor'
        };
      case 'Important':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(255, 149, 0) 21.223%, rgb(255, 179, 64) 96.433%)',
          text: 'Important'
        };
      case 'Warning':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(255, 107, 74) 21.223%, rgb(255, 59, 48) 96.433%)',
          text: 'Warning'
        };
      case 'Urgent':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(255, 59, 48) 21.223%, rgb(233, 30, 99) 96.433%)',
          text: 'Urgent'
        };
      case 'Critical':
        return { 
          background: 'linear-gradient(-54.281deg, rgb(233, 30, 99) 21.223%, rgb(175, 82, 222) 96.433%)',
          text: 'Critical'
        };
      default:
        return { 
          background: 'linear-gradient(-54.281deg, rgb(44, 188, 80) 21.223%, rgb(85, 218, 118) 96.433%)',
          text: 'Done'
        };
    }
  };

  const feedbackData = getFeedbackData();

  console.log('Final feedback data:', feedbackData);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE] flex items-center justify-center">
      {/* Content Wrapper - Centered with max-width */}
      <div className="w-full max-w-[430px] h-full flex flex-col relative">
        {/* Header */}
        <div className="bg-transparent sticky top-0 z-10">
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
        <div className="flex-1 overflow-y-auto px-6 pb-6 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE]">
          {/* Title (Static - Question Style) */}
          <div className="mb-8 mt-3 text-center">
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black">
              We're collecting <span className="text-[#0A84FF]">your first health signals</span>
            </h1>
          </div>

          {/* All Cards with Consistent Gap */}
          <div className="flex flex-col gap-[8px] mb-24">
            {/* Timeline Points List */}
            {feedbackData.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-[16px] items-stretch w-full"
              >
                {/* Left: Icon + Divider */}
                <div className="flex flex-col gap-[12px] items-center pt-[8px] shrink-0">
                  <div className="bg-white rounded-full size-[40px] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-[#0A84FF]" />
                  </div>
                  {/* Show divider for all items (including last one to connect to Weekly Impact card) */}
                  <div className="bg-[rgba(84,84,86,0.12)] rounded-full w-[2px] flex-1 min-h-[20px]" />
                </div>

                {/* Right: Content Card */}
                <div className="bg-white rounded-[24px] flex-1 min-w-0 relative overflow-hidden">
                  <div className="px-[16px] py-[12px] flex flex-col gap-[4px]">
                    <div className="flex flex-col justify-center h-[24px]">
                      <p className="text-[18px] font-medium leading-[25px] tracking-[-0.45px] text-black">
                        {point.title}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Done Badge */}
                  <div 
                    className="absolute top-[12px] right-[16px] flex items-center gap-[4px] px-[8px] h-[24px] rounded-[20px]"
                    style={{ backgroundImage: getPriorityStyle(point.priority).background }}
                  >
                    <p className="text-[12px] font-medium leading-[16px] text-center text-white">
                      {getPriorityStyle(point.priority).text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Your Weekly Impact - Blue Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-[16px] items-start w-full"
            >
              {/* Icon */}
              <div className="flex flex-col items-center shrink-0">
                <div className="bg-white rounded-full size-[40px] flex items-center justify-center relative overflow-hidden">
                  <span className="text-[24px]">📊</span>
                </div>
              </div>

              {/* Card */}
              <div 
                className="flex-1 min-w-0 rounded-[24px] overflow-hidden"
                style={{ backgroundImage: 'linear-gradient(87.5981deg, rgb(70, 162, 255) 0.38278%, rgb(10, 132, 255) 99.443%)' }}
              >
                <div className="flex flex-row items-center p-[16px] gap-[12px]">
                  <div className="flex-1 flex flex-col gap-[8px] min-w-0">
                    <div className="flex flex-col justify-center">
                      <p className="text-[18px] font-semibold leading-[25px] tracking-[-0.45px] text-white">
                        Your Weekly Impact
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex flex-col gap-[6px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-white/80">
                          Blood sugar spikes
                        </span>
                        <span className="text-[16px] font-semibold leading-[20px] tracking-[-0.43px] text-white font-bold font-normal">
                          {weeklyBloodSugarSpikes}/week
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-white/80">
                          Carb load
                        </span>
                        <span className="text-[16px] font-semibold leading-[20px] tracking-[-0.43px] text-white font-bold font-normal">
                          {totalWeeklyCalories} cal
                        </span>
                      </div>
                      
                      <div className="w-full h-[1px] bg-white/20 my-1"></div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-white/80">
                          Glucose response
                        </span>
                        <span className="text-[16px] font-bold leading-[20px] tracking-[-0.43px] text-white font-normal">
                          {bloodSugarResponse.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Doughnut Image */}
                  <div className="shrink-0 size-[58px] relative">
                    <img 
                      alt="Impact visualization" 
                      className="absolute left-0 top-[-2px] w-full h-full object-contain" 
                      src={imgDoughnut3D} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Button Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#90C7FE] pb-3 pt-4 px-6">
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px] bg-[#f14e58] text-white"
            whileTap={{ scale: 0.98 }}
          >
            What I can improve in 30 days
          </motion.button>
        </div>
      </div>
    </div>
  );
}