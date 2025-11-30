import prisma from '@/lib/prisma';
import Genre from '../Genre';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SectionTitle from '../SectionTitle';

export default async function GenreList() {
  const genres = await prisma.genre.findMany({ orderBy: { name: 'asc' } });
  return (
    <Card className="min-h-full">
      <CardHeader className="py-3 px-4">
        <CardTitle>
          <SectionTitle>Genre</SectionTitle>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => {
            return <Genre key={genre.id} {...genre} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
