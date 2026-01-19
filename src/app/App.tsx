import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { WelcomeScreen } from '@/app/components/WelcomeScreen';
import { QuizQuestion } from '@/app/components/QuizQuestion';
import { ResultsScreen } from '@/app/components/ResultsScreen';
import { ProgressBar } from '@/app/components/ProgressBar';
import { ChevronLeft } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    supportText: string;
  }>;
  isMultiSelect: boolean;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What frustrates you most about your relationship with sugar?",
    isMultiSelect: true,
    options: [
      {
        text: "I don't understand how sugar affects my blood sugar",
        supportText: "You're not alone. Most people never see how the same sugar can affect them differently day to day."
      },
      {
        text: "I feel fine sometimes, but terrible other times — with no clear reason",
        supportText: "This inconsistency is often a sign of blood sugar spikes and crashes, not lack of discipline."
      },
      {
        text: "I try to eat 'normally', but still get energy crashes",
        supportText: "Even 'normal' foods can cause glucose instability depending on timing, portion, and pairing."
      },
      {
        text: "I don't know how much sugar is okay for me personally",
        supportText: "There is no universal limit. Your body has its own threshold — it just hasn't been mapped yet."
      }
    ]
  },
  {
    id: 2,
    question: "How do you feel when others around you eat sugary foods freely?",
    isMultiSelect: false,
    options: [
      {
        text: "Confused why their body seems to handle it better than mine",
        supportText: "People have very different glycemic responses — comparison rarely tells the full story."
      },
      {
        text: "Worried I'll crash later if I eat the same",
        supportText: "That anticipation often comes from past glucose crashes, not from the food itself."
      },
      {
        text: "Frustrated that food affects my energy so unpredictably",
        supportText: "Unpredictability usually means patterns exist — they just haven't been identified yet."
      },
      {
        text: "Confident when I understand my limits",
        supportText: "Awareness changes everything. Knowing your limits removes anxiety from food choices."
      }
    ]
  },
  {
    id: 3,
    question: "Which area of your life has been most affected by unstable blood sugar?",
    isMultiSelect: true,
    options: [
      {
        text: "My energy levels and focus",
        supportText: "Blood sugar dips are one of the most common causes of fatigue and brain fog."
      },
      {
        text: "My mood and emotional stability",
        supportText: "Rapid glucose changes can strongly influence irritability, anxiety, and mood swings."
      },
      {
        text: "My weight or body composition",
        supportText: "Frequent insulin spikes can promote fat storage even without overeating."
      },
      {
        text: "My relationship with food and eating",
        supportText: "Uncertainty around food often leads to over-restriction or reactive eating."
      }
    ]
  },
  {
    id: 4,
    question: "When do you most notice negative effects after eating?",
    isMultiSelect: true,
    options: [
      {
        text: "After meals that should be 'healthy'",
        supportText: "Even healthy foods can spike blood sugar if portions or combinations aren't right for you."
      },
      {
        text: "In the afternoon or early evening",
        supportText: "This is a classic window for delayed glucose crashes from earlier meals."
      },
      {
        text: "When I'm stressed or overwhelmed",
        supportText: "Stress raises blood sugar on its own, making food responses harder to predict."
      },
      {
        text: "During social events or eating out",
        supportText: "Unfamiliar foods and timing often amplify blood sugar variability."
      }
    ]
  },
  {
    id: 5,
    question: "What's the biggest consequence you've experienced from unstable blood sugar?",
    isMultiSelect: true,
    options: [
      {
        text: "Sudden energy crashes",
        supportText: "These often come from delayed glucose drops after meals."
      },
      {
        text: "Strong cravings that feel out of proportion",
        supportText: "Cravings are frequently a physiological response, not a lack of control."
      },
      {
        text: "Mood swings or irritability",
        supportText: "Blood sugar fluctuations can directly affect emotional regulation."
      },
      {
        text: "Planning my day around food and energy",
        supportText: "Unpredictability forces constant mental effort around eating."
      }
    ]
  },
  {
    id: 6,
    question: "How would you feel if your energy and cravings were predictable?",
    isMultiSelect: true,
    options: [
      {
        text: "Calm and in control",
        supportText: "Stability removes the constant background stress around food."
      },
      {
        text: "Confident in my food choices",
        supportText: "Confidence comes from understanding cause and effect."
      },
      {
        text: "Free from constant food calculations",
        supportText: "Less mental load means more space for life."
      },
      {
        text: "Focused and mentally clear",
        supportText: "Stable glucose supports sustained cognitive performance."
      }
    ]
  },
  {
    id: 7,
    question: "What would achieving blood sugar balance mean to you personally?",
    isMultiSelect: true,
    options: [
      {
        text: "Trusting my body again",
        supportText: "Trust is rebuilt when signals become consistent."
      },
      {
        text: "Eating without fear or guilt",
        supportText: "Food neutrality replaces restriction and anxiety."
      },
      {
        text: "Feeling consistent energy every day",
        supportText: "Energy stability compounds into better days overall."
      },
      {
        text: "Supporting long-term health",
        supportText: "Blood sugar balance is a cornerstone of metabolic health."
      }
    ]
  },
  {
    id: 8,
    question: "How do you typically handle social situations with sugary foods?",
    isMultiSelect: false,
    options: [
      {
        text: "I eat without knowing how I'll feel later",
        supportText: "Lack of predictability often creates post-event regret or crashes."
      },
      {
        text: "I avoid certain foods just in case",
        supportText: "Avoidance is common when feedback is missing."
      },
      {
        text: "I feel anxious and overthink my choices",
        supportText: "Uncertainty turns food into a cognitive burden."
      },
      {
        text: "I adjust portions and timing confidently",
        supportText: "Awareness allows flexibility without loss of control."
      }
    ]
  }
];

type QuizState = 'welcome' | 'quiz' | 'results';

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[] | string>>({});
  const [selectedOption, setSelectedOption] = useState<string[] | string | null>(null);

  const handleStart = () => {
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
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
      
    if (hasSelection) {
      setAnswers({
        ...answers,
        [quizQuestions[currentQuestionIndex].id]: selectedOption,
      });

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(quizQuestions[currentQuestionIndex + 1].isMultiSelect ? [] : null);
      } else {
        setQuizState('results');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevAnswer = answers[quizQuestions[currentQuestionIndex - 1].id];
      setSelectedOption(prevAnswer || (quizQuestions[currentQuestionIndex - 1].isMultiSelect ? [] : null));
    } else {
      setQuizState('welcome');
    }
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

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {quizState === 'quiz' && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {quizState === 'welcome' && <div />}
            {quizState === 'results' && <div />}
            
            <div className="text-sm text-gray-600">Blood Sugar Awareness Quiz</div>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>

          {quizState === 'quiz' && (
            <div className="mt-4">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={quizQuestions.length}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {quizState === 'welcome' && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}

          {quizState === 'quiz' && (
            <QuizQuestion
              key={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
            />
          )}

          {quizState === 'results' && (
            <ResultsScreen
              key="results"
              score={calculateScore()}
              totalQuestions={quizQuestions.length}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {quizState === 'quiz' && (
        <div className="bg-white border-t border-gray-200 sticky bottom-0">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={handleNext}
              disabled={!hasSelection()}
              className={`w-full py-4 rounded-full transition-colors ${
                hasSelection()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}