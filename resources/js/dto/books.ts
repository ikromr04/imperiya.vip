import { BookCategoryId, BookId } from '@/types/books';

export type BookStoreDTO = {
  category_id: BookCategoryId;
  title: string;
  access: 'all' | 'students' | 'parents' | 'teachers';
  lang: string;
  link?: string;
  file?: File;
  description?: string;
};

export type BookUpdateDTO = {
  id: BookId;
  category_id: BookCategoryId;
  title: string;
  access: 'all' | 'students' | 'parents' | 'teachers';
  lang: string;
  link?: string;
  file?: File;
  description?: string;
};

export type BookCategoryStoreDTO = {
  title: string;
};

export type BookCategoryUpdateDTO = {
  id: BookCategoryId;
  title: string;
};
