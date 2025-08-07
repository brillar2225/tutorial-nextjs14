"use client";

import { Component, createRef, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * MEMO:
 * 아래와 같은 error boundary 컴포넌트를 통해서 부분적으로 에러를 처리할 수 있음.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#graceful-error-recovery-with-a-custom-error-boundary
 * @see https://ko.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
*/
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private contentRef: React.RefObject<HTMLDivElement>

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.contentRef = createRef()

  }

  static getDerivedStateFromError(error: ErrorBoundaryState) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}