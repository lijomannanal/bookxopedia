import { Frown } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
type Props = {
  message: string;
  onRetry: () => void;
};

export default function CustomError({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <Frown className="w-25 h-25 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight mb-4">{message}</h2>
      <p className="text-md text-muted-foreground leading-relaxed mb-8">
        We couldn&apos;t load the page you are looking for. Please try again
        later.
      </p>
      <div className="flex gap-4">
        <Button onClick={onRetry} className="text-base rounded-2xl shadow-lg">
          Try again
        </Button>
        <Link href="/books">
          <Button
            variant={'outline'}
            className="text-base rounded-2xl shadow-lg"
          >
            Go To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
