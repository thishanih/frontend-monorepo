import * as React from 'react';

import { cn } from '../lib/utils';

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & {
  error?: boolean;
  size?: 'sm' | 'default' | 'lg';
};

export function Input({
  className,
  type,
  error = false,
  size = 'default',
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      aria-invalid={ariaInvalid ?? (error || undefined)}
      className={cn(
        'shadow-xs focus-border-2 flex w-full rounded-md border bg-white px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-2 focus-visible:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'h-9 py-1.5',
        size === 'default' && 'h-10 py-2',
        size === 'lg' && 'h-11 py-2.5',
        error ? 'border-red-500 focus-visible:border-red-600' : 'border-neutral-300',
        className,
      )}
      {...props}
    />
  );
}
