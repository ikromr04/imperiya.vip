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
  week?: number;
  gradeId?: GradeId;
  teacherId?: UserId;
  subjectId?: SubjectId;
  onSuccess: (lessons: Lessons) => void;
}, {
  extra: AxiosInstance;
}>(
  'lessons/fetchLessons',
  async ({ week, gradeId, teacherId, subjectId, onSuccess }, { extra: api }) => {
    const params = new URLSearchParams();
    if (week) params.append('week', week.toString());
    if (gradeId) params.append('grade_id', gradeId.toString());
    if (subjectId) params.append('subject_id', subjectId.toString());
    if (teacherId) params.append('teacher_id', teacherId.toString());

    const { data } = await api.get<Lessons>(`${APIRoute.Lessons.Index}?${params.toString()}`);

    onSuccess(data);
  },
);

export const storeLessonAction = createAsyncThunk<void, {
  dto: LessonStoreDTO;
  week: number;
  onSuccess: (lessons: Lessons) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/storeLesson',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Lessons>(`${APIRoute.Lessons.Index}?week=${week}`, dto);
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
  onSuccess?: (lessons: Lessons) => void;
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

      const { data } = await api.put<Lessons>(url, dto);

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

export const updateLessonsTopicAction = createAsyncThunk<void, {
  dto: LessonUpdateDTO;
  onSuccess?: (lesson: Lesson) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'lessons/updateLessonsTopic',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {

      const { data } = await api.put<Lesson>(generatePath(APIRoute.Lessons.Topic, { id: dto.id }), dto);

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
  onSuccess: (lessons: Lessons) => void;
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
      const { data } = await api.delete<Lessons>(url);

      onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
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
      const { data } = await api.put<LessonType>(generatePath(APIRoute.Lessons.TypesShow, { id: dto.id }), dto);
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
