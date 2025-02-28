import * as React from 'react';
import { SVGProps } from 'react';

import { IconKind } from '@/components/UI';
import { cn } from '@/utils';

type Props = {
  kind?: IconKind;
} & SVGProps<SVGSVGElement>;

export const Simplify: React.FC<Props> = ({ className, kind, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className={cn('h-full w-full', className)}
    {...props}
  >
    {kind === 'default' ? (
      <>
        {/* Top line (longest) */}
        <rect
          x="3"
          y="4"
          width="10"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
        
        {/* Middle line (medium) */}
        <rect
          x="4.5"
          y="7.25"
          width="7"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
        
        {/* Bottom line (shortest) */}
        <rect
          x="6"
          y="10.5"
          width="4"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
      </>
    ) : (
      <>
        {/* Top line (longest) */}
        <rect
          x="2.5"
          y="3.5"
          width="12"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
        
        {/* Middle line (medium) */}
        <rect
          x="5"
          y="7.5"
          width="7"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
        
        {/* Bottom line (shortest) */}
        <rect
          x="7"
          y="11.5"
          width="3"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
      </>
    )}
  </svg>
);