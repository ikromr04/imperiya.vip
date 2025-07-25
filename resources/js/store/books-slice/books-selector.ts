import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getBookCategories = (state: State) => state[SliceName.Books].categories.data;

export const getBookCategoriesStatus = (state: State) => state[SliceName.Books].categories.status;
