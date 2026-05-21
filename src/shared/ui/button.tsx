'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';
import { haptic } from '@/shared/lib/telegram';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-all active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        accent: 'bg-accent text-accent-foreground shadow-md shadow-accent/30',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-11 w-11',
        block: 'h-14 w-full px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { hapticType?: 'light' | 'medium' | 'heavy' | null };

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, hapticType = 'light', onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={(e) => {
          if (hapticType) haptic[hapticType]();
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
