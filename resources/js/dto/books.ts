import { BookCategoryId } from '@/types/books';

export type BookCategoryStoreDTO = {
  title: string;
};

export type BookCategoryUpdateDTO = {
  id: BookCategoryId;
  title: string;
};
