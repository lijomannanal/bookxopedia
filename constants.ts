import { Heart, Home } from 'lucide-react';

export const FALLBACK_IMAGE = `/no-image.jpg`;
export const BOOK_DETAILS_CONFIG = [
  {
    name: 'Subjects',
    key: 'categories',
    type: 'array',
  },
  {
    name: 'Language',
    key: 'language',
    type: 'string',
  },
  {
    name: 'Publisher',
    key: 'publisher',
    type: 'string',
  },
  {
    name: 'Published Date',
    key: 'publishedDate',
    type: 'string',
  },
  {
    name: 'Number Of Pages',
    key: 'pageCount',
    type: 'string',
  },
  {
    name: 'Category',
    key: 'printType',
    type: 'string',
  },
];

export const MENU_ITEMS = [
  {
    name: 'Discover',
    icon: Home,
    path: '/books',
  },
  {
    name: 'Favourites',
    icon: Heart,
    path: '/favourites',
  },
];

export enum BOOKS_SECTION_TITLES {
  books = 'Home',
  popular = 'Popular Now',
  latest = 'New Releases',
  ebooks = 'Top Ebooks',
  favourite = 'Favourites',
  genre = 'Genre',
}
export enum BOOKS_NAVIGATION_LINKS {
  popular = 'popular',
  latest = 'latest',
  ebooks = 'ebooks',
  favourite = 'favourite',
  genre = 'genre',
}
