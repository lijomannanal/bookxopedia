import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { GenreResponse } from '@/model/genre';

type Props = {
  pathname?: string;
  topGenres: GenreResponse[];
};
export default function TopGenre({ pathname, topGenres }: Props) {
  return (
    <div className="mt-6">
      <h2 className="mb-2 ml-4 text-menu-title">Genre</h2>
      <ul className="mb-4 flex flex-col gap-1.5">
        {topGenres.map((genre) => {
          const GenreIcon = Icons[
            genre.icon as keyof typeof Icons
          ] as Icons.LucideIcon;
          const isSelected = pathname === `/genre/${genre.name}`;
          return (
            <li key={genre.name}>
              <Link
                href={`/genre/${genre.name}`}
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-slate-800`}
              >
                <div
                  className={`rounded-md ${isSelected ? 'bg-secondary' : 'bg-gray-200'} p-1`}
                >
                  <GenreIcon
                    className="w-4 h-4"
                    color={isSelected ? 'white' : 'black'}
                    strokeWidth={isSelected ? 3 : undefined}
                  />
                </div>
                <span
                  className={`text-menu-item leading-6 ${
                    isSelected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {genre.name}
                </span>
              </Link>
            </li>
          );
        })}
        <li className="ml-8">
          <Link href={`/genre`}>
            <Button variant={'link'}>
              <span
                className={`text-menu-item ${
                  pathname === '/genre' ? 'font-medium' : 'font-normal'
                }`}
              >
                See All
              </span>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
