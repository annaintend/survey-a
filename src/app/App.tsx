import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WelcomeScreen } from '@/app/components/WelcomeScreen';
import { QuizQuestion, getSupportTitle } from '@/app/components/QuizQuestion';
import { PaywallScreen } from '@/app/components/PaywallScreen';
import { IntermediateScreen } from '@/app/components/IntermediateScreen';
import { WeeklyPatternQuestion } from '@/app/components/WeeklyPatternQuestion';
import { WeeklyFeedbackScreen } from '@/app/components/WeeklyFeedbackScreen';
import { First30DaysScreen } from '@/app/components/First30DaysScreen';
import { PersonalInfoScreen } from '@/app/components/PersonalInfoScreen';
import { AgeScreen } from '@/app/components/AgeScreen';
import { LoadingScreen } from '@/app/components/LoadingScreen';
import { AnalysisCompleteScreen } from '@/app/components/AnalysisCompleteScreen';
import { GoalsScreen } from '@/app/components/GoalsScreen';
import { CurrentBalanceScreen } from '@/app/components/CurrentBalanceScreen';
import { PotentialBalanceScreen } from '@/app/components/PotentialBalanceScreen';
import { GreetingLoadingScreen } from '@/app/components/GreetingLoadingScreen';
import { PlanBuiltScreen } from '@/app/components/PlanBuiltScreen';
import { ProgressBar } from '@/app/components/ProgressBar';
import { ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: Array<{
    value: string;
    label: string;
    supportText: string;
  }>;
  isMultiSelect: boolean;
}

