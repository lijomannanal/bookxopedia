'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext } from 'react';

type ContextType = {
  favourites: string[];
  setFavourites: React.Dispatch<React.SetStateAction<string[]>>;
};

const initialContext = {
  favourites: [],
  setFavourites: () => undefined,
};

const FavouritesContext = createContext<ContextType>(initialContext);

export function FavouritesContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [favourites, setFavourites] = useLocalStorage<string[]>(
    'favourites',
    []
  );
  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
