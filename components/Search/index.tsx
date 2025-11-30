'use client';

import { useContext, useDeferredValue } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import SearchContext from '@/app/(main)/Context/SearchContext';
import { Button } from '../ui/button';

const Search = () => {
  const { searchText, setSearchText, showResults, setShowResults } =
    useContext(SearchContext);

  const searchTerm = useDeferredValue(searchText);

  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center w-full">
        <div className="w-[220px] lg:w-[350px] relative bg-gray-50 dark:bg-boxdark">
          <Input
            type="text"
            placeholder="Search books by title / author / genre"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:text-[16px] focus-visible:outline-none pl-10 text-black dark:text-white shadow-none py-0 text-ellipsis"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon size={18} />
          </span>
        </div>
        <div>
          {!showResults && searchTerm !== '' && (
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => setShowResults(true)}
            >
              Search Results
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