declare global {
  interface Window {
    amplitude: any | undefined
  }
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'How do you currently see yourself in relation to food, blood sugar?',
    options: [
      {
        value: 'out-of-control',
        label: 'I feel out of control around food',
        supportText: "You're not failing — unpredictable blood sugar often creates this feeling.",
      },
      {
        value: 'trying-better',
        label: "I'm trying to eat better, but it's confusing",
        supportText: "Conflicting advice makes it hard to know what actually works for your body.",
      },
      {
        value: 'learning-improving',
        label: "I'm learning and improving step by step",
        supportText: "That mindset is exactly how long-term stability is built.",
      },
      {
        value: 'need-tools',
        label: 'I feel like I need better tools and feedback',
        supportText: "Awareness and feedback matter more than stricter rules.",
      },
    ],
    isMultiSelect: true,
  },
  {
    id: 2,
    question: 'What frustrates you most about your relationship with sugar?',
    options: [
      {
        value: 'dont-understand',
        label: "I don't understand how sugar affects my blood sugar",
        supportText: "You're not alone. Most people never see how the same sugar can affect them differently day to day.",
      },
      {
        value: 'inconsistent',
        label: 'I feel fine sometimes, but terrible other times',
        supportText: "This inconsistency is often a sign of blood sugar spikes and crashes, not lack of discipline.",
      },
      {
        value: 'eat-normally',
        label: 'I try to eat "normally", but still get energy crashes',
        supportText: '"Normal" foods can still cause glucose instability depending on timing, portion, and pairing.',
      },
      {
        value: 'no-limit',
        label: "I don't know how much sugar is okay for me personally",
        supportText: "There is no universal limit. Your body has its own threshold — it just hasn't been mapped yet.",
      },
    ],
    isMultiSelect: true,
  },
  {
    id: 3,
    question: "How do you typically handle social situations with sugary foods?",
    isMultiSelect: true,
    options: [
      {
        value: 'eat-without-knowing',
        label: "I eat without knowing how I'll feel later",
        supportText: "Lack of predictability often creates post-event regret or crashes."
      },
      {
        value: 'avoid-certain-foods',
        label: 'I avoid certain foods just in case',
        supportText: "Avoidance is common when feedback is missing."
      },
      {
        value: 'anxious-overthink',
        label: 'I feel anxious and overthink my choices',
        supportText: "Uncertainty turns food into a cognitive burden."
      },
      {
        value: 'adjust-portions',
        label: 'I adjust portions and timing confidently',
        supportText: "Awareness allows flexibility without loss of control."
      }
    ]
  },
  {
    id: 4,
    question: 'How do you feel when others around you eat sugary foods freely?',
    options: [
      {
        value: 'confused-comparison',
        label: 'Confused why their body seems to handle it better than mine',
        supportText: "People have very different glycemic responses — comparison rarely tells the full story.",
      },
      {
        value: 'worried-crash',
        label: "Worried I'll crash later if I eat the same",
        supportText: "That anticipation often comes from past glucose crashes, not from the food itself.",
      },
      {
        value: 'frustrated-unpredictable',
        label: 'Frustrated that food affects my energy so unpredictably',
        supportText: "Unpredictability usually means patterns exist — they just haven't been identified yet.",
      },
      {
        value: 'confident-limits',
        label: 'Confident when I understand my limits',
        supportText: "Awareness changes everything. Knowing your limits removes anxiety from food choices.",
      },
    ],
    isMultiSelect: true,
  },
  {
    id: 5,
    question: "Which area of your life has been most affected by unstable blood sugar?",
    isMultiSelect: true,
    options: [
      {
        value: 'energy-focus',
        label: 'My energy levels and focus',
        supportText: "Blood sugar dips are one of the most common causes of fatigue and brain fog."
      },
      {
        value: 'mood-stability',
        label: 'My mood and emotional stability',
        supportText: "Rapid glucose changes can strongly influence irritability, anxiety, and mood swings."
      },
      {
        value: 'weight-composition',
        label: 'My weight or body composition',
        supportText: "Frequent insulin spikes can promote fat storage even without overeating."
      },
      {
        value: 'food-relationship',
        label: 'My relationship with food and eating',
        supportText: "Uncertainty around food often leads to over-restriction or reactive eating."
      }
    ]
  },
  {
    id: 6,
    question: "When do you most notice negative effects after eating?",
    isMultiSelect: true,
    options: [
      {
        value: 'healthy-meals',
        label: 'After meals that should be \'healthy\'',
        supportText: "Even healthy foods can spike blood sugar if portions or combinations aren't right for you."
      },
      {
        value: 'afternoon-evening',
        label: 'In the afternoon or early evening',
        supportText: "This is a classic window for delayed glucose crashes from earlier meals."
      },
      {
        value: 'stress-overwhelm',
        label: 'When I\'m stressed or overwhelmed',
        supportText: "Stress raises blood sugar on its own, making food responses harder to predict."
      },
      {
        value: 'social-events',
        label: 'During social events or eating out',
        supportText: "Unfamiliar foods and timing often amplify blood sugar variability."
      }
    ]
  },
  {
    id: 7,
    question: "What symptoms are you experiencing?",
    isMultiSelect: true,
    options: [
      {
        value: 'brain-fog',
        label: 'Brain fog or difficulty concentrating',
        supportText: "Mental clarity is often the first casualty of unstable glucose levels."
      },
      {
        value: 'fatigue-sleepiness',
        label: 'Fatigue or sleepiness after meals',
        supportText: "Post-meal crashes are a telltale sign of glucose spikes followed by rapid drops."
      },
      {
        value: 'headaches',
        label: 'Frequent headaches',
        supportText: "Blood sugar fluctuations can trigger tension and migraine-type headaches."
      },
      {
        value: 'jittery-shaky',
        label: 'Feeling jittery or shaky',
        supportText: "This trembling sensation often signals reactive hypoglycemia from glucose crashes."
      }
    ]
  },
  {
    id: 8,
    question: "What's the biggest consequence you've experienced from unstable blood sugar?",
    isMultiSelect: true,
    options: [
      {
        value: 'energy-crashes',
        label: 'Sudden energy crashes',
        supportText: "These often come from delayed glucose drops after meals."
      },
      {
        value: 'strong-cravings',
        label: 'Strong cravings that feel out of proportion',
        supportText: "Cravings are frequently a physiological response, not a lack of control."
      },
      {
        value: 'mood-swings',
        label: 'Mood swings or irritability',
        supportText: "Blood sugar fluctuations can directly affect emotional regulation."
      },
      {
        value: 'planning-around-food',
        label: 'Planning my day around food and energy',
        supportText: "Unpredictability forces constant mental effort around eating."
      }
    ]
  },
  {
    id: 9,
    question: "How would you feel if your energy and cravings were predictable?",
    isMultiSelect: true,
    options: [
      {
        value: 'calm-control',
        label: 'Calm and in control',
        supportText: "Stability removes the constant background stress around food."
      },
      {
        value: 'confident-choices',
        label: 'Confident in my food choices',
        supportText: "Confidence comes from understanding cause and effect."
      },
      {
        value: 'free-calculations',
        label: 'Free from constant food calculations',
        supportText: "Less mental load means more space for life."
      },
      {
        value: 'focused-clear',
        label: 'Focused and mentally clear',
        supportText: "Stable glucose supports sustained cognitive performance."
      }
    ]
  },
  {
    id: 10,
    question: "What would achieving blood sugar balance mean to you personally?",
    isMultiSelect: true,
    options: [
      {
        value: 'trust-body',
        label: 'Trusting my body again',
        supportText: "Trust is rebuilt when signals become consistent."
      },
      {
        value: 'eat-without-fear',
        label: 'Eating without fear or guilt',
        supportText: "Food neutrality replaces restriction and anxiety."
      },
      {
        value: 'consistent-energy',
        label: 'Feeling consistent energy every day',
        supportText: "Energy stability compounds into better days overall."
      },
      {
        value: 'support-health',
        label: 'Supporting long-term health',
        supportText: "Blood sugar balance is a cornerstone of metabolic health."
      }
    ]
  },
  {
    id: 11,
    question: "What kind of support would make the <span class='text-[#0A84FF]'>biggest difference for you?</span>",
    isMultiSelect: true,
    options: [
      {
        value: 'understand-body-response',
        label: 'Understanding how my body responds to food',
        supportText: "Knowing cause and effect removes guesswork from eating."
      },
      {
        value: 'handle-crashes',
        label: 'Tools to handle crashes or cravings in the moment',
        supportText: "Real-time guidance helps when energy drops unexpectedly."
      },
      {
        value: 'see-patterns',
        label: 'Seeing patterns over time',
        supportText: "Trends reveal what works — and what doesn't — for you."
      },
      {
        value: 'track-progress',
        label: 'Tracking progress without obsession',
        supportText: "Clarity without pressure leads to consistency."
      }
    ]
  },
  {
    id: 12,
    question: "What is your gender?",
    isMultiSelect: false,
    options: [
      {
        value: 'male',
        label: 'Male',
        supportText: "We'll account for common metabolic and lifestyle patterns seen in men."
      },
      {
        value: 'female',
        label: 'Female',
        supportText: "We'll consider hormonal cycles and their impact on blood sugar."
      },
      {
        value: 'other',
        label: 'Other / Prefer not to say',
        supportText: "Your experience will be personalized based on your responses."
      }
    ]
  }
];

