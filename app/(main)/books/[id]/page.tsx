import BookInfo from '@/components/BookInfo';
import BookList from '@/components/BookList';
import { BOOKS_NAVIGATION_LINKS } from '@/constants';
import { IBookResponse } from '@/model/books';
import { getBooksList } from '@/service';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string | keyof typeof BOOKS_NAVIGATION_LINKS;
  };
};

export function generateStaticParams() {
  return [
    { id: BOOKS_NAVIGATION_LINKS.latest },
    { id: BOOKS_NAVIGATION_LINKS.popular },
    { id: BOOKS_NAVIGATION_LINKS.ebooks },
  ];
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const headersList = headers();
  const currentUrl = headersList.get('x-original-url') || '';

  try {
    const bookNavigationLinks = Object.keys(BOOKS_NAVIGATION_LINKS);
    if (!bookNavigationLinks.includes(id)) {
      return <BookInfo id={id} />;
    } else {
      let books = null as IBookResponse | null;
      const navigationId = id as BOOKS_NAVIGATION_LINKS;
      switch (navigationId) {
        case BOOKS_NAVIGATION_LINKS.popular:
          books = await getBooksList({ q: 'subject:romance', maxResults: 40 });
          break;
        case BOOKS_NAVIGATION_LINKS.latest:
          books = await getBooksList({ orderBy: 'newest', maxResults: 40 });
          break;
        case BOOKS_NAVIGATION_LINKS.ebooks:
          books = await getBooksList({ filter: 'ebooks', maxResults: 40 });
          break;
        default:
          books = null;
      }
      return (
        <BookList
          currentUrl={currentUrl}
          name={navigationId}
          data={books?.items ?? []}
        />
      );
    }
  } catch {
    notFound();
  }
}
