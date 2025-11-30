'use client';

import { getBookDetails } from '@/service';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IBook } from '@/model/books';
import FavouritesContext from '@/app/(main)/Context/FavouriteContext';
import BookList from '../BookList';
import { BOOKS_NAVIGATION_LINKS } from '@/constants';

export default function FavouriteBooksList() {
  const { favourites } = useContext(FavouritesContext);
  const [loading, setLoading] = useState(true);

  const [favoriteBookList, setFavoriteBooksList] = useState<IBook[]>([]);
  const getAllFavouriteBooks = useCallback(async () => {
    setLoading(true);
    try {
      if (favoriteBookList.length === 0) {
        const booksList = await Promise.all(
          favourites.map((id) => getBookDetails(id))
        );
        setFavoriteBooksList(booksList);
      } else {
        setFavoriteBooksList((booksList) =>
          booksList.filter((book) => favourites.includes(book.id))
        );
      }
    } catch (error) {
      console.error('Error fetching favourite books:', error);
    } finally {
      setLoading(false);
    }
  }, [favourites, favoriteBookList.length]);

  useEffect(() => {
    getAllFavouriteBooks();
  }, [getAllFavouriteBooks]);

  return (
    <BookList
      name={BOOKS_NAVIGATION_LINKS.favourite}
      data={favoriteBookList}
      isLoading={loading}
    />
  );
}
