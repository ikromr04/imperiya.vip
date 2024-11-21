/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { AuthUser } from '../../types/auth';
import { ValidationError } from '../../types/validation-error';
import { LoginCredentials } from '../../dto/auth-dto';
import { saveToken, Token } from '../../services/token';

export const checkAuthAction = createAsyncThunk<AuthUser, undefined, {
  extra: AxiosInstance
}>(
  'auth/check',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthUser>(APIRoute.Auth.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthUser, {
  dto: LoginCredentials,
  onError: (error: ValidationError) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/login',
  async ({ dto, onError }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<{ user: AuthUser, token: Token }>(APIRoute.Auth.Login, dto);
      saveToken(data.token);
      return data.user;
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      onError(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
