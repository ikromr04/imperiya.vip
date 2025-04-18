import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { generatePath } from 'react-router-dom';
import { GradeId } from '@/types/grades';
import { Lessons, Type, TypeId, Types } from '@/types/lessons';
import { LessonDeleteDTO, LessonStoreDTO, LessonUpdateDTO, TypeUpdateDTO } from '@/dto/lessons';
import { SubjectId } from '@/types/subjects';
import { UserId } from '@/types/users';

export const fetchLessonsAction = createAsyncThunk<void, {
  week: number;
  gradeId?: GradeId;
  teacherId?: UserId;
  onSuccess: (lessons: Lessons) => void,
}, {
  extra: AxiosInstance
}>(
  'lessons/fetch',
  async ({ week = 0, gradeId, teacherId, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Lessons>(`${APIRoute.Lessons.Index}?week=${week}${gradeId ? `&grade_id=${gradeId}` : ''}${teacherId ? `&teacher_id=${teacherId}` : ''}`);

    onSuccess(data);
  },
);

export const fetchLessonsTypesAction = createAsyncThunk<Types, undefined, {
  extra: AxiosInstance;
}>(
  'lessons/fetchTypes',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Types>(APIRoute.Lessons.Types);

    return data;
  },
);

export const storeLessonAction = createAsyncThunk<void, {
  dto: LessonStoreDTO,
  week: number;
  onSuccess: (lessons: Lessons) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/store',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Lessons>(`${APIRoute.Lessons.Index}?week=${week}`, dto);
      onSuccess(data);
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

export const updateLessonAction = createAsyncThunk<void, {
  dto: LessonUpdateDTO,
  week?: number;
  onSuccess?: (lessons: Lessons) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/update',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Lessons>(`${APIRoute.Lessons.Index}${week ? `?week=${week}` : ''}`, dto);
      if (onSuccess) onSuccess(data);
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

export const deleteLessonAction = createAsyncThunk<void, {
  dto: LessonDeleteDTO;
  week: number;
  onSuccess: (lessons: Lessons) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/delete',
  async ({ dto, week, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.delete<Lessons>(`${generatePath(APIRoute.Lessons.Show, { id: dto.id })}?week=${week}${dto.all ? '&all=true' : ''}`);
      onSuccess(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchJournalAction = createAsyncThunk<void, {
  subjectId: SubjectId;
  gradeId: GradeId;
  onSuccess: (lessons: Lessons) => void;
}, {
  extra: AxiosInstance
}>(
  'journal/fetch',
  async ({ subjectId, gradeId, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Lessons>(`${APIRoute.Journal.Index}?subject_id=${subjectId}&grade_id=${gradeId}`);

    onSuccess(data);
  },
);

export const storeLessonTypeAction = createAsyncThunk<Type, {
  name: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/storeType',
  async ({ name, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Type>(APIRoute.Lessons.Types, { name });
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

export const updateLessonsTypeAction = createAsyncThunk<Type, {
  dto: TypeUpdateDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/updateType',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Type>(APIRoute.Lessons.Types, dto);
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

export const deleteLessonTypeAction = createAsyncThunk<TypeId, {
  id: TypeId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'lessons/deleteType',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Lessons.TypesShow, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
