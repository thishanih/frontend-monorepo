import * as React from 'react';

import { cn } from '../lib/utils';

const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty"
      className={cn(
        'flex w-full flex-col items-center justify-center gap-6 text-center',
        className,
      )}
      {...props}
    />
  ),
);
Empty.displayName = 'Empty';

const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
      {...props}
    />
  ),
);
EmptyHeader.displayName = 'EmptyHeader';

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'icon' }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    data-slot="empty-media"
    data-variant={variant}
    className={cn(
      'flex shrink-0 items-center justify-center',
      variant === 'default' && 'bg-slate-100 text-slate-600',
      variant === 'icon' && 'size-10 rounded-lg bg-slate-100 text-slate-600 [&>svg]:size-5',
      className,
    )}
    {...props}
  />
));
EmptyMedia.displayName = 'EmptyMedia';

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight text-slate-950', className)}
      {...props}
    />
  ),
);
EmptyTitle.displayName = 'EmptyTitle';

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="empty-description"
    className={cn('text-sm leading-6 text-slate-500', className)}
    {...props}
  />
));
EmptyDescription.displayName = 'EmptyDescription';

const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="empty-content"
      className={cn('flex items-center justify-center gap-2', className)}
      {...props}
    />
  ),
);
EmptyContent.displayName = 'EmptyContent';

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
