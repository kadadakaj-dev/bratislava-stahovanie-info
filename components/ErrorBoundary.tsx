import React from 'react';

interface ErrorBoundaryState { hasError: boolean; error?: Error }

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  readonly props: ErrorBoundaryProps;

  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In future: send to monitoring service
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error', error, info);
    }
    // Analytics removed
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} />;
      }
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
