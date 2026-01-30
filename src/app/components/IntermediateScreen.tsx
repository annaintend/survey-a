import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import svgPaths from '@/imports/svg-nanq8hh2uc';
import { ProgressBar } from '@/app/components/ProgressBar';

interface IntermediateScreenProps {
  onContinue: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

// Graph components from Figma import
function Group() {
  return (
    <div className="absolute left-[283.7px] size-[24px] top-[86.07px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group 2">
          <circle cx="12" cy="12" fill="var(--fill-0, #F2F2F7)" id="Ellipse 44" r="12" />
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 45" r="6" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[142.489px] relative w-[306.5px]">
      <div className="absolute inset-[0_-1.06%_-2.28%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 309.751 145.739">
          <g id="Group 4">
            <motion.path 
              d={svgPaths.p115f9de0} 
              id="Vector 3" 
              stroke="var(--stroke-0, #0A84FF)" 
              strokeLinecap="round" 
              strokeWidth="6.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
            <g id="Group 3">
              <motion.circle 
                cx="12" 
                cy="12" 
                fill="var(--fill-0, #0A84FF)" 
                id="Ellipse 44" 
                r="12"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.8, ease: "easeOut" }}
              />
              <motion.circle 
                cx="12" 
                cy="12" 
                fill="var(--fill-0, white)" 
                id="Ellipse 45" 
                r="6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 2, ease: "easeOut" }}
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Chips() {
  return (
    <div className="absolute bg-[#f2f2f7] content-stretch flex items-center justify-center px-[12px] py-[9px] right-[-7px] rounded-[32px] top-[47px]" data-name="Chips">
      <p className="font-medium leading-[18px] relative shrink-0 text-[#2b333c] text-[13px] text-center tracking-[-0.08px]">
        No guidance
      </p>
    </div>
  );
}

function Chips1() {
  return (
    <div className="absolute bg-[#0f0f0f] content-stretch flex items-center justify-center left-[217.53px] px-[32px] py-[9px] rounded-[32px] top-[-35px]" data-name="Chips">
      <p className="font-medium leading-[18px] relative shrink-0 text-[13px] text-center text-white tracking-[-0.08px]">
        With help 💙
      </p>
    </div>
  );
}

function GraphFrame() {
  return (
    <div className="h-[218px] relative shrink-0 w-[306px]">
      <div className="absolute h-0 left-0 top-[220px] w-[314px]">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(84, 84, 86, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 1">
            <line id="Line 5" opacity="0.8" stroke="var(--stroke-0, #545456)" strokeOpacity="0.12" x2="314" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[138px] left-[9.5px] top-[51.5px] w-[292.714px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.714 138">
          <path d={svgPaths.p171fee00} fill="url(#paint0_linear_47_3885)" id="Vector 5" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_47_3885" x1="227.5" x2="239.5" y1="-29.5" y2="73.5">
              <stop offset="0.290829" stopColor="#FBFBFF" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[71.744px] left-[74.82px] top-[106.15px] w-[222.18px]">
        <div className="absolute inset-[-4.53%_-1.46%]" style={{ "--stroke-0": "rgba(242, 242, 247, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 228.68 78.2437">
            <motion.path 
              d={svgPaths.pa571720} 
              id="Vector 4" 
              stroke="var(--stroke-0, #F2F2F7)" 
              strokeLinecap="round" 
              strokeWidth="6.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-[115.332px] left-[17px] top-[75.16px] w-[289.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector 2" />
        </svg>
      </div>
      <div className="absolute h-[60px] left-[224.5px] top-[158px] w-[98.5px]">
        <div className="absolute inset-[-6.67%_-4.06%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106.5 68">
            <g filter="url(#filter0_f_47_3887)" id="Ellipse 42">
              <path d={svgPaths.p1aae7200} fill="url(#paint0_linear_47_3887)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="68" id="filter0_f_47_3887" width="106.5" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_47_3887" stdDeviation="2" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_47_3887" x1="85" x2="26.5" y1="34" y2="31">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[79px] items-center justify-center left-[-7px] top-[37px] w-[130px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[79px] relative w-[130px]">
            <div className="absolute inset-[-5.06%_-3.08%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138 87">
                <g filter="url(#filter0_f_47_3895)" id="Ellipse 43">
                  <path d={svgPaths.p4072900} fill="url(#paint0_linear_47_3895)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="87" id="filter0_f_47_3895" width="138" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_47_3895" stdDeviation="2" />
                  </filter>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_47_3895" x1="110.903" x2="33.6963" y1="43.5" y2="39.5313">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[131px] left-[23px] top-[63px] w-[220px]">
        <div className="absolute inset-[-61.07%_-36.36%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 380 291">
            <g filter="url(#filter0_f_47_3875)" id="Vector 1">
              <path d={svgPaths.p2e35a830} fill="url(#paint0_linear_47_3875)" fillOpacity="0.6" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="291" id="filter0_f_47_3875" width="380" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_47_3875" stdDeviation="40" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_47_3875" x1="101.938" x2="142.438" y1="80" y2="102.5">
                <stop stopColor="white" stopOpacity="0.3" />
                <stop offset="1" stopColor="#0A84FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Group />
      <div className="absolute flex h-[142.489px] items-center justify-center left-[-7px] top-[11.72px] w-[306.5px]">
        <div className="flex-none scale-y-[-100%]">
          <Group1 />
        </div>
      </div>
      <Chips />
      <Chips1 />
    </div>
  );
}

export function IntermediateScreen({ onContinue, onBack, currentStep, totalSteps }: IntermediateScreenProps) {
  useEffect(() => {
    window?.amplitude?.track?.("motivation_screen_viewed")
  }, [])
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE] flex items-center justify-center">
      {/* Content Wrapper - Centered with max-width */}
      <div className="w-full max-w-[430px] h-full flex flex-col relative">
        {/* Header with Back Button */}
        <div className="bg-transparent sticky top-0 z-10">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 overflow-y-auto pb-32 px-6"
        >
          <div className="mb-8">
            <h1 className="text-[28px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4 text-center">
              See how #sugarno can <span className="text-[#0a84ff]">change your body</span>
            </h1>
          </div>

          <div className="mb-6">
            {/* Graph with background */}
            <motion.div 
              className="bg-white rounded-[40px] px-[16px] py-[24px] pt-[16px] pr-[16px] pb-[24px] flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div 
                className="flex flex-col gap-[12px] items-center pt-[49px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <GraphFrame />
                {/* X-axis labels */}
                <div className="flex items-start justify-between w-[306px] text-[13px] font-semibold leading-[18px] text-black text-center tracking-[-0.08px]">
                  <p>Day 1</p>
                  <p>Day 30</p>
                </div>
              
                {/* Timeline items without connecting line - just icons */}
                <div className="space-y-4 mt-6 w-full">
                  <div className="flex items-start gap-4 px-[8px] py-[0px]">
                    <div className="text-[20px] shrink-0">👣</div>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold text-[rgb(10,132,255)] mb-1">3 Days</div>
                      <div className="text-[15px] font-normal leading-[20px] tracking-[-0.43px] text-black">
                        Fewer sudden energy crashes
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 px-[8px] py-[0px]">
                    <div className="text-[20px] shrink-0">🧗🏼</div>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold text-[rgb(10,132,255)] mb-1">7 Days</div>
                      <div className="text-[15px] font-normal leading-[20px] tracking-[-0.43px] text-black">
                        More predictable energy throughout the day
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 px-[8px] py-[0px]">
                    <div className="text-[20px] shrink-0">🗻</div>
                    <div className="flex-1">
                      <div className="text-[17px] font-semibold text-[rgb(10,132,255)] mb-1">30 Days</div>
                      <div className="text-[15px] font-normal leading-[20px] tracking-[-0.43px] text-black">
                        Clear understanding of your personal patterns
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mb-6">
            <p className="text-[13px] leading-[20px] tracking-[-0.43px] text-[rgba(0,0,0,0.85)] text-center font-bold font-normal">
              Based on scientific data, blood sugar responses become more predictable within the first week.
              As patterns emerge, energy crashes decrease and food decisions require less effort.
            </p>
          </div>
        </motion.div>

        {/* Fixed Bottom Button Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-[#90C7FE] pb-2 pt-4 px-6">
          <button
            onClick={onContinue}
            className="w-full bg-[#f14e58] text-white py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}