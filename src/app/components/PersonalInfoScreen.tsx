import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { ProgressBar } from '@/app/components/ProgressBar';

interface PersonalInfoScreenProps {
  onContinue: (data: { firstName: string; age: string; email: string }) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: { firstName: string; age: string; email: string };
}

export function PersonalInfoScreen({ onContinue, onBack, currentStep, totalSteps, initialData }: PersonalInfoScreenProps) {
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [age, setAge] = useState(initialData?.age || '');
  const [email, setEmail] = useState(initialData?.email || '');

  const isValid = () => {
    return firstName.trim() !== '' && email.trim() !== '';
  };

  const handleContinue = () => {
    if (isValid()) {
      onContinue({ firstName, age, email });
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f2f2f7] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[430px] min-h-[100vh] min-h-[100dvh] bg-[#f2f2f7] flex flex-col relative"
      >
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

          {/* Title Section */}
          <div className="px-6 py-3">
            <h1 className="text-[24px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4">
              Tell us a little about{' '}
              <span className="text-[#0a84ff]">yourself</span>
            </h1>
            <p className="text-[17px] font-medium leading-[22px] tracking-[-0.43px] text-[rgba(60,60,67,0.6)] font-bold font-normal">
              This will save your personalized insights and build a plan
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 px-6 pt-6 pb-32 overflow-y-auto">
          <div className="space-y-[20px]">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-[13px] font-medium tracking-[-0.08px] text-[rgba(60,60,67,0.6)] mb-2 ml-4"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-4 py-[18px] bg-white rounded-[24px] text-[17px] leading-[22px] tracking-[-0.43px] text-black placeholder:text-[rgba(60,60,67,0.3)] border-none focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium tracking-[-0.08px] text-[rgba(60,60,67,0.6)] mb-2 ml-4"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-[18px] bg-white rounded-[24px] text-[17px] leading-[22px] tracking-[-0.43px] text-black placeholder:text-[rgba(60,60,67,0.3)] border-none focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Button Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#f2f2f7] pb-[max(12px,env(safe-area-inset-bottom))] pt-4 px-6">
          <button
            onClick={handleContinue}
            disabled={!isValid()}
            className={`w-full py-4 rounded-[20px] transition-colors text-[17px] font-medium leading-[22px] tracking-[-0.43px] ${
              isValid()
                ? 'bg-[#f14e58] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Build my plan
          </button>
        </div>
      </motion.div>
    </div>
  );
}