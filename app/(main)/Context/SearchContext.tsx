'use client';

import { useState, createContext } from 'react';

type ContextType = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext = {
  searchText: '',
  setSearchText: () => undefined,
  showResults: false,
  setShowResults: () => undefined,
};

const SearchContext = createContext<ContextType>(initialContext);

export function SearchContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText, showResults, setShowResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
