import { Heart } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function NoFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="relative mx-auto mb-8 flex items-center justify-center">
        <div className="absolute w-64 h-64 rounded-full bg-primary blur-2xl opacity-70" />

        <div className="relative flex items-end gap-3">
          <div className="w-12 h-32 bg-primary rounded-md rotate-[-12deg]" />
          <div className="w-12 h-40 bg-primary rounded-md" />
          <div className="w-12 h-36 bg-primary rounded-md relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-background rounded-sm" />
          </div>

          <div className="absolute -right-8 bottom-2">
            <div className="w-20 h-20 rounded-full border-4 border-dashed border-primary flex items-center justify-center bg-background shadow-sm">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-4">
        No favorite books yet
      </h2>
      <p className="text-md text-muted-foreground leading-relaxed mb-8">
        Tap the heart icon on any book to add it to your favorites
      </p>
      <Link href="/books">
        <Button className="text-base rounded-2xl shadow-lg">
          Explore Books
        </Button>
      </Link>
    </div>
  );
}
