import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { BookCategories } from '@/types/books';
import {
  deleteBookCategoryAction,
  fetchBookCategoriesAction,
  storeBookCategoryAction,
  updateBookCategoryAction,
} from './books-api-actions';

export type BooksSlice = {
  categories: {
    data?: BookCategories;
    status: AsyncStatus;
  };
}

const initialState: BooksSlice = {
  categories: {
    status: AsyncStatus.Idle,
  },
};

export const booksSlice = createSlice({
  name: SliceName.Books,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookCategoriesAction.pending, (state) => {
        state.categories.status = AsyncStatus.Loading;
      })
      .addCase(fetchBookCategoriesAction.fulfilled, (state, action) => {
        state.categories.status = AsyncStatus.Succeeded;
        state.categories.data = action.payload;
      })
      .addCase(fetchBookCategoriesAction.rejected, (state) => {
        state.categories.status = AsyncStatus.Failed;
      })

      .addCase(storeBookCategoryAction.fulfilled, (state, action) => {
        if (state.categories.data) {
          state.categories.data = [action.payload, ...state.categories.data];
        }
      })
      .addCase(updateBookCategoryAction.fulfilled, (state, action) => {
        if (state.categories.data) {
          const index = state.categories.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.categories.data[index] = action.payload;
          }
        }
      })

      .addCase(deleteBookCategoryAction.fulfilled, (state, action) => {
        if (state.categories.data) {
          state.categories.data = state.categories.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});
