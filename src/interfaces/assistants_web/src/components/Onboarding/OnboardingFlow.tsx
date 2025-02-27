'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NameStep } from './NameStep';
import { LanguageStep } from './LanguageStep';
import { useUserPreferences } from '@/stores';
import { LANGUAGE } from '@/constants/languages';
import { Logo } from '@/components/UI';
import { env } from '@/env.mjs';

enum OnboardingStep {
  NAME,
  LANGUAGE,
}

export const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const { setName: setStoredName, setLanguage: setStoredLanguage } = useUserPreferences();
  
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.NAME);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNameNext = (name: string) => {
    setStoredName(name);
    setCurrentStep(OnboardingStep.LANGUAGE);
  };

  const handleLanguageNext = (language: LANGUAGE) => {
    setStoredLanguage(language);
    setTimeout(() => {
      router.push('/a/new');
    }, 100);
  };

  const handleBack = () => {
    if (currentStep === OnboardingStep.LANGUAGE) {
      setCurrentStep(OnboardingStep.NAME);
    }
  };

  if (!isClient) {
    return <div className="min-h-screen bg-mushroom-900"></div>;
  }

  return (
    <div className="min-h-screen bg-mushroom-900 dark:bg-volcanic-100">
      {/* Badge */}
      <div className="absolute top-6 left-6 bg-[#e6f7e6] text-[#4d724d] dark:bg-evolved-green-700 dark:text-evolved-green-100 px-2 py-1 rounded text-xs">
        Onboarding
      </div>
      
      {/* Content Container */}
      <div className="pt-40">
        <div className="max-w-[500px] mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="transform scale-150">
              <Logo
                hasCustomLogo={env.NEXT_PUBLIC_HAS_CUSTOM_LOGO}
                includeBrandName={true}
                className="text-gray-700 dark:text-mushroom-950"
              />
            </div>
          </div>
          
          {/* Step Indicator */}
          <div className="flex justify-center space-x-6 mt-1 w-24 mx-auto mb-16">
            <div className={`w-20 h-1.5 rounded-full ${currentStep === OnboardingStep.NAME ? 'bg-[#f97966] dark:bg-evolved-green-500' : 'bg-gray-300 dark:bg-volcanic-200'}`}></div>
            <div className={`w-20 h-1.5 rounded-full ${currentStep === OnboardingStep.LANGUAGE ? 'bg-[#f97966] dark:bg-evolved-green-500' : 'bg-gray-300 dark:bg-volcanic-200'}`}></div>
          </div>

          {/* Steps */}
          {currentStep === OnboardingStep.NAME && (
            <NameStep onNext={handleNameNext} initialName={''} />
          )}
          {currentStep === OnboardingStep.LANGUAGE && (
            <LanguageStep 
              onNext={handleLanguageNext} 
              onBack={handleBack}
              initialLanguage={null} 
            />
          )}
        </div>
      </div>
    </div>
  );
}; 