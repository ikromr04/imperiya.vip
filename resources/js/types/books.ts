import { ID } from '.';

export type BookId = ID;

export type Book = {
  id: BookId;
  categoryId: BookCategoryId;
  title: string;
  access: 'all' | 'students' | 'parents' | 'teachers';
  lang: string;
  link: string;
  description?: string;
};

export type Books = Book[];

export type BookCategoryId = ID;

export type BookCategory = {
  id: BookCategoryId;
  title: string;
};

export type BookCategories = BookCategory[];
