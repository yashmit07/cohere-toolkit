'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import { cn } from '@/utils';

type Theme = 'default' | 'success' | 'error' | 'warning' | 'info' | 'coral';

type Props = {
  children: React.ReactNode;
  show: boolean;
  onHide: () => void;
  duration?: number;
  theme?: Theme;
  className?: string;
};

const THEME_STYLES: Record<Theme, string> = {
  default: 'fill-coral-700 bg-coral-700 dark:text-volcanic-150 group-hover:bg-coral-600 dark:bg-evolved-green-700 dark:group-hover:bg-evolved-green-500',
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  coral: 'bg-[#FF7F6E] text-white'
};

export const Notification: React.FC<Props> = ({
  children,
  show,
  onHide,
  duration = 3000,
  theme = 'default',
  className,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className={cn(
        'text-sm py-0 pl-3 pr-1 rounded shadow-sm flex items-center justify-between gap-3',
        THEME_STYLES[theme],
        className
      )}>
        {children}
        <Button
          onClick={onHide}
          kind="primary"
          theme="default"
          icon="close"
          className="!p-1 !min-w-0"
        />
      </div>
    </div>
  );
}; 