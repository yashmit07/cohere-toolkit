'use client';

import { cn } from '@/utils';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Box: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div
      className={cn(
        'rounded-lg border p-6',
        'dark:border-volcanic-300 dark:bg-volcanic-150',
        'border-volcanic-700 bg-marble-980',
        className
      )}
    >
      {children}
    </div>
  );
}; 