import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionnaireData } from '@/pages/Onboarding';

interface QuestionnaireStepProps {
  data: QuestionnaireData;
  setData: (data: QuestionnaireData) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

interface Question {
  id: keyof QuestionnaireData;
  category: string;
  question: string;
  type: 'single' | 'multiple';
  options: { value: string; label: string; emoji: string }[];
}

const QUESTIONS: Question[] = [
  // Values & Faith (1-4)
  {
    id: 'religiousPractice',
    category: 'Values & Faith',
    question: 'How important is religious/spiritual practice in your daily life?',
    type: 'single',
    options: [
      { value: 'very_religious', label: 'Very Religious', emoji: '🙏' },
      { value: 'moderately_religious', label: 'Moderately Religious', emoji: '⛪' },
      { value: 'spiritual', label: 'Spiritual but not religious', emoji: '✨' },
      { value: 'not_religious', label: 'Not particularly religious', emoji: '🌍' },
    ],
  },
  {
    id: 'familyImportance',
    category: 'Values & Faith',
    question: 'How important is family involvement in major life decisions?',
    type: 'single',
    options: [
      { value: 'extremely_important', label: 'Extremely Important', emoji: '👨‍👩‍👧‍👦' },
      { value: 'very_important', label: 'Very Important', emoji: '👪' },
      { value: 'somewhat_important', label: 'Somewhat Important', emoji: '🏠' },
      { value: 'not_important', label: 'Prefer independence', emoji: '🦋' },
    ],
  },
  {
    id: 'traditionalValues',
    category: 'Values & Faith',
    question: 'How would you describe your approach to traditions and customs?',
    type: 'single',
    options: [
      { value: 'very_traditional', label: 'Very Traditional', emoji: '🪔' },
      { value: 'blend', label: 'Blend of Traditional & Modern', emoji: '⚖️' },
      { value: 'modern', label: 'Mostly Modern', emoji: '🚀' },
      { value: 'very_modern', label: 'Very Progressive', emoji: '🌈' },
    ],
  },
  {
    id: 'lifePriorities',
    category: 'Values & Faith',
    question: 'What are your top priorities in life? (Select up to 3)',
    type: 'multiple',
    options: [
      { value: 'career', label: 'Career Success', emoji: '💼' },
      { value: 'family', label: 'Family & Children', emoji: '👨‍👩‍👧' },
      { value: 'travel', label: 'Travel & Adventure', emoji: '✈️' },
      { value: 'spirituality', label: 'Spiritual Growth', emoji: '🧘' },
      { value: 'wealth', label: 'Financial Security', emoji: '💰' },
      { value: 'health', label: 'Health & Wellness', emoji: '💪' },
    ],
  },
  // Lifestyle & Habits (5-8)
  {
    id: 'workLifeBalance',
    category: 'Lifestyle & Habits',
    question: 'How do you approach work-life balance?',
    type: 'single',
    options: [
      { value: 'work_focused', label: 'Career-focused, work comes first', emoji: '📊' },
      { value: 'balanced', label: 'Strive for equal balance', emoji: '⚖️' },
      { value: 'life_focused', label: 'Personal life is priority', emoji: '🏖️' },
    ],
  },
  {
    id: 'socialNature',
    category: 'Lifestyle & Habits',
    question: 'How would you describe your social personality?',
    type: 'single',
    options: [
      { value: 'very_social', label: 'Very Social & Outgoing', emoji: '🎉' },
      { value: 'moderately_social', label: 'Enjoy socializing in moderation', emoji: '😊' },
      { value: 'homebody', label: 'Prefer quiet evenings at home', emoji: '🏠' },
      { value: 'selective', label: 'Selective with close friends only', emoji: '👯' },
    ],
  },
  {
    id: 'healthFitness',
    category: 'Lifestyle & Habits',
    question: 'How active is your lifestyle?',
    type: 'single',
    options: [
      { value: 'very_active', label: 'Very Active (daily exercise)', emoji: '🏃' },
      { value: 'moderately_active', label: 'Moderately Active (few times a week)', emoji: '🚴' },
      { value: 'occasionally_active', label: 'Occasionally Active', emoji: '🚶' },
      { value: 'not_active', label: 'Not very active', emoji: '🛋️' },
    ],
  },
  {
    id: 'dietaryPreferences',
    category: 'Lifestyle & Habits',
    question: 'What are your dietary preferences?',
    type: 'single',
    options: [
      { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
      { value: 'non_vegetarian', label: 'Non-Vegetarian', emoji: '🍖' },
      { value: 'vegan', label: 'Vegan', emoji: '🌱' },
      { value: 'no_preference', label: 'No strong preference', emoji: '🍽️' },
    ],
  },
  // Career & Ambitions (9-11)
  {
    id: 'careerAmbition',
    category: 'Career & Ambitions',
    question: 'How would you describe your career ambitions?',
    type: 'single',
    options: [
      { value: 'highly_ambitious', label: 'Highly ambitious, aiming for the top', emoji: '🚀' },
      { value: 'moderately_ambitious', label: 'Ambitious but with balance', emoji: '📈' },
      { value: 'content', label: 'Content with current position', emoji: '😌' },
      { value: 'flexible', label: 'Flexible, open to change', emoji: '🔄' },
    ],
  },
  {
    id: 'relocationWillingness',
    category: 'Career & Ambitions',
    question: 'How willing are you to relocate for career or relationship?',
    type: 'single',
    options: [
      { value: 'very_willing', label: 'Very willing to relocate', emoji: '🌍' },
      { value: 'somewhat_willing', label: 'Open to discussion', emoji: '🤔' },
      { value: 'prefer_not', label: 'Prefer to stay in current city', emoji: '🏙️' },
      { value: 'not_willing', label: 'Cannot relocate', emoji: '📍' },
    ],
  },
  {
    id: 'financialGoals',
    category: 'Career & Ambitions',
    question: 'What\'s your approach to finances?',
    type: 'single',
    options: [
      { value: 'aggressive_saving', label: 'Save aggressively for future', emoji: '🏦' },
      { value: 'balanced', label: 'Balance saving and spending', emoji: '⚖️' },
      { value: 'enjoy_now', label: 'Enjoy life now, save moderately', emoji: '🎈' },
      { value: 'flexible', label: 'Flexible, depends on situation', emoji: '🔄' },
    ],
  },
  // Personality Traits (12-15)
  {
    id: 'communicationStyle',
    category: 'Personality Traits',
    question: 'How would you describe your communication style?',
    type: 'single',
    options: [
      { value: 'direct', label: 'Direct and straightforward', emoji: '🎯' },
      { value: 'diplomatic', label: 'Diplomatic and tactful', emoji: '🕊️' },
      { value: 'listener', label: 'More of a listener', emoji: '👂' },
      { value: 'expressive', label: 'Very expressive and open', emoji: '💬' },
    ],
  },
  {
    id: 'conflictResolution',
    category: 'Personality Traits',
    question: 'How do you handle disagreements?',
    type: 'single',
    options: [
      { value: 'discuss_immediately', label: 'Discuss immediately', emoji: '🗣️' },
      { value: 'take_time', label: 'Take time to cool down first', emoji: '⏰' },
      { value: 'avoid', label: 'Tend to avoid conflict', emoji: '🙈' },
      { value: 'compromise', label: 'Quick to compromise', emoji: '🤝' },
    ],
  },
  {
    id: 'adventureLevel',
    category: 'Personality Traits',
    question: 'How adventurous are you?',
    type: 'single',
    options: [
      { value: 'very_adventurous', label: 'Love trying new things', emoji: '🎢' },
      { value: 'moderately_adventurous', label: 'Open to occasional adventures', emoji: '🌄' },
      { value: 'prefer_routine', label: 'Prefer familiar routines', emoji: '📅' },
      { value: 'homebody', label: 'Definitely a homebody', emoji: '🏡' },
    ],
  },
  {
    id: 'decisionMaking',
    category: 'Personality Traits',
    question: 'How do you make important decisions?',
    type: 'single',
    options: [
      { value: 'logical', label: 'Logic and analysis', emoji: '🧠' },
      { value: 'emotional', label: 'Heart and feelings', emoji: '❤️' },
      { value: 'intuitive', label: 'Gut instinct', emoji: '✨' },
      { value: 'collaborative', label: 'Consult with others', emoji: '👥' },
    ],
  },
];

const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  data,
  setData,
  onSubmit,
  onBack,
  loading,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    if (question.type === 'multiple') {
      const currentValues = data[question.id] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : currentValues.length < 3
        ? [...currentValues, value]
        : currentValues;
      setData({ ...data, [question.id]: newValues });
    } else {
      setData({ ...data, [question.id]: value });
      // Auto-advance for single select
      if (currentQuestion < QUESTIONS.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      }
    }
  };

