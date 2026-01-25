import { motion } from 'motion/react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface PaywallScreenProps {
  onClose: () => void;
  onStartTrial: () => void;
}

export function PaywallScreen({ onClose, onStartTrial }: PaywallScreenProps) {
  // Calculate trial dates
  const getTrialDates = () => {
    const today = new Date();
    const reminderDate = new Date(today);
    reminderDate.setDate(today.getDate() + 5);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    const formatDate = (date: Date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    return {
      reminder: formatDate(reminderDate),
      end: formatDate(endDate),
    };
  };

  const dates = getTrialDates();

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#f2f2f7] to-[#90C7FE] flex items-center justify-center overflow-hidden">
      {/* Content Wrapper - Centered with max-width */}
      <div className="w-full max-w-[430px] h-full flex flex-col relative">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-4 bg-[rgba(242,242,247,0)] relative z-20 pt-[0px] pr-[16px] pb-[0px] pl-[4px]">
          <div className="h-[44px] relative flex items-center justify-center">
            <button
              onClick={onClose}
              className="absolute left-4 bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-[320px]">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 mt-0"
          >
            <h1 className="text-[24px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-2">
              Ready? Try #sugar.no ✨
            </h1>
            <p className="text-[40px] font-bold leading-[120%] tracking-[0.4px] text-[#0a84ff]">
              Free for 7 days
            </p>
          </motion.div>

          {/* What you'll get */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-[17px] font-medium leading-[22px] tracking-[-0.43px] text-black mb-6">
              What you'll get in trial:
            </p>

            {/* Benefits List */}
            <div className="space-y-0">
              {/* Benefit 1 */}
              <div className="flex items-start gap-4 relative pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0a84ff] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.3337 4L6.00033 11.3333L2.66699 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-0.5 h-full bg-[#0a84ff] mt-1"></div>
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-[17px] font-bold leading-[22px] tracking-[-0.43px] text-black mb-1">
                    Personalized glucose insights
                  </p>
                  <p className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                    Understand how food affects your blood sugar
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start gap-4 relative pb-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0a84ff] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.3337 4L6.00033 11.3333L2.66699 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-0.5 h-full bg-[#0a84ff] mt-1"></div>
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-[17px] font-bold leading-[22px] tracking-[-0.43px] text-black mb-1">
                    Food and restaurant guidance
                  </p>
                  <p className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                    Make better choices when eating out
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0a84ff] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.3337 4L6.00033 11.3333L2.66699 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-[17px] font-bold leading-[22px] tracking-[-0.43px] text-black mb-1">
                    Tools to make confident choices
                  </p>
                  <p className="text-[15px] font-normal leading-[20px] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                    Track progress and see patterns over time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fixed Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-[#90C7FE] to-[#90C7FE] px-6 pt-8 pb-8"
        >
          <p className="text-center text-[13px] font-medium leading-[18px] tracking-[-0.08px] text-[rgba(0,0,0,0.6)] mb-2">
            7 days free, then $9.99 / Month
          </p>
          <p className="text-center text-[32px] font-bold leading-[120%] tracking-[0.4px] text-[rgb(0,127,255)] mb-8">
            Only $0.33 / Day
          </p>

          {/* CTA Button */}
          <button
            onClick={() => {
              window.location.href = 'https://buy.stripe.com/14AcN64lJ5DWdpdg1L93y04';
            }}
            className="w-full bg-[#f14e58] text-white py-4 rounded-[20px] text-[17px] font-medium leading-[22px] tracking-[-0.43px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform mb-6"
          >
            Start your free 7-day trial
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-8">
            <button className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-[rgba(0,0,0,0.6)]">
              Terms of Use
            </button>
            <button className="text-[13px] font-normal leading-[18px] tracking-[-0.08px] text-[rgba(0,0,0,0.6)]">
              Privacy Policy
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}