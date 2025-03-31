import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ValidationError } from '@/types/validation-error';
import { APIRoute } from '@/const/routes';
import { Schedules } from '@/types/schedules';
import { ScheduleDeleteDTO, ScheduleStoreDTO, ScheduleUpdateDTO } from '@/dto/schedules';
import { generatePath } from 'react-router-dom';

export const fetchSchedulesAction = createAsyncThunk<Schedules, {
  week: number;
}, {
  extra: AxiosInstance
}>(
  'schedules/fetch',
  async ({ week = 0 }, { extra: api }) => {
    const { data } = await api.get<Schedules>(`${APIRoute.Schedules.Index}?week=${week}`);

    return data;
  },
);

export const storeScheduleAction = createAsyncThunk<Schedules, {
  dto: ScheduleStoreDTO,
  week: number;
  onSuccess?: () => void,
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

export const updateScheduleAction = createAsyncThunk<Schedules, {
  dto: ScheduleUpdateDTO,
  week: number;
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'schedules/update',
  async ({ dto, week, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Schedules>(`${APIRoute.Schedules.Index}?week=${week}`, dto);
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

export const deleteScheduleAction = createAsyncThunk<Schedules, {
  dto: ScheduleDeleteDTO;
  week: number;
  onSuccess?: () => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'schedules/delete',
  async ({ dto, week, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.delete<Schedules>(`${generatePath(APIRoute.Schedules.Show, { id: dto.id })}?week=${week}${dto.all ? '&all=true' : ''}`);
      if (onSuccess) onSuccess();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
