import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Profession, ProfessionId, Professions } from '@/types/professions';
import { ValidationError } from '@/types/validation-error';
import { ProfessionUpdateDTO } from '@/dto/professions';
import { generatePath } from 'react-router-dom';

export const fetchProfessionsAction = createAsyncThunk<Professions, undefined, {
  extra: AxiosInstance;
}>(
  'users/fetchProfessions',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Professions>(APIRoute.Professions.Index);

    return data;
  },
);

export const storeProfessionAction = createAsyncThunk<Profession, {
  name: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'professions/store',
  async ({ name, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Profession>(APIRoute.Professions.Index, { name });
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

export const updateProfessionAction = createAsyncThunk<Profession, {
  dto: ProfessionUpdateDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'professions/updateProfession',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Profession>(generatePath(APIRoute.Professions.Show, { id: dto.id }), dto);
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

export const deleteProfessionAction = createAsyncThunk<ProfessionId, {
  id: ProfessionId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'professions/delete',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Professions.Show, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
