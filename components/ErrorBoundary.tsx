import React, { PropsWithChildren } from 'react';

interface ErrorBoundaryState { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<PropsWithChildren<unknown>, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In future: send to monitoring service
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center space-y-4" role="alert">
          <h1 className="text-2xl font-bold">Niečo sa pokazilo</h1>
          <p className="text-text-muted">Skúste obnoviť stránku alebo sa vrátiť neskôr.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
