// import { ReactNode, useState } from 'react';

import { IBook } from '@/model/books';
import Book from '../Book';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { BOOKS_NAVIGATION_LINKS, BOOKS_SECTION_TITLES } from '@/constants';

type Prop = {
  data: IBook[];
  name: BOOKS_NAVIGATION_LINKS;
};

const BookListCarousel = (props: Prop) => {
  const { data, name } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row py-4 justify-between items-center">
        <CardTitle>{BOOKS_SECTION_TITLES[name]}</CardTitle>
        <Button variant="ghost" className="text-sm">
          <Link href={`/books/${BOOKS_NAVIGATION_LINKS[name]}`}>See All</Link>
        </Button>
      </CardHeader>
      <CardContent className="px-5">
        <Carousel>
          <CarouselContent>
            {(data ?? []).map((book) => {
              return (
                <CarouselItem key={book.id} className="xxl:basis-1/5">
                  <Book {...book} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious type="button" />
          <CarouselNext type="button" />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default BookListCarousel;
