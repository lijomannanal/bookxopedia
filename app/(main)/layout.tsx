import prisma from '@/lib/prisma';
import Provider from './provider';
export const revalidate = 86400;

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const topGenres = await prisma.genre.findMany({
    orderBy: { name: 'asc' },
    where: { showOnMenu: true },
  });
  return (
    <>
      <Provider topGenres={topGenres}>{children}</Provider>
    </>
  );
}
