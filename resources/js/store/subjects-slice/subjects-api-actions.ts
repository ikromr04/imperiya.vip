import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { Subject, SubjectId, Subjects } from '@/types/subjects';
import { SubjectUpdateDTO } from '@/dto/subjects';
import { generatePath } from 'react-router-dom';

export const fetchSubjectsAction = createAsyncThunk<Subjects, undefined, {
  extra: AxiosInstance;
}>(
  'subjects/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Subjects>(APIRoute.Subjects.Index);

    return data;
  },
);

export const storeSubjectAction = createAsyncThunk<Subject, {
  name: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'subjects/store',
  async ({ name, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Subject>(APIRoute.Subjects.Index, { name });
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

export const updateSubjectAction = createAsyncThunk<Subject, {
  dto: SubjectUpdateDTO;
  onSuccess?: () => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'subjects/updateSubject',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Subject>(generatePath(APIRoute.Subjects.Show, { id: dto.id }), dto);
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

export const deleteSubjectAction = createAsyncThunk<SubjectId, {
  id: SubjectId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'subjects/delete',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Subjects.Show, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
