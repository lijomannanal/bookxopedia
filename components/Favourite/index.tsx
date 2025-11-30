'use client';

import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import FavouritesContext from '@/app/(main)/Context/FavouriteContext';

type Props = {
  bookId: string;
};
export default function Favourite({ bookId }: Props) {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isFavorite = favourites.includes(bookId);
  const toggleFavourite = () => {
    if (isFavorite) {
      setFavourites((prev) => prev.filter((id) => id !== bookId));
    } else {
      setFavourites((prev) => [...prev, bookId]);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Button
      onClick={toggleFavourite}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className="absolute top-[-9px] right-[-11px]"
      variant="link"
    >
      <Heart
        className={`w-5 h-5 text-gray-400`}
        style={{ fill: isFavorite ? 'red' : 'none' }}
        strokeWidth={isFavorite ? 0 : 1.5}
      />
    </Button>
  );
}
