'use client';

import React from 'react';
import { Box, Button, Input, Text } from '@/components/UI';

interface NameStepProps {
  onNext: (name: string) => void;
  initialName: string;
  nextLabel?: string;
}

const TEXT_STYLES = {
  heading: "text-4xl font-bold text-gray-700 dark:text-mushroom-950",
  subtext: "text-gray-500 dark:text-mushroom-600 mb-8"
} as const;

export const NameStep: React.FC<NameStepProps> = ({ 
  onNext, 
  initialName,
  nextLabel = "Continue" 
}) => {
  const [name, setName] = React.useState(initialName);

  return (
    <Box className="text-center">
      <Text styleAs="h3" className={`${TEXT_STYLES.heading} mb-1`}>
        What should
      </Text>
      <Text styleAs="h3" className={`${TEXT_STYLES.heading} mb-8`}>
        we call you?
      </Text>
      <Text className={TEXT_STYLES.subtext}>
        Let's get to know each other
      </Text>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="text-center"
      />

      <div className="flex justify-end mt-6">
        <Button
          label={nextLabel}
          onClick={() => name.trim() && onNext(name.trim())}
          kind="primary"
          theme="default"
          className="rounded-full pr-4 !text-white"
          disabled={!name.trim()}
        />
      </div>
    </Box>
  );
}; 