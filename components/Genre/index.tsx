import { IGenre } from '@/model/genre';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import * as Icons from 'lucide-react';


export default function Genre({ name, icon }: IGenre) {
  const GenreIcon = Icons[icon as keyof typeof Icons] as Icons.LucideIcon;

  return (
    <Link href={`/genre/${name}`}>
      <Card
        className={`rounded-2xl shadow-lg bg-primary dark:bg-primary hover:scale-105 transition-transform cursor-pointer`}
      >
        <CardContent className="flex flex-col justify-center items-center p-6 gap-3">
          <div className="w-15 h-15 relative">
            <GenreIcon className="w-15 h-15" />
          </div>
          <p className="font-semibold text-lg text-center uppercase">{name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
