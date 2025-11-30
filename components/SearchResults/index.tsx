'use client';
import { getBooksList } from '@/service';
import { IBookResponse } from '@/model/books';
import { useCallback, useContext, useEffect, useState } from 'react';
import SearchContext from '@/app/(main)/Context/SearchContext';
import { APIError, APIErros } from '@/model/common';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import SectionTitle from '../SectionTitle';
import Book from '../Book';
import NoResultFound from '../NoResultFound';
import Loader from '../Loader';

const SearchResults = () => {
  const { searchText, setSearchText, showResults, setShowResults } =
    useContext(SearchContext);
  const [searchResults, setSearchResults] = useState<IBookResponse>();
  const [errorCode, setErrorCode] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowResults(searchText !== '');
  }, [searchText, setShowResults]);

  const queryBooks = useCallback(() => {
    return getBooksList({ q: searchText, maxResults: 40 });
  }, [searchText]);

  const closeSearch = () => {
    setShowResults(false);
    setSearchText('');
  };

  useEffect(() => {
    (async () => {
      if (searchText) {
        try {
          setLoading(true);
          const results = await queryBooks();
          setSearchResults(results);
          setErrorCode(undefined);
        } catch (error) {
          if (error instanceof Error) {
            const errorBody = JSON.parse(error.message) as APIError;
            setErrorCode(errorBody.error.status);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults(undefined);
      }
    })();
  }, [queryBooks, searchText]);

  if (!showResults) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-[995] flex items-center justify-center">
      <div className="fixed shadow-lg h-[98vh] w-[100vw] lg:w-[calc(100vw-200px)] h-[calc(100vh-70px)] bg-gray-50 dark:bg-boxdark-2 top-[56px] left-0 lg:left-[200px] pl-4 pr-0 mt-3 z-995">
        <div className="pt-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSearch}
            className="absolute text-xl top-[4px] right-2 [&_svg]:size-8"
          >
            <X className="w-50 h-50" />
          </Button>
          <SectionTitle>
            Search results for &quot;{searchText}&quot;
          </SectionTitle>
          <div className="pr-0">
            {loading ? (
              <div className="flex justify-center w-full">
                <Loader caption="Working on your search..." />
              </div>
            ) : (
              <>
                <div className="h-auto max-h-[calc(100vh-135px)] overflow-auto">
                  <div className="flex flex-col md:flex-row sm:flex-col items-center sm:items-start flex-wrap gap-6">
                    {(searchResults?.items ?? []).map((book) => {
                      return <Book key={book.id} {...book} />;
                    })}
                  </div>
                </div>
                {searchResults?.totalItems === 0 && (
                  <div className="text-md text-black">
                    <NoResultFound
                      caption={`We can't find any results found for "${searchText}".`}
                    />
                  </div>
                )}
                {errorCode === APIErros.RESOURCE_EXHAUSTED && (
                  <div className="text-md text-black">
                    Limit exceeded. Please try again later!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
