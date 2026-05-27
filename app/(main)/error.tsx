'use client'; // Error boundaries must be Client Components

import CustomError from '@/components/CustomError';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <CustomError onRetry={reset} message={error.message} />;
}
