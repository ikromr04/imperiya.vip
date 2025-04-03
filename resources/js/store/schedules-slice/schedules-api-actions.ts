import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { ScheduleDeleteDTO, ScheduleStoreDTO, ScheduleUpdateDTO } from '@/dto/schedules';
import { generatePath } from 'react-router-dom';
import { Schedules } from '@/types/schedules';
import { LessonId } from '@/types/lessons';
import { GradeId } from '@/types/grades';
import { EvaluationsStoreDTO, EvaluationsUpdateDTO } from '@/dto/evaluations';

export const fetchSchedulesAction = createAsyncThunk<void, {
  week: number;
  onSuccess: (schedules: Schedules) => void,
}, {
  extra: AxiosInstance
}>(
  'schedules/fetch',
  async ({ week = 0, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Schedules>(`${APIRoute.Schedules.Index}?week=${week}`);

    onSuccess(data);
  },
);

export const storeScheduleAction = createAsyncThunk<void, {
  dto: ScheduleStoreDTO,
  week: number;
  onSuccess: (schedules: Schedules) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'schedules/store',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Schedules>(`${APIRoute.Schedules.Index}?week=${week}`, dto);
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

export const updateScheduleAction = createAsyncThunk<void, {
  dto: ScheduleUpdateDTO,
  week?: number;
  onSuccess?: (schedules: Schedules) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'schedules/update',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Schedules>(`${APIRoute.Schedules.Index}${week ? `?week${week}` : ''}`, dto);
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

export const deleteScheduleAction = createAsyncThunk<void, {
  dto: ScheduleDeleteDTO;
  week: number;
  onSuccess: (schedules: Schedules) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'schedules/delete',
  async ({ dto, week, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.delete<Schedules>(`${generatePath(APIRoute.Schedules.Show, { id: dto.id })}?week=${week}${dto.all ? '&all=true' : ''}`);
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
  lessonId: LessonId;
  gradeId: GradeId;
  onSuccess: (schedules: Schedules) => void;
}, {
  extra: AxiosInstance
}>(
  'journal/fetch',
  async ({ lessonId, gradeId, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Schedules>(`${APIRoute.Journal.Index}?lesson=${lessonId}&grade=${gradeId}`);

    onSuccess(data);
  },
);

export const storeEvaluationAction = createAsyncThunk<void, {
  dto: EvaluationsStoreDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'evaluations/store',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.post(APIRoute.Evaluations.Index, dto);
      if (onSuccess) onSuccess();
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

export const updateEvaluationAction = createAsyncThunk<void, {
  dto: EvaluationsUpdateDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'evaluations/update',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.put(APIRoute.Evaluations.Index, dto);
      if (onSuccess) onSuccess();
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
