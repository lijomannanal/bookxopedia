import BookList from '@/components/BookList';
import { BOOKS_NAVIGATION_LINKS } from '@/constants';
import prisma from '@/lib/prisma';
import { getBooksList } from '@/service';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    name: string;
  };
};

export async function generateStaticParams() {
    const topGenres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
    where: { showOnMenu: true },
  });
  return topGenres.map((genre) => ({ name: genre.name }));
}

export default async function Page({ params }: Props) {
  const { name } = params;
  const decodedName = decodeURIComponent(name);
  const headersList = headers();
  const currentUrl = headersList.get('x-original-url') || '';

  try {
    const books = await getBooksList({
      q: `subject:${decodedName.split(' ').join('+')}`,
      maxResults: 40,
    });
    return (
      <BookList
        currentUrl={currentUrl}
        name={BOOKS_NAVIGATION_LINKS.genre}
        label={decodedName}
        data={books?.items ?? []}
      />
    );
  } catch {
    notFound();
  }
}
