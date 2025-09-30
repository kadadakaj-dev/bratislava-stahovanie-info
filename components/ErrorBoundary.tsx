import React, { PropsWithChildren } from 'react';
import { analyticsService } from '../services/analyticsService';

interface ErrorBoundaryState { hasError: boolean; error?: Error }

interface ErrorBoundaryProps extends PropsWithChildren<any> {}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In future: send to monitoring service
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught error', error, info);
    }
    try {
      analyticsService.trackEvent('error_boundary', {
        message: error.message.substring(0, 200),
        component_stack: info.componentStack.substring(0, 500)
      });
    // eslint-disable-next-line no-empty
    } catch {}
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