type QuizState = 'welcome' | 'quiz' | 'intermediate' | 'weekly-pattern' | 'weekly-feedback' | 'first-30-days' | 'age' | 'personal-info' | 'paywall' | 'loading' | 'analysis-complete' | 'goals' | 'current-balance' | 'potential-balance' | 'greeting-loading' | 'plan-built';

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[] | string>>({});
  const [selectedOption, setSelectedOption] = useState<string[] | string | null>(null);
  const [weeklyPatternAnswers, setWeeklyPatternAnswers] = useState<{ frequency: string; portion: string } | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState<{ firstName: string; age: string; email: string } | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Calculate progress across the entire quiz flow
  const getProgressSteps = () => {
    const totalSteps = 17; // 12 questions + intermediate + 3 weekly screens + age screen
    let currentStep = 0;

    switch (quizState) {
      case 'quiz':
        if (currentQuestionIndex <= 2) {
          // Questions 1-3
          currentStep = currentQuestionIndex + 1;
        } else if (currentQuestionIndex <= 5) {
          // Questions 4-6 (after intermediate screen)
          currentStep = currentQuestionIndex + 2; // +2 because intermediate is step 4
        } else {
          // Questions 7-12 (after weekly screens)
          currentStep = currentQuestionIndex + 5; // +5 because intermediate + 3 weekly screens
        }
        break;
      case 'intermediate':
        currentStep = 4;
        break;
      case 'weekly-pattern':
        currentStep = 8;
        break;
      case 'weekly-feedback':
        currentStep = 9;
        break;
      case 'first-30-days':
        currentStep = 10;
        break;
      case 'age':
        currentStep = 17;
        break;
      case 'personal-info':
        currentStep = 17; // Complete quiz progress
        break;
      default:
        currentStep = 0;
    }

    return { current: currentStep, total: totalSteps };
  };

  const progressSteps = getProgressSteps();

  const handleStart = () => {
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(quizQuestions[0].isMultiSelect ? [] : null);
  };

  const handleSelectOption = (option: string) => {
    if (quizQuestions[currentQuestionIndex].isMultiSelect) {
      if (Array.isArray(selectedOption)) {
        if (selectedOption.includes(option)) {
          setSelectedOption(selectedOption.filter((item) => item !== option));
        } else {
          setSelectedOption([...selectedOption, option]);
        }
      } else {
        setSelectedOption([option]);
      }
    } else {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    const hasSelection = Array.isArray(selectedOption) 
      ? selectedOption.length > 0 
      : selectedOption !== null;
  
    window?.amplitude?.track?.("question_viewed", {
      question_id: currentQuestionIndex,
      context: quizState,
    })
      
    if (hasSelection) {
      setAnswers({
        ...answers,
        [quizQuestions[currentQuestionIndex].id]: selectedOption,
      });

      // Show intermediate screen after question 3
      if (currentQuestionIndex === 2) {
        setQuizState('intermediate');
      } else if (currentQuestionIndex === 5) {
        // After question 6, show weekly pattern screens
        setQuizState('weekly-pattern');
      } else if (currentQuestionIndex === quizQuestions.length - 1) {
        // After last quiz question (question 12), show age screen
        setQuizState('age');
      } else if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(quizQuestions[currentQuestionIndex + 1].isMultiSelect ? [] : null);
      }
    }
  };

  const handleBack = () => {
    // Special case: If we're on question 4 (index 3), go back to intermediate screen
    if (currentQuestionIndex === 3) {
      setQuizState('intermediate');
      return;
    }
    
    // Special case: If we're on question 7 (index 6), go back to weekly-feedback screen
    if (currentQuestionIndex === 6) {
      setQuizState('weekly-feedback');
      return;
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevAnswer = answers[quizQuestions[currentQuestionIndex - 1].id];
      setSelectedOption(prevAnswer || (quizQuestions[currentQuestionIndex - 1].isMultiSelect ? [] : null));
    } else {
      setQuizState('welcome');
    }
  };

  const handleIntermediateBack = () => {
    setQuizState('quiz');
    setCurrentQuestionIndex(2);
    const prevAnswer = answers[quizQuestions[2].id];
    setSelectedOption(prevAnswer || (quizQuestions[2].isMultiSelect ? [] : null));
  };

  const handleRestart = () => {
    setQuizState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const hasSelection = () => {
    if (Array.isArray(selectedOption)) {
      return selectedOption.length > 0;
    }
    return selectedOption !== null;
  };

  // Get the last selected option for support text display
  const getLastSelectedOption = () => {
    if (Array.isArray(selectedOption) && selectedOption.length > 0) {
      const lastValue = selectedOption[selectedOption.length - 1];
      return currentQuestion.options.find(opt => opt.value === lastValue);
    } else if (selectedOption) {
      return currentQuestion.options.find(opt => opt.value === selectedOption);
    }
    return null;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Function to split question for highlighting
  const getQuestionParts = (question: string, questionId: number) => {
    // For question 1, highlight "food, blood sugar?"
    if (questionId === 1) {
      const parts = question.split('food, blood sugar?');
      return {
        main: parts[0],
        highlight: 'food, blood sugar?',
      };
    }
    // For question 11, handle the span tag
    if (questionId === 11) {
      return {
        main: "What kind of support would make the ",
        highlight: "biggest difference for you?",
      };
    }
    // For other questions, highlight last 2 words
    const words = question.split(' ');
    return {
      main: words.slice(0, -2).join(' '),
      highlight: words.slice(-2).join(' '),
    };
  };

  // Determine if current state is a full-viewport gradient screen
  const isFullViewportScreen = ['welcome', 'greeting-loading', 'loading', 'analysis-complete', 'goals', 'plan-built', 'paywall', 'first-30-days', 'weekly-feedback', 'intermediate'].includes(quizState);

  return (
    <div className="min-h-screen bg-[#f2f2f7]">
      {/* Screens with full-viewport gradients - rendered outside wrapper */}
      {quizState === 'welcome' && (
        <WelcomeScreen key="welcome" onStart={handleStart} />
      )}

      {quizState === 'greeting-loading' && personalInfo && (
        <GreetingLoadingScreen
          key="greeting-loading"
          onComplete={() => {
            setQuizState('loading');
          }}
          firstName={personalInfo.firstName}
        />
      )}

      {quizState === 'loading' && (
        <LoadingScreen
          key="loading"
          onComplete={() => {
            setQuizState('analysis-complete');
          }}
        />
      )}

      {quizState === 'analysis-complete' && (
        <AnalysisCompleteScreen
          key="analysis-complete"
          onContinue={() => {
            setQuizState('goals');
          }}
          answers={answers}
        />
      )}

      {quizState === 'goals' && (
        <GoalsScreen
          key="goals"
          onContinue={(goals) => {
            setSelectedGoals(goals);
            setQuizState('current-balance');
          }}
          onBack={() => {
            setQuizState('analysis-complete');
          }}
          initialGoals={selectedGoals}
        />
      )}

      {quizState === 'plan-built' && personalInfo && (
        <PlanBuiltScreen
          key="plan-built"
          onComplete={() => {
            setQuizState('paywall');
          }}
          onBack={() => {
            setQuizState('potential-balance');
          }}
          firstName={personalInfo.firstName}
        />
      )}

      {quizState === 'paywall' && (
        <PaywallScreen
          key="paywall"
          onContinue={() => {
            setQuizState('first-30-days');
          }}
          onBack={() => {
            setQuizState('plan-built');
          }}
        />
      )}

      {quizState === 'first-30-days' && weeklyPatternAnswers && (
        <First30DaysScreen
          key="first-30-days"
          onContinue={() => {
            // Quiz complete
            console.log('Quiz completed!');
          }}
          onBack={() => {
            setQuizState('paywall');
          }}
          currentStep={progressSteps.current}
          totalSteps={progressSteps.total}
          frequency={weeklyPatternAnswers.frequency}
          portionSize={weeklyPatternAnswers.portion}
        />
      )}

      {quizState === 'weekly-feedback' && weeklyPatternAnswers && (
        <WeeklyFeedbackScreen
          key="weekly-feedback"
          onContinue={() => {
            setQuizState('quiz');
            setCurrentQuestionIndex(6);
            setSelectedOption(quizQuestions[6].isMultiSelect ? [] : null);
          }}
          onBack={() => {
            setQuizState('weekly-pattern');
          }}
          frequency={weeklyPatternAnswers.frequency}
          portionSize={weeklyPatternAnswers.portion}
          currentStep={progressSteps.current}
          totalSteps={progressSteps.total}
        />
      )}

      {quizState === 'intermediate' && (
        <IntermediateScreen
          key="intermediate"
          onContinue={() => {
            setQuizState('quiz');
            setCurrentQuestionIndex(3);
            setSelectedOption(quizQuestions[3].isMultiSelect ? [] : null);
          }}
          onBack={() => {
            setQuizState('quiz');
            setCurrentQuestionIndex(2);
            const prevAnswer = answers[quizQuestions[2].id];
            setSelectedOption(prevAnswer || (quizQuestions[2].isMultiSelect ? [] : null));
          }}
          currentStep={progressSteps.current}
          totalSteps={progressSteps.total}
        />
      )}

      {quizState === 'current-balance' && (
        <CurrentBalanceScreen
          key="current-balance"
          onContinue={() => {
            setQuizState('potential-balance');
          }}
          onBack={() => {
            setQuizState('goals');
          }}
          answers={answers}
        />
      )}

      {quizState === 'potential-balance' && (
        <PotentialBalanceScreen
          key="potential-balance"
          onContinue={() => {
            setQuizState('plan-built');
          }}
          onBack={() => {
            setQuizState('current-balance');
          }}
          answers={answers}
        />
      )}

      {/* Content Wrapper - 430px max width for quiz and form screens */}
      {!['welcome', 'greeting-loading', 'loading', 'analysis-complete', 'goals', 'plan-built', 'paywall', 'first-30-days', 'weekly-feedback', 'intermediate', 'current-balance', 'potential-balance'].includes(quizState) && (
        <div className="fixed inset-0 bg-[#f2f2f7] flex items-center justify-center">
          <div className="w-full max-w-[430px] h-full flex flex-col relative bg-[#f2f2f7]">
            {quizState === 'quiz' && (
              <>
                {/* Header */}
                <div className="bg-[#f2f2f7] sticky top-0 z-10">
                  {/* Progress Bar Section */}
                  <div className="h-[44px] relative flex items-center justify-center px-4">
                    <button
                      onClick={handleBack}
                      className="absolute left-4 bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center justify-center">
                      <ProgressBar
                        current={progressSteps.current}
                        total={progressSteps.total}
                      />
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                <div className="flex-1 pb-32 px-6">
                  {/* Question Headline */}
                  <div className="py-3">
                    <h1 className="text-[24px] font-semibold leading-[120%] tracking-[0.4px] text-black mb-4">
                      {getQuestionParts(currentQuestion.question, currentQuestion.id).main}{' '}
                      <span className="text-[#0a84ff]">
                        {getQuestionParts(currentQuestion.question, currentQuestion.id).highlight}
                      </span>
                    </h1>
                  </div>

                  <AnimatePresence mode="wait">
                    <QuizQuestion
                      key={currentQuestion.id}
                      question={currentQuestion.question}
                      options={currentQuestion.options}
                      selectedOption={selectedOption}
                      onSelectOption={handleSelectOption}
                      questionNumber={currentQuestionIndex + 1}
                      totalQuestions={quizQuestions.length}
                      isMultiSelect={currentQuestion.isMultiSelect}
                    />
                  </AnimatePresence>
                </div>

                {/* Bottom Button Section */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#f2f2f7] pb-2 pt-4 px-6 space-y-3">
                  {/* Support Text Card - appears above Next button */}
                  <AnimatePresence mode="wait">
                    {(() => {
                      const lastSelectedOption = getLastSelectedOption();
                      return lastSelectedOption ? (
                        <motion.div
                          key={lastSelectedOption.value}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="bg-white rounded-[24px] p-4">
                            <div className="flex flex-col gap-1">
                              {/* Title with checkmark */}
                              <p className="text-[16px] font-medium leading-[22px] tracking-[-0.43px] text-[#2cbc50]">
                                {getSupportTitle(lastSelectedOption.supportText)}
                              </p>
                              {/* Support text */}
                              <p className="text-[16px] font-normal leading-[22px] tracking-[-0.43px] text-black">
                                {lastSelectedOption.supportText}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null;
                    })()}
                  </AnimatePresence>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={!hasSelection()}
                    className={`w-full py-4 rounded-[20px] transition-colors text-[17px] font-medium leading-[22px] tracking-[-0.43px] ${
                      hasSelection()
                        ? 'bg-[#f14e58] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {quizState === 'weekly-pattern' && (
              <WeeklyPatternQuestion
                key="weekly-pattern"
                onContinue={() => {
                  setQuizState('weekly-feedback');
                }}
                onBack={() => {
                  setQuizState('quiz');
                  setCurrentQuestionIndex(5);
                  const prevAnswer = answers[quizQuestions[5].id];
                  setSelectedOption(prevAnswer || (quizQuestions[5].isMultiSelect ? [] : null));
                }}
                onAnswer={setWeeklyPatternAnswers}
                currentStep={progressSteps.current}
                totalSteps={progressSteps.total}
              />
            )}

            {quizState === 'age' && (
              <AgeScreen
                key="age"
                onContinue={(age) => {
                  setSelectedAge(age);
                  setQuizState('personal-info');
                }}
                onBack={() => {
                  setQuizState('quiz');
                  setCurrentQuestionIndex(quizQuestions.length - 1);
                  const prevAnswer = answers[quizQuestions[quizQuestions.length - 1].id];
                  setSelectedOption(prevAnswer || (quizQuestions[quizQuestions.length - 1].isMultiSelect ? [] : null));
                }}
                currentStep={progressSteps.current}
                totalSteps={progressSteps.total}
                initialAge={selectedAge || undefined}
              />
            )}

            {quizState === 'personal-info' && (
              <PersonalInfoScreen
                key="personal-info"
                onContinue={(data) => {
                  setPersonalInfo(data);
                  setQuizState('greeting-loading');
                }}
                onBack={() => {
                  setQuizState('age');
                }}
                currentStep={progressSteps.current}
                totalSteps={progressSteps.total}
                initialData={personalInfo || undefined}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}