import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Grade, Grades } from '../../types/grades';
import { GradeStoreDTO } from '@/dto/grades';
import { ValidationError } from '@/types/validation-error';

export const fetchGradesAction = createAsyncThunk<Grades, undefined, {
  extra: AxiosInstance
}>(
  'grades/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Grades>(APIRoute.Grades.Index);

    return data;
  },
);

export const storeGradeAction = createAsyncThunk<Grade, {
  dto: GradeStoreDTO,
  onSuccess?: (grade: Grade) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'grades/store',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Grade>(APIRoute.Grades.Index, dto);
      if (onSuccess) onSuccess(data);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
