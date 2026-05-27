import { Button } from '@/components/ui/button';
import {TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <TriangleAlert className="w-25 h-25 text-primary" />
      <h1 className="text-3xl font-bold">404</h1>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Page Not Found</h2>
      <p className="text-md text-muted-foreground leading-relaxed mb-8">
        The page you are looking for does not exist!
      </p>
      <div className="flex gap-4">
        <Link href="/books">
          <Button
            className="text-base rounded-2xl shadow-lg"
          >
            Go To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
