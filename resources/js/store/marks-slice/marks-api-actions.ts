import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { MarkStoreDTO, MarkUpdateDTO } from '@/dto/marks';
import { Mark, Marks } from '@/types/marks';
import { LessonId } from '@/types/lessons';
import { generatePath } from 'react-router-dom';

export const fetchMarksAction = createAsyncThunk<void, {
  lessons?: LessonId[];
  onSuccess?: (marks: Marks) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'marks/fetchMarks',
  async ({ lessons, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (lessons) params.append('lessons', JSON.stringify(lessons));

      const { data } = await api.get<Marks>(`${APIRoute.Marks.Index}?${params.toString()}`);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

// export const fetchMarksAction = createAsyncThunk<void, {
//   studentId?: UserId;
//   lessons?: LessonId[];
//   onSuccess?: (marks: Marks) => void;
//   onValidationError?: (error: ValidationError) => void;
//   onFail?: (message: string) => void;
// }, {
//   extra: AxiosInstance;
//   rejectWithValue: ValidationError;
// }>(
//   'marks/fetch',
//   async ({ studentId, lessons, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
//     try {
//       const { data } = await api.post<Marks>(APIRoute.Marks.Diary, { studentId, lessons });
//       if (onSuccess) onSuccess(data);
//     } catch (err) {
//       const error = err as AxiosError<ValidationError>;
//       if (!error.response) throw err;
//       if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
//       if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

export const storeMarkAction = createAsyncThunk<void, {
  dto: MarkStoreDTO,
  onSuccess?: (mark: Mark) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'marks/storeMark',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Mark>(APIRoute.Marks.Index, dto);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateMarkAction = createAsyncThunk<void, {
  dto: MarkUpdateDTO,
  onSuccess?: (mark: Mark) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'marks/updateMark',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Mark>(generatePath(APIRoute.Marks.Show, { id: dto.id }), dto);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
