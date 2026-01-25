import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface GreetingLoadingScreenProps {
  onComplete: () => void;
  firstName: string;
}

export function GreetingLoadingScreen({ onComplete, firstName }: GreetingLoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE] flex items-center justify-center"
    >
      <div className="w-full max-w-[430px] px-6 flex flex-col items-center justify-center h-full">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-auto mt-auto"
        >
          <h1 className="text-[24px] font-semibold leading-[120%] tracking-[0.4px] text-black">
            Hey, {firstName}.
          </h1>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mb-24"
        >
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(244, 78, 88, 0.2)"
                strokeWidth="4"
              />
              {/* Animated circle */}
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#f14e58"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="175.929"
                initial={{ strokeDashoffset: 175.929 }}
                animate={{ 
                  strokeDashoffset: [175.929, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  strokeDashoffset: {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  },
                  rotate: {
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity
                  }
                }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}