import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Section 5.4 / 5.5 — 2px radius, 120ms hover, buttons darken.
 * No growing shadows. Amber never appears here (Section 5.2): a button is not
 * a policy moment.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-button font-sans font-medium transition-colors duration-120 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper hover:bg-paper-dark',
        secondary: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/5',
        ghost: 'bg-transparent text-ink underline decoration-rule underline-offset-4 hover:decoration-ink',
      },
      size: {
        sm: 'h-9 px-3 text-caption',
        md: 'h-11 px-5 text-body',
        lg: 'h-13 px-6 text-body-l',
      },
      inverted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'primary', inverted: true, className: 'bg-paper text-ink hover:bg-rule' },
      {
        variant: 'secondary',
        inverted: true,
        className: 'border-paper/35 text-paper hover:border-paper hover:bg-paper/10',
      },
      {
        variant: 'ghost',
        inverted: true,
        className: 'text-paper decoration-paper/40 hover:decoration-paper',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'md', inverted: false },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, inverted, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, inverted }), className)}
      {...props}
    />
  );
});

export { buttonVariants };
