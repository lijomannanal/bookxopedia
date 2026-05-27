'use client'; // Error boundaries must be Client Components

import CustomError from '@/components/CustomError';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <CustomError onRetry={reset} message={error.message} />
      </body>
    </html>
  );
}
