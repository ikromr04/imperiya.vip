import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { BookCategories, Books } from '@/types/books';
import {
  deleteBookAction,
  deleteBookCategoryAction,
  fetchBookCategoriesAction,
  fetchBooksAction,
  storeBookAction,
  storeBookCategoryAction,
  updateBookAction,
  updateBookCategoryAction,
} from './books-api-actions';

export type BooksSlice = {
  categories: {
    data?: BookCategories;
    status: AsyncStatus;
  };
  books: {
    data?: Books;
    status: AsyncStatus;
  };
}

const initialState: BooksSlice = {
  categories: {
    status: AsyncStatus.Idle,
  },
  books: {
    status: AsyncStatus.Idle,
  },
};

export const booksSlice = createSlice({
  name: SliceName.Books,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchBooksAction.pending, (state) => {
        state.books.status = AsyncStatus.Loading;
      })
      .addCase(fetchBooksAction.fulfilled, (state, action) => {
        state.books.status = AsyncStatus.Succeeded;
        state.books.data = action.payload;
      })
      .addCase(fetchBooksAction.rejected, (state) => {
        state.books.status = AsyncStatus.Failed;
      })

      .addCase(storeBookAction.fulfilled, (state, action) => {
        if (state.books.data) {
          state.books.data = [action.payload, ...state.books.data];
        }
      })
      .addCase(updateBookAction.fulfilled, (state, action) => {
        if (state.books.data) {
          const index = state.books.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.books.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteBookAction.fulfilled, (state, action) => {
        if (state.books.data) {
          state.books.data = state.books.data.filter(({ id }) => id !== action.payload);
        }
      })

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
