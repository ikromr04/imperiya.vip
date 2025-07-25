import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getBooks = (state: State) => state[SliceName.Books].books.data;

export const getBooksStatus = (state: State) => state[SliceName.Books].books.status;

export const getBookCategories = (state: State) => state[SliceName.Books].categories.data;

export const getBookCategoriesStatus = (state: State) => state[SliceName.Books].categories.status;
