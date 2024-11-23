/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { AuthUser } from '../../types/auth';
import { ValidationError } from '../../types/validation-error';
import { LoginCredentials, ResetPasswordDTO } from '../../dto/auth-dto';
import { dropToken, saveToken, Token } from '../../services/token';
import { ResponseMessage } from '../../types';

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

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance
}>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Auth.Login);
    dropToken();
  },
);

export const sendResetPasswordLinkAction = createAsyncThunk<void, {
  dto: { email: string },
  onError: (error: ValidationError) => void,
  onSuccess: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/forgot-password',
  async ({ dto, onError, onSuccess }, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<ResponseMessage>(APIRoute.Auth.ForgotPassword, dto);
      onSuccess(response.data.message);
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      onError(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const resetPasswordAction = createAsyncThunk<void, {
  dto: ResetPasswordDTO,
  onError: (error: ValidationError) => void,
  onSuccess: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/reset-password',
  async ({ dto, onError, onSuccess }, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<ResponseMessage>(APIRoute.Auth.ResetPassword, dto);
      onSuccess(response.data.message);
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      onError(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);
