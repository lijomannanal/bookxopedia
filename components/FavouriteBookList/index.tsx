'use client';

import { getBookDetails } from '@/service';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IBook } from '@/model/books';
import FavouritesContext from '@/app/(main)/Context/FavouriteContext';
import BookList from '../BookList';
import { BOOKS_NAVIGATION_LINKS } from '@/constants';
import { ApiError } from '@/utils/error';

export default function FavouriteBooksList() {
  const { favourites } = useContext(FavouritesContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  if (error) {
    throw error;
  }

  const [favoriteBookList, setFavoriteBooksList] = useState<IBook[]>([]);
  const getAllFavouriteBooks = useCallback(async () => {
    if (favoriteBookList.length === 0) {
      setLoading(true);
      Promise.all(favourites.map((id) => getBookDetails(id)))
        .then((responses) => {
          setFavoriteBooksList(responses) as unknown as IBook[];
        })
        .catch((error) => {
          console.log('Error fetching favourite books:', error);
          setError(
            new ApiError('Failed to fetch favourite books', error.status || 500)
          );
        })

        .finally(() => setLoading(false));
    } else {
      setFavoriteBooksList((booksList) =>
        booksList.filter((book) => favourites.includes(book.id))
      );
    }
  }, [favourites, favoriteBookList.length]);

  useEffect(() => {
    getAllFavouriteBooks();
  }, [getAllFavouriteBooks]);

  return (
    !error && (
      <BookList
        name={BOOKS_NAVIGATION_LINKS.favourite}
        data={favoriteBookList}
        isLoading={loading}
      />
    )
  );
}
