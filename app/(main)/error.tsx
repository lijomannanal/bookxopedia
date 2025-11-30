'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  const goToHome = () => {
    router.push('/books');
  };

  return (
    <div className="bg-background flex-col  h-full flex items-center justify-center">
      <h1 className="text-4xl font-bold text-red-400 mb-6">
        Something went wrong!
      </h1>
      <p className="text-xl pb-8 px-12 font-medium">
        There is an unexpected error. No worries, you can try again.
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={reset}>
          Try Again
        </Button>
        <Button variant="outline" onClick={goToHome}>
          Go To Home
        </Button>
      </div>
    </div>
  );
}
