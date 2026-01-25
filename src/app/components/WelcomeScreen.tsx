import { motion } from 'motion/react';
import svgPaths from "@/imports/svg-4jiaeetmq9";
import heroImage from "figma:asset/main-screen.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#0a84ff] flex flex-col overflow-hidden">
      {/* Hero Section Container - scales to available space */}
      <div className="flex-1 flex items-center justify-center px-4 min-h-0 relative">
        <div className="relative w-full max-w-[430px] md:max-w-[420px] h-full flex items-center justify-center">
          {/* Scaled Container for Images and Review */}
          <div className="absolute inset-0 flex items-center justify-center overflow-visible">
            <motion.img
              src={heroImage}
              alt="Before and after transformation with testimonial"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Content Section - Fixed Bottom */}
      <div className="flex-shrink-0 w-full flex justify-center bg-gradient-to-b from-transparent via-[#0a84ff] to-[#0a84ff] pt-2 md:pt-8">
        <div className="w-full max-w-[430px] flex flex-col gap-[12px] md:gap-[24px] px-6 pb-2">
          {/* Title and Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-[16px] md:gap-[24px] items-center"
          >
            {/* Title */}
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-white text-center">
              Eat smarter. Feel better. Lose weight your way.
            </h1>

            {/* Chips */}
            <div className="flex flex-wrap gap-[8px] items-center justify-center">
              {/* 2-min chip */}
              <div className="backdrop-blur-[40px] bg-[rgba(255,255,255,0.1)] h-[36px] px-[10px] py-[4px] rounded-[999px] flex items-center gap-[4.189px]">
                <div className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g clipPath="url(#clip0_42_630)">
                      <path d={svgPaths.p15e26c00} fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_630">
                        <rect fill="white" height="20" rx="8" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-[15px] font-medium leading-[20px] tracking-[-0.23px] text-white">
                  2-min
                </p>
              </div>

              {/* Insights chip */}
              <div className="backdrop-blur-[40px] bg-[rgba(255,255,255,0.1)] h-[36px] px-[10px] py-[4px] rounded-[999px] flex items-center gap-[4.189px]">
                <div className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g clipPath="url(#clip0_42_625)">
                      <path d={svgPaths.p15263680} fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_625">
                        <rect fill="white" height="20" rx="8" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-[15px] font-medium leading-[20px] tracking-[-0.23px] text-white">
                  Insights
                </p>
              </div>

              {/* Personal Plan chip */}
              <div className="backdrop-blur-[40px] bg-[rgba(255,255,255,0.1)] h-[36px] px-[10px] py-[4px] rounded-[999px] flex items-center gap-[4.189px]">
                <div className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g clipPath="url(#clip0_42_635)">
                      <path d={svgPaths.p2d04cf00} fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_635">
                        <rect fill="white" height="20" rx="8" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-[15px] font-medium leading-[20px] tracking-[-0.23px] text-white">
                  Personal Plan
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onClick={onStart}
            className="w-full bg-[#f14e58] text-white py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px]"
          >
            Take the Quiz
          </motion.button>

          {/* Stars and Satisfaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-2 py-1.5"
          >
            {/* 5 Stars */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, index) => (
                <svg key={index} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#FFC107"
                    stroke="#FFC107"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
            </div>
            {/* Satisfaction Text */}
            <p className="text-[15px] font-semibold leading-[22px] tracking-[-0.43px] text-white">
              98% Satisfaction
            </p>
          </motion.div>

          {/* Terms and Privacy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col items-center pb-2"
          >
            <p className="text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-center text-white">
              By proceeding, you acknowledge and agree
            </p>
            <div className="flex gap-[6px] items-center">
              <button className="text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-white underline">
                Terms of Use
              </button>
              <p className="text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-white">
                and
              </p>
              <button className="text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-white underline">
                Privacy Policy
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
