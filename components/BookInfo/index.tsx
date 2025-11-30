// import { ReactNode, useState } from 'react';

import { BOOK_DETAILS_CONFIG, FALLBACK_IMAGE } from '@/constants';
import { VolumeInfo } from '@/model/books';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import { getBookDetails } from '@/service';

type Prop = {
  id: string;
};

const BookInfo = async (props: Prop) => {
  const { id } = props;
  const { volumeInfo } = await getBookDetails(id);
  const { title, authors, imageLinks, description = '' } = volumeInfo;

  return (
    <>
      <BackButton />
      <div className="flex flex-col lg:flex-row h-auto lg:h-[300px] gap-10 mt-2">
        <div className="flex justify-center items-center min-w-[250px] shadow-9 h-[300px] lg:h-auto bg-gradient-to-r from-primary to-blue-200 h-48 flex items-center justify-center">
          <Image
            className={`rounded-md`}
            alt="book1"
            width={150} // Specify the desired width for the thumbnail
            height={220}
            quality={100}
            src={imageLinks?.thumbnail ?? FALLBACK_IMAGE}
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">{title}</h1>
          <div className="my-2 text-lg text-amber-600">
            By {authors?.join(', ') ?? 'Unknown Author'}
          </div>
          <div className="my-3 flex flex-col justify-between flex-wrap text-sm gap-4">
            {BOOK_DETAILS_CONFIG.map((config) => {
              let data = '';
              if (config.type === 'string') {
                data = volumeInfo[config.key as keyof VolumeInfo] as string;
              } else {
                data =
                  (
                    volumeInfo[config.key as keyof VolumeInfo] as string[]
                  )?.join(', ') ?? '';
              }
              return (
                <div key={config.key} className="flex flex-row gap-2">
                  <div className="font-semibold min-w-[150px]">
                    {config.name}
                  </div>
                  <div>{data}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </>
  );
};

export default BookInfo;
