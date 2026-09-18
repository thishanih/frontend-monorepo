import type { ReactNode } from 'react';

import { CircleAlert } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';
import { RetryButton } from './retry-button';

type DataStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: 'default' | 'error';
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
};

export function DataState({
  title,
  description,
  icon,
  variant = 'default',
  onRetry,
  isRetrying = false,
  className,
}: DataStateProps): React.JSX.Element {
  const isError = variant === 'error';

  return (
    <Empty className={className} role={isError ? 'alert' : 'status'}>
      <EmptyHeader>
        <EmptyMedia variant="icon" aria-hidden="true">
          {icon ?? <CircleAlert />}
        </EmptyMedia>
        <EmptyTitle className={isError ? 'text-red-800' : undefined}>{title}</EmptyTitle>
        <EmptyDescription className={isError ? 'text-red-700' : undefined}>
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {onRetry ? (
        <EmptyContent>
          <RetryButton
            isLoading={isRetrying}
            onClick={onRetry}
            tone={isError ? 'danger' : 'brand'}
          />
        </EmptyContent>
      ) : null}
    </Empty>
  );
}