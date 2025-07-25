import { ID } from '.';

export type BookCategoryId = ID;

export type BookCategory = {
  id: BookCategoryId;
  title: string;
};

export type BookCategories = BookCategory[];
