import { ApiError } from '@/utils/error';
import { IBook, IBookResponse } from '@/model/books';
import { GOOGLE_BOOKS_API_BASE_URL } from '@/constants';

type BooksFilter = {
  q?: string;
  printType?: string;
  orderBy?: string;
  maxResults?: number;
  filter?: string;
};

export const getBooksList = async (
  searchParams?: BooksFilter | undefined
): Promise<IBookResponse> => {
  try {
    const url = new URL(GOOGLE_BOOKS_API_BASE_URL);
    const queryTerm = !searchParams?.q
      ? searchParams?.orderBy === 'newest'
        ? 'B'
        : 'C'
      : searchParams?.q;
    const params: Record<string, string> = {
      q: queryTerm,
      printType: searchParams?.printType ?? 'books',
      startIndex: '0',
      maxResults: (searchParams?.maxResults ?? 40).toString(),
      orderBy: searchParams?.orderBy ?? 'relevance',
    };

    if (!params.q.includes('subject:')) {
      params['filter'] = searchParams?.filter ?? 'partial';
    }
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(
      `${url}&key=${process.env.NEXT_PUBLIC_BOOKS_API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Rate limit exceeded', 429);
      } else {
        throw new ApiError('Failed to fetch data', response.status);
      }
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (volumeId: string): Promise<IBook> => {
  try {
    const url = new URL(`${GOOGLE_BOOKS_API_BASE_URL}/${volumeId}`);
    const response = await fetch(
      `${url}?key=${process.env.NEXT_PUBLIC_BOOKS_API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Rate limit exceeded', 429);
      } else {
        throw new ApiError('Failed to fetch data', response.status);
      }
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
