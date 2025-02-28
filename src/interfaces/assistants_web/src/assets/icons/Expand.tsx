import * as React from 'react';
import { SVGProps } from 'react';

import { IconKind } from '@/components/UI';
import { cn } from '@/utils';

type Props = {
  kind?: IconKind;
} & SVGProps<SVGSVGElement>;

export const Expand: React.FC<Props> = ({ className, kind, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={cn('h-full w-full fill-inherit', className)}
    {...props}
  >
    {kind === 'default' ? (
      <>
        {/* Top-Left Arrow */}
        <path
          d="M3 6V3H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M7 7L3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Top-Right Arrow */}
        <path
          d="M13 6V3H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M9 7L12.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Bottom-Left Arrow */}
        <path
          d="M3 10V13H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M7 9L3.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Bottom-Right Arrow */}
        <path
          d="M13 10V13H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M9 9L12.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
      </>
    ) : (
      <>
        {/* Top-Left Arrow */}
        <path
          d="M3 6V3H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M7 7L3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Top-Right Arrow */}
        <path
          d="M13 6V3H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M9 7L12.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Bottom-Left Arrow */}
        <path
          d="M3 10V13H6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M7 9L3.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        
        {/* Bottom-Right Arrow */}
        <path
          d="M13 10V13H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M9 9L12.5 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          fill="none"
        />
      </>
    )}
  </svg>
);