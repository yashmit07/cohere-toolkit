'use client';

import React from 'react';
import { Box, Button, Dropdown, Text } from '@/components/UI';
import { LANGUAGE, SUPPORTED_LANGUAGES } from '@/constants';

interface LanguageStepProps {
  onNext: (language: LANGUAGE) => void;
  onBack: () => void;
  initialLanguage: LANGUAGE | null;
  backLabel?: string;  
  nextLabel?: string;  
}

const TEXT_STYLES = {
  heading: "text-4xl font-bold text-gray-700 dark:text-mushroom-950",
  subtext: "text-gray-500 dark:text-mushroom-600 mb-8"
} as const;

const getLanguageOptions = (languages: LANGUAGE[]) => 
  languages.map(lang => ({
    value: lang.code,
    label: `${lang.flag} ${lang.name} (${lang.nativeName})`
  }));

export const LanguageStep: React.FC<LanguageStepProps> = ({ 
  onNext, 
  onBack, 
  initialLanguage,
  backLabel = "Back",
  nextLabel = "Get Started"
}) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<LANGUAGE | null>(initialLanguage);

  const handleLanguageChange = (value: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === value);
    if (lang) setSelectedLanguage(lang);
  };

  return (
    <Box className="text-center relative z-10">
      <Text styleAs="h3" className={`${TEXT_STYLES.heading} mb-1`}>
        How would you
      </Text>
      <Text styleAs="h3" className={`${TEXT_STYLES.heading} mb-8`}>
        like to chat?
      </Text>
      <Text className={TEXT_STYLES.subtext}>
        Choose a language
      </Text>

      <Dropdown
        value={selectedLanguage?.code}
        onChange={handleLanguageChange}
        options={getLanguageOptions(SUPPORTED_LANGUAGES)}
        placeholder="Select a language"
      />

      <div className="flex justify-between mt-7">
        <Button
          label={backLabel}
          onClick={onBack}
          kind="secondary"
          theme="default"
          className="pl-4"
        />
        <Button
          label={nextLabel}
          onClick={() => selectedLanguage && onNext(selectedLanguage)}
          kind="primary"
          theme="default"
          className="rounded-full pr-4 !text-white"
          disabled={!selectedLanguage}
        />
      </div>
    </Box>
  );
}; 