import { IBook, IBookResponse } from '@/model/books';

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
    const url = new URL(`https://www.googleapis.com/books/v1/volumes`);
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
    console.log('Fetching books from URL:', url.toString());
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getBookDetails = async (volumeId: string): Promise<IBook> => {
  try {
    const url = new URL(
      `https://www.googleapis.com/books/v1/volumes/${volumeId}`
    );
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
  } catch (error) {
    throw error;
  }
};
