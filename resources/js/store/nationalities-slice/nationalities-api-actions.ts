import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Nationalities, Nationality, NationalityId } from '@/types/nationalities';
import { ValidationError } from '@/types/validation-error';
import { NationalityUpdateDTO } from '@/dto/nationalities';
import { generatePath } from 'react-router-dom';

export const fetchNationalitiesAction = createAsyncThunk<Nationalities, undefined, {
  extra: AxiosInstance;
}>(
  'nationalities/fetchNationalities',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Nationalities>(APIRoute.Nationalities.Index);

    return data;
  },
);

export const storeNationalityAction = createAsyncThunk<Nationality, {
  name: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'nationalities/store',
  async ({ name, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Nationality>(APIRoute.Nationalities.Index, { name });
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

export const updateNationalityAction = createAsyncThunk<Nationality, {
  dto: NationalityUpdateDTO,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'nationalities/update',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Nationality>(APIRoute.Nationalities.Index, dto);
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

export const deleteNationalityAction = createAsyncThunk<NationalityId, {
  id: NationalityId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'nationalities/delete',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Nationalities.Show, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);
