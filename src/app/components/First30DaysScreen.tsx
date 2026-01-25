import { motion } from 'motion/react';
import { ChevronLeft, TrendingDown, Heart, Zap, ArrowDown, ArrowUp } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';

interface First30DaysScreenProps {
  onContinue: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  frequency: string;
  portionSize: string;
}

export function First30DaysScreen({ onContinue, onBack, currentStep, totalSteps, frequency, portionSize }: First30DaysScreenProps) {
  // Debug: Log the received props
  console.log('First30DaysScreen props:', { frequency, portionSize });

  // Calculate weekly treats count and calories
  const getFrequencyCount = (freq: string): number => {
    switch (freq) {
      case 'daily': return 7;
      case 'few-days': return 3;
      case 'weekly': return 1;
      default: return 3;
    }
  };

  const getPortionCalories = (portion: string): number => {
    switch (portion) {
      case 'small': return 150;
      case 'medium': return 250;
      case 'large': return 425;
      default: return 250;
    }
  };

  const weeklyTreats = getFrequencyCount(frequency);
  const caloriesPerTreat = getPortionCalories(portionSize);
  const totalWeeklyCalories = weeklyTreats * caloriesPerTreat;
  const monthlySpikes = weeklyTreats * 4;
  
  // Calculate stability level (percentage based on frequency - lower frequency = higher stability)
  const stabilityLevel = weeklyTreats <= 1 ? 85 : weeklyTreats <= 3 ? 70 : weeklyTreats <= 7 ? 55 : 40;

  console.log('Calculated values:', { weeklyTreats, caloriesPerTreat, totalWeeklyCalories });

  // Calculate dynamic metrics based on user input
  const calculateMetrics = () => {
    // Body fat reduction scales with frequency and portion size
    const baseBodyFat = weeklyTreats <= 1 ? 2.5 : weeklyTreats <= 3 ? 3.5 : weeklyTreats <= 7 ? 4.5 : 5.5;
    const bodyFatAdjustment = portionSize === 'large' ? 0.5 : portionSize === 'small' ? -0.5 : 0;
    const totalBodyFat = baseBodyFat + bodyFatAdjustment;

    // Overeating reduction percentage based on frequency
    const overeatingReduction = weeklyTreats <= 1 ? 15 : weeklyTreats <= 3 ? 30 : weeklyTreats <= 7 ? 45 : 60;

    // Energy hours gained based on total weekly impact
    const energyHours = weeklyTreats <= 1 ? 40 : weeklyTreats <= 3 ? 60 : weeklyTreats <= 7 ? 80 : 100;

    console.log('Metric calculations:', { baseBodyFat, bodyFatAdjustment, totalBodyFat, overeatingReduction, energyHours });

    return [
      {
        icon: TrendingDown,
        value: `–${totalBodyFat.toFixed(1)} lbs`,
        label: 'Body Fat',
        arrowIcon: ArrowDown,
        description: 'More stable blood sugar helps lower insulin spikes, making it easier for your body to access stored fat',
        score: Math.round(85 + (totalBodyFat * 2)),
        improvement: Math.round(totalBodyFat * 10),
        gradient: true,
      },
      {
        icon: Heart,
        value: `–${overeatingReduction}%`,
        label: 'Overeating',
        arrowIcon: ArrowDown,
        description: 'Fewer glucose crashes often mean fewer strong cravings and less reactive eating',
        score: Math.round(82 + (overeatingReduction * 0.2)),
        improvement: Math.round(overeatingReduction * 0.8),
        gradient: false,
      },
      {
        icon: Zap,
        value: `+${energyHours}h`,
        label: 'Energy Gain',
        arrowIcon: ArrowUp,
        description: 'Less time spent feeling tired, foggy, or "running on empty" throughout the month',
        score: Math.round(78 + (energyHours * 0.15)),
        improvement: Math.round(energyHours * 0.5),
        gradient: false,
      },
    ];
  };

  const metrics = calculateMetrics();

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
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="mb-8 mt-3">
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4 text-center">
              Imagine you stick to plan{' '}
              <span className="text-[#0A84FF]">for 30 days</span>
            </h1>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const ArrowIconComponent = metric.arrowIcon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-[32px] p-5 ${
                    metric.gradient
                      ? 'bg-gradient-to-r from-[#46A2FF] to-[#0A84FF] col-span-2'
                      : 'bg-white border border-gray-100'
                  } ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
                >
                  {/* Icon and Label */}
                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className={`w-5 h-5 ${
                      metric.gradient ? 'text-white' : 'text-[#667eea]'
                    }`} />
                    <span className={`text-[13px] font-semibold ${
                      metric.gradient ? 'text-white' : 'text-black'
                    }`}>
                      {metric.label}
                    </span>
                  </div>

                  {/* Score Value */}
                  <div className="mb-3 flex items-center gap-1">
                    <span className={`text-[40px] font-bold leading-[1] whitespace-nowrap ${
                      metric.gradient ? 'text-white' : 'text-black'
                    }`}>
                      {metric.value}
                    </span>
                    <ArrowIconComponent className={`w-6 h-6 ${
                      metric.gradient ? 'text-white' : 'text-[#667eea]'
                    }`} />
                  </div>

                  {/* Description */}
                  <p className={`text-[13px] font-normal leading-[18px] ${
                    metric.gradient ? 'text-white/90' : 'text-[rgba(60,60,67,0.6)]'
                  }`}>
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
            
            {/* Weekly Impact Box - now part of the grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-100 rounded-[32px] p-5 col-span-2"
            >
              <p className="text-[13px] font-semibold text-black mb-4">
                Weekly Improvements
              </p>
              <div className="grid grid-cols-3 gap-4">
                {/* Sugar Spikes */}
                <div className="text-center">
                  <p className="text-[24px] font-bold leading-[1] text-black mb-1">
                    {monthlySpikes}
                  </p>
                  <p className="text-[11px] font-normal leading-[14px] text-[rgba(60,60,67,0.6)]">
                    Sugar Spikes
                  </p>
                </div>
                
                {/* Calories */}
                <div className="text-center">
                  <p className="text-[24px] font-bold leading-[1] text-black mb-1">
                    {totalWeeklyCalories.toLocaleString()}
                  </p>
                  <p className="text-[11px] font-normal leading-[14px] text-[rgba(60,60,67,0.6)]">
                    Calories/week
                  </p>
                </div>
                
                {/* Stability Level */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <p className="text-[24px] font-bold leading-[1] text-black">
                      {stabilityLevel}%
                    </p>
                    <ArrowUp className="w-5 h-5 text-[#667eea]" />
                  </div>
                  <p className="text-[11px] font-normal leading-[14px] text-[rgba(60,60,67,0.6)]">
                    Stability Level
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footnote */}
          <p className="text-[13px] font-normal leading-[18px] text-[rgba(60,60,67,0.4)] text-center px-4 mb-24">
            Estimates based on typical responses to improved blood sugar stability. Individual results may vary.
          </p>
        </div>

        {/* Bottom Button Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#90C7FE] pb-3 pt-4 px-6">
          <motion.button
            onClick={onContinue}
            className="w-full py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px] bg-[#f14e58] text-white"
            whileTap={{ scale: 0.98 }}
          >
            Get more insights
          </motion.button>
        </div>
      </div>
    </div>
  );
}