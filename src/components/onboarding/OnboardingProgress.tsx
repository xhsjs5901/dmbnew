import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface OnboardingProgressProps {
  steps: Step[];
  currentStep: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  index < currentStep
                    ? 'bg-gradient-primary text-white'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                initial={false}
                animate={{
                  scale: index === currentStep ? 1.1 : 1,
                }}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <div className="mt-2 text-center hidden sm:block">
                <p className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-4 h-0.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary"
                  initial={{ width: '0%' }}
                  animate={{
                    width: index < currentStep ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OnboardingProgress;