  const currentValue = data[question.id];
  const isSelected = (value: string) => {
    if (question.type === 'multiple') {
      return (currentValue as string[]).includes(value);
    }
    return currentValue === value;
  };

  const canProceed = question.type === 'multiple'
    ? (currentValue as string[]).length > 0
    : currentValue !== '';

  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

  return (
    <div className="glass-card p-8 rounded-3xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{question.category}</span>
          <span>{currentQuestion + 1} of {QUESTIONS.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-display font-bold mb-2">{question.question}</h2>
          {question.type === 'multiple' && (
            <p className="text-sm text-muted-foreground mb-6">Select up to 3 options</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`p-4 rounded-xl text-left transition-all border-2 ${
                  isSelected(option.value)
                    ? 'border-primary bg-primary/10 shadow-glow'
                    : 'border-border hover:border-primary/50 bg-card hover:bg-accent/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : onBack()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {currentQuestion > 0 ? 'Previous' : 'Back to Profile'}
        </Button>

        {question.type === 'multiple' || isLastQuestion ? (
          <Button
            onClick={() => isLastQuestion ? onSubmit() : setCurrentQuestion(currentQuestion + 1)}
            disabled={!canProceed || (isLastQuestion && loading)}
            className="btn-primary gap-2"
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            ) : isLastQuestion ? (
              <>
                <Sparkles className="w-4 h-4" />
                Complete
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionnaireStep;
