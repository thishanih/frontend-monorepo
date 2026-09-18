import { RefreshCw } from 'lucide-react';

import { Button, type ButtonProps } from './button';

type RetryButtonProps = Omit<ButtonProps, 'children'> & {
  isLoading?: boolean;
  label?: string;
  loadingLabel?: string;
};

export function RetryButton({
  isLoading = false,
  label = 'Try again',
  loadingLabel = 'Retrying...',
  disabled,
  ...props
}: RetryButtonProps): React.JSX.Element {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      <RefreshCw aria-hidden="true" className={isLoading ? 'animate-spin' : undefined} size={16} />
      {isLoading ? loadingLabel : label}
    </Button>
  );
}
