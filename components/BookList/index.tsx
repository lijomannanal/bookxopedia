// import { ReactNode, useState } from 'react';

import { IBook } from '@/model/books';
import Book from '../Book';
import { BOOKS_NAVIGATION_LINKS, BOOKS_SECTION_TITLES } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SectionTitle from '../SectionTitle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import Link from 'next/link';
import NoResultFound from '../NoResultFound';
import { Fragment } from 'react';
import Loader from '../Loader';

type Prop = {
  data: IBook[];
  name: BOOKS_NAVIGATION_LINKS;
  label?: string;
  isLoading?: boolean;
  currentUrl?: string;
};

const BookList = (props: Prop) => {
  const { data, name, label, isLoading } = props;

  const currentUrl = props.currentUrl;
  const urlSegments = currentUrl ? currentUrl.split('/').slice(1) : [];
  console.log('URL Segments in BookList component:', urlSegments);
  console.log('Current URL in BookList component:', currentUrl);

  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <CardTitle>
          {urlSegments.length > 1 ? (
            <Breadcrumb>
              <BreadcrumbList>
                {urlSegments.map((segment, index) => {
                  const decodedSegment = decodeURIComponent(segment);
                  const isLast = index === urlSegments.length - 1;
                  const href = '/' + urlSegments.slice(0, index + 1).join('/');
                  return (
                    <Fragment key={href}>
                      <BreadcrumbItem className="text-lg">
                        {isLast ? (
                          <BreadcrumbPage className="font-semibold">
                            {BOOKS_SECTION_TITLES[
                              decodedSegment as keyof typeof BOOKS_SECTION_TITLES
                            ] ?? decodedSegment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href}>
                              {BOOKS_SECTION_TITLES[
                                decodedSegment as keyof typeof BOOKS_SECTION_TITLES
                              ] ?? decodedSegment}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          ) : (
            <SectionTitle>
              {BOOKS_SECTION_TITLES[name as keyof typeof BOOKS_SECTION_TITLES]}
            </SectionTitle>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex flex-col md:flex-row sm:flex-col items-center sm:items-start flex-wrap gap-4 3xl:gap-5">
          {data.length === 0 && !isLoading && (
            <div className="w-full">
              <NoResultFound
                caption={
                  name === 'genre'
                    ? `We can't find any books in this genre.`
                    : undefined
                }
              />
            </div>
          )}
          {isLoading && name === BOOKS_NAVIGATION_LINKS.favourite && (
            <div className="flex justify-center w-full">
              <Loader caption="Loading favorites..." />
            </div>
          )}
          {(data ?? []).map((book) => {
            return <Book selectedGenre={label} key={book.id} {...book} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookList;
