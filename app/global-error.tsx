'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function GlobalError({
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

  return (
    <html>
      <body>
        <div className="bg-background h-full flex items-center justify-center">
          <div className="h-[60%]w-9/12 m-auto py-16">
            <div className="bg-background shadow overflow-hidden sm:rounded-lg pb-8">
              <div className="border-t border-gray-200 text-center pt-8">
                <h1 className="text-4xl font-bold text-red-400 mb-6">
                  Something went wrong!
                </h1>
                <p className="text-xl pb-8 px-12 font-medium">
                  There is an unexpected error. No worries, you can try again.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => reset()}>
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = '/')}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
