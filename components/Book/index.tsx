// import { ReactNode, useState } from 'react';

import { FALLBACK_IMAGE } from '@/constants';
import { IBook } from '@/model/books';
import Image from 'next/image';
import Link from 'next/link';
import Favourite from '../Favourite';
// import Favourite from '../Favourite';

type Prop = IBook & { toggleFavourite?: () => void; selectedGenre?: string };

const Book = (props: Prop) => {
  const { id, volumeInfo, selectedGenre } = props;
  const { title, authors, categories, imageLinks } = volumeInfo;

  return (
    <div className="relative h-[180px] w-[285px] md:w-[360px] lg:w-[285px] xl:w-[300px] 3xl:w-[310px] shadow-card border border-solid border-gray-200 flex rounded-[0.5rem] bg-gradient-to-r from-primary to-blue-100 gap-3 p-3 pr-3">
      <Link href={`/books/${id}`}>
        <div
          className="relative w-[120px] h-[155px] 3xl:w-[100px] cursor-pointer before:absolute before:bg-[rgba(255,255,255,.5)] before:top-[50%] before:left-[50%] before:z-[2] before:block before-content-[''] before:w-0 
              before:h-0 before:rounded-[100%] before:translate-x-[-50%] before:translate-y-[-50%] before:opacity-0 hover:before:animate-circle-effect"
        >
          <Image
            className={`rounded-md  animate-fade-in`}
            alt="book1"
            width={100}
            height={100}
            src={imageLinks?.thumbnail ?? FALLBACK_IMAGE}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </Link>
      <div className="flex flex-col justify-around">
        <div
          title={title}
          className="min-h-[50px] line-clamp-2 text-lg text-slate-800 font-semibold"
        >
          {title}
        </div>
        <div className="mt-3 flex items-center min-h-[50px] text-md text-slate-800">
          {authors?.length && (
            <div className="line-clamp-2">
              <span className="text-slate-500">by </span>
              <div className="inline max-w-[170px]">
                {authors.length > 1
                  ? `${authors?.[0]} + ${authors.length - 1}`
                  : authors?.[0]}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-end min-h-[50px]">
          {categories?.length && (
            <div className="line-clamp-2">
              <div className="inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[130px] xl:max-w-[150px] bg-secondary text-sm text-white dark:text-black rounded-xl px-2 py-[2px]">
                <Link
                  href={`/genre/${encodeURIComponent(selectedGenre ?? categories[0])}`}
                >
                  {selectedGenre ?? categories[0]}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Favourite bookId={id} />
    </div>
  );
};

export default Book;
