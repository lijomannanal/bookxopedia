'use client';

import Header from '@/components/Header/index';
import Sidebar from '@/components/Sidebar/index';
import { useState } from 'react';
import { SearchContextProvider } from './Context/SearchContext';
import SearchResults from '@/components/SearchResults';
import { FavouritesContextProvider } from './Context/FavouriteContext';
import { GenreResponse } from '@/model/genre';
import { ThemeProvider } from 'next-themes';

export default function Provider({
  children,
  topGenres,
}: Readonly<{
  children: React.ReactNode;
  topGenres: GenreResponse[];
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SearchContextProvider>
        <FavouritesContextProvider>
          <div className="flex flex-wrap h-screen overflow-hidden bg-gray-50 dark:bg-boxdark-2">
            <Sidebar
              topGenres={topGenres}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <SearchResults />
              <main className="relative z-1">
                <div className="p-3 md:px-4 py-4 h-[calc(100vh-65px)] overflow-y-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </FavouritesContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  );
}
