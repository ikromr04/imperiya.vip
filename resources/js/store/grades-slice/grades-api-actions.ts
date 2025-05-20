import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { GradeStoreDTO, GradeUpdateDTO } from '@/dto/grades';
import { ValidationError } from '@/types/validation-error';
import { generatePath } from 'react-router-dom';
import { Grade, GradeId, Grades } from '@/types/grades';
import { APIRoute } from '@/const/routes';

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
  onSuccess?: () => void,
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
      if (onSuccess) onSuccess();
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

export const updateGradeAction = createAsyncThunk<Grade, {
  dto: GradeUpdateDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'grades/update',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Grade>(generatePath(APIRoute.Grades.Show, { id: dto.id }), dto);
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

export const deleteGradeAction = createAsyncThunk<GradeId, {
  id: GradeId,
  onSuccess?: () => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'grades/delete',
  async ({ id, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(generatePath(APIRoute.Grades.Show, { id }));
      if (onSuccess) onSuccess();
      return id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
