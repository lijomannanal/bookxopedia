import BookListCarousel from '@/components/BookListCarousel';
import { BOOKS_NAVIGATION_LINKS } from '@/constants';
import { getBooksList } from '@/service';

export default async function Home() {
  const popularBooks = await getBooksList({ q: 'subject:romance' });
  const latestBooks = await getBooksList({ orderBy: 'newest' });
  const eBooks = await getBooksList({ filter: 'ebooks' });

  return (
    <>
      <div className="mb-6 flex flex-col space-y-6">
        {/* <SectionTitle>Popular now</SectionTitle> */}
        <BookListCarousel
          name={BOOKS_NAVIGATION_LINKS.popular}
          data={popularBooks.items}
        />
        <BookListCarousel
          name={BOOKS_NAVIGATION_LINKS.latest}
          data={latestBooks.items}
        />
        <BookListCarousel
          name={BOOKS_NAVIGATION_LINKS.ebooks}
          data={eBooks.items}
        />
      </div>
    </>
  );
}
