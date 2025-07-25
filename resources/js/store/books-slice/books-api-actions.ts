import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { ValidationError } from '@/types/validation-error';
import { generatePath } from 'react-router-dom';
import { BookCategories, BookCategory, BookCategoryId } from '@/types/books';
import { BookCategoryUpdateDTO } from '@/dto/books';

export const fetchBookCategoriesAction = createAsyncThunk<BookCategories, undefined, {
  extra: AxiosInstance;
}>(
  'books/fetchCategories',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<BookCategories>(APIRoute.Books.Categories);

    return data;
  },
);

export const storeBookCategoryAction = createAsyncThunk<BookCategory, {
  title: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'books/storeCategory',
  async ({ title, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<BookCategory>(APIRoute.Books.Categories, { title });
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateBookCategoryAction = createAsyncThunk<BookCategory, {
  dto: BookCategoryUpdateDTO;
  onSuccess?: () => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'books/updateCategory',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<BookCategory>(generatePath(APIRoute.Books.CategoriesShow, { id: dto.id }), dto);
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteBookCategoryAction = createAsyncThunk<BookCategoryId, {
  id: BookCategoryId;
  onSuccess?: () => void;
}, {
  extra: AxiosInstance;
}>(
  'books/deleteCategory',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Books.CategoriesShow, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
