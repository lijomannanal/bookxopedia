import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-400">404</h1>
      <h1 className="text-2xl font-medium py-8">Page not found</h1>
      <p className="text-sm lg:text-xl pb-8 px-4 lg:px-12 font-medium">
        The page you are looking for does not exist!
        deleted.
      </p>
      <Link href={`/`}>
        <Button className="text-secondary" variant={'outline'}>
          Go Home
        </Button>
      </Link>
    </div>
  );
}
