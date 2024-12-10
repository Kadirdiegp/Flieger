import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Warenkorb' },
  { id: 2, name: 'Versand' },
  { id: 3, name: 'Zahlung' },
  { id: 4, name: 'Bestätigung' },
];

export const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
              'relative'
            )}
          >
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-white" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Check className="h-5 w-5 text-black" aria-hidden="true" />
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-neutral-800" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black">
                  <span className="text-white">{step.id}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-neutral-800" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-800 bg-black">
                  <span className="text-neutral-500">{step.id}</span>
                </div>
              </>
            )}
            <span className="absolute -bottom-6 start-0 w-max text-sm font-medium text-white">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};