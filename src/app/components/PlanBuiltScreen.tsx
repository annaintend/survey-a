import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import logoImage from '@/assets/pancakes.png"';

interface PlanBuiltScreenProps {
  onComplete: () => void;
  firstName: string;
  onBack?: () => void;
}

export function PlanBuiltScreen({ onComplete, firstName, onBack }: PlanBuiltScreenProps) {
  const [streakDays, setStreakDays] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Animate from 0 to 1 after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStreakDays(1);
      setShowCelebration(true);
      // Hide celebration after animation completes
      setTimeout(() => setShowCelebration(false), 2000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Get current date in MM/DD format
  const getCurrentDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Layered Sunset Background - Full Viewport */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#87CEEB] to-[#87CEEB]">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#B0E0F6] via-[#87CEEB] to-[#5DADE2]" />
        
        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Small stars */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: 1 }}
              transition={{
                delay: Math.random() * 2,
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
            />
          ))}
          
          {/* Medium stars */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`star-med-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.4, 1, 0.4], scale: 1 }}
              transition={{
                delay: Math.random() * 2,
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5L4 0Z" fill="white" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
        
        {/* More Clouds */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.5 }}
          className="absolute top-8 left-8"
        >
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
            <ellipse cx="25" cy="25" rx="25" ry="15" fill="#C1E7F4" opacity="0.6" />
            <ellipse cx="50" cy="20" rx="30" ry="18" fill="#C1E7F4" opacity="0.6" />
            <ellipse cx="75" cy="25" rx="25" ry="15" fill="#C1E7F4" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="absolute top-12 right-4"
        >
          <svg width="80" height="35" viewBox="0 0 80 35" fill="none">
            <ellipse cx="20" cy="20" rx="20" ry="12" fill="#C1E7F4" opacity="0.6" />
            <ellipse cx="40" cy="17" rx="25" ry="15" fill="#C1E7F4" opacity="0.6" />
            <ellipse cx="60" cy="20" rx="20" ry="12" fill="#C1E7F4" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute top-20 left-32"
        >
          <svg width="70" height="30" viewBox="0 0 70 30" fill="none">
            <ellipse cx="18" cy="18" rx="18" ry="12" fill="#C1E7F4" opacity="0.5" />
            <ellipse cx="35" cy="15" rx="22" ry="13" fill="#C1E7F4" opacity="0.5" />
            <ellipse cx="52" cy="18" rx="18" ry="12" fill="#C1E7F4" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute top-24 right-20"
        >
          <svg width="90" height="38" viewBox="0 0 90 38" fill="none">
            <ellipse cx="22" cy="22" rx="22" ry="14" fill="#C1E7F4" opacity="0.55" />
            <ellipse cx="45" cy="19" rx="28" ry="16" fill="#C1E7F4" opacity="0.55" />
            <ellipse cx="68" cy="22" rx="22" ry="14" fill="#C1E7F4" opacity="0.55" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute top-32 left-16"
        >
          <svg width="75" height="32" viewBox="0 0 75 32" fill="none">
            <ellipse cx="19" cy="19" rx="19" ry="13" fill="#C1E7F4" opacity="0.5" />
            <ellipse cx="38" cy="16" rx="24" ry="14" fill="#C1E7F4" opacity="0.5" />
            <ellipse cx="56" cy="19" rx="19" ry="13" fill="#C1E7F4" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1.5 }}
          className="absolute top-40 right-32"
        >
          <svg width="85" height="36" viewBox="0 0 85 36" fill="none">
            <ellipse cx="21" cy="21" rx="21" ry="13" fill="#C1E7F4" opacity="0.52" />
            <ellipse cx="42" cy="18" rx="26" ry="15" fill="#C1E7F4" opacity="0.52" />
            <ellipse cx="64" cy="21" rx="21" ry="13" fill="#C1E7F4" opacity="0.52" />
          </svg>
        </motion.div>

        {/* Wave layers */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0"
        >
          {/* Wave 1 - darkest */}
          <svg className="absolute bottom-32 w-full" height="140" viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none">
            <path d="M0 40 Q360 0 720 40 T1440 40 L1440 140 L0 140 Z" fill="#3498DB" opacity="0.6" />
          </svg>
          
          {/* Wave 2 - medium */}
          <svg className="absolute bottom-16 w-full" height="120" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0 30 Q360 60 720 30 T1440 30 L1440 120 L0 120 Z" fill="#5DADE2" opacity="0.7" />
          </svg>
          
          {/* Wave 3 - lighter */}
          <svg className="absolute bottom-8 w-full" height="100" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
            <path d="M0 40 Q360 10 720 40 T1440 40 L1440 100 L0 100 Z" fill="#7FC7EB" opacity="0.8" />
          </svg>
          
          {/* Wave 4 - lightest */}
          <svg className="absolute bottom-0 w-full" height="80" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path d="M0 20 Q360 50 720 20 T1440 20 L1440 80 L0 80 Z" fill="#A8D8F0" opacity="0.9" />
          </svg>
        </motion.div>

        {/* White content area */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-transparent via-[#f2f2f7]/80 to-[#f2f2f7]" />
      </div>

      {/* Content Wrapper - Centered with max-width */}
      <div className="relative z-10 w-full max-w-[430px] h-full flex flex-col">
        {/* Back Button - Fixed Header */}
        <div className="bg-transparent sticky top-0 z-20">
          <div className="h-[44px] relative flex items-center justify-center px-4">
            <button
              onClick={onBack}
              className="absolute left-4 bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 flex flex-col items-center px-6 pb-32">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12 mt-4"
          >
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4">
              Let's make it<br />
              <span className="text-[#F14E58]">Day 1</span>
            </h1>
            <p className="text-[16px] font-medium leading-[22px] tracking-[-0.43px] text-[rgba(60,60,67,0.6)] font-normal">
              There's no perfect time to start. Doing small steps, start just now.
            </p>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full max-w-[340px] relative"
          >
            {/* Flying celebration stars */}
            {showCelebration && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`celebrate-star-${i}`}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{ 
                      x: Math.cos((i / 12) * Math.PI * 2) * 150,
                      y: Math.sin((i / 12) * Math.PI * 2) * 150,
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path 
                        d="M10 0L11.545 8.455L20 10L11.545 11.545L10 20L8.455 11.545L0 10L8.455 8.455L10 0Z" 
                        fill="#FFD700" 
                      />
                    </svg>
                  </motion.div>
                ))}
              </>
            )}

            {/* Sparkle Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -top-2 -right-2 z-10"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 0L26.472 17.528L36 12L30.472 21.528L48 24L30.472 26.472L36 36L26.472 30.472L24 48L21.528 30.472L12 36L17.528 26.472L0 24L17.528 21.528L12 12L21.528 17.528L24 0Z"
                  fill="#f14e58"
                />
              </svg>
            </motion.div>

            {/* Card */}
            <div className="bg-gradient-to-br from-[#ff006e] via-[#ff3d6f] to-[#ff5733] p-6 shadow-lg rounded-t-[40px] rounded-b-[0px]">
              {/* Header with Logo and Book Icon */}
              <div className="flex items-center justify-end mb-32">
                <img src={logoImage} alt="#sugar.no" className="h-[32px] w-auto" />
              </div>

              {/* Active Streak */}
              <div>
                <p className="text-white/90 text-[14px] font-medium mb-1">Active Streak</p>
                <p className="text-white text-[48px] font-bold leading-none mb-4">{streakDays} days</p>
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-white rounded-b-[40px] -mt-4 pt-[20px] pb-[16px] px-[24px] py-[16px] pr-[24px] pl-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[rgba(60,60,67,0.6)] text-[13px] font-medium mb-1">Name</p>
                  <p className="text-black text-[20px] font-semibold">{firstName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[rgba(60,60,67,0.6)] text-[13px] font-medium mb-1">Getting healthier since</p>
                  <p className="text-black text-[20px] font-semibold">{getCurrentDate()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Button Section - Fixed */}
        <div className="absolute bottom-0 left-0 right-0 bg-[rgba(242,242,247,0)] pb-3 pt-4 px-6 z-20">
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-[20px] bg-[#f14e58] text-white text-[17px] font-medium leading-[22px] tracking-[-0.43px] transition-all active:scale-[0.98]"
          >
            Yes, I'm ready to start journey!
          </button>
        </div>
      </div>
    </motion.div>
  );
}
