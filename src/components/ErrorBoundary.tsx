import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log error to monitoring service if needed
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 z-[9999]">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-700 mb-2">An unexpected error occurred. Please try refreshing the page.</p>
          <pre className="bg-red-50 text-red-800 p-4 rounded-xl max-w-lg overflow-x-auto text-xs mb-4">
            {this.state.error?.message}
          </pre>
          <button className="btn-primary" onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
