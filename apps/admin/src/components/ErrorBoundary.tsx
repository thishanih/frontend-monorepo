import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '@my-monorepo/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-neutral-50 px-6">
        <section className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <TriangleAlert size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-neutral-900">Something went wrong</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            We could not load this page. Please try again.
          </p>
          <Button className="mt-6" tone="brand" onClick={this.handleRetry}>
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </Button>
        </section>
      </main>
    );
  }
}
