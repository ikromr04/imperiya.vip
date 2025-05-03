import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { generatePath } from 'react-router-dom';
import { GradeId } from '@/types/grades';
import { Lesson, Lessons, LessonType, LessonTypeId, LessonTypes } from '@/types/lessons';
import { LessonDeleteDTO, LessonStoreDTO, LessonUpdateDTO, TypeUpdateDTO } from '@/dto/lessons';
import { SubjectId } from '@/types/subjects';
import { UserId } from '@/types/users';

export const fetchLessonsAction = createAsyncThunk<void, {
  week: number;
  gradeId?: GradeId;
  teacherId?: UserId;
  onSuccess: (lessons: Lessons) => void;
}, {
  extra: AxiosInstance;
}>(
  'lessons/fetchLessons',
  async ({ week, gradeId, teacherId, onSuccess }, { extra: api }) => {
    const params = new URLSearchParams({ week: week.toString() });
    if (gradeId) params.append('grade_id', gradeId.toString());
    if (teacherId) params.append('teacher_id', teacherId.toString());

    const { data } = await api.get<Lessons>(`${APIRoute.Lessons.Index}?${params.toString()}`);

    onSuccess(data);
  },
);

export const storeLessonAction = createAsyncThunk<void, {
  dto: LessonStoreDTO;
  week: number;
  onSuccess: (storedLesson: Lesson) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/storeLesson',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Lesson>(`${APIRoute.Lessons.Index}?week=${week}`, dto);
      onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateLessonAction = createAsyncThunk<void, {
  dto: LessonUpdateDTO;
  week?: number;
  onSuccess?: (updatedLesson: Lesson) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/updateLesson',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const path = generatePath(APIRoute.Lessons.Show, { id: dto.id });
      const url = week ? `${path}?week=${week}` : path;

      const { data } = await api.put<Lesson>(url, dto);

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

export const deleteLessonAction = createAsyncThunk<void, {
  dto: LessonDeleteDTO;
  week: number;
  onSuccess: () => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/deleteLesson',
  async ({ dto, week, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const query = new URLSearchParams({ week: week.toString() });
      if (dto.all) query.append('all', 'true');

      const url = `${generatePath(APIRoute.Lessons.Show, { id: dto.id })}?${query.toString()}`;
      await api.delete(url);

      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchLessonTypesAction = createAsyncThunk<LessonTypes, undefined, {
  extra: AxiosInstance;
}>(
  'lessons/fetchLessonTypes',
  async (_, { extra: api }) => {
    const { data } = await api.get<LessonTypes>(APIRoute.Lessons.Types);

    return data;
  },
);

export const storeLessonTypeAction = createAsyncThunk<LessonType, {
  name: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'lessons/storeLessonType',
  async ({ name, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<LessonType>(APIRoute.Lessons.Types, { name });

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

export const updateLessonsTypeAction = createAsyncThunk<LessonType, {
  dto: TypeUpdateDTO;
  onSuccess?: () => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/updateLessonType',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<LessonType>(APIRoute.Lessons.Types, dto);
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

export const deleteLessonTypeAction = createAsyncThunk<LessonTypeId, {
  id: LessonTypeId;
  onSuccess?: () => void;
}, {
  extra: AxiosInstance;
}>(
  'lessons/deleteLessonType',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Lessons.TypesShow, { id }));
    if (onSuccess) onSuccess();
    return id;
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
