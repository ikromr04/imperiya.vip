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
    const { data } = await api.get<AuthUser>(APIRoute.Auth.Check);
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthUser, {
  dto: LoginCredentials,
  onValidationError?: (error: ValidationError) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/login',
  async ({ dto, onValidationError }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<{ user: AuthUser, token: Token }>(APIRoute.Auth.Login, dto);
      saveToken(data.token);
      return data.user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance
}>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Auth.Logout);
    dropToken();
  },
);

export const sendResetPasswordLinkAction = createAsyncThunk<void, {
  dto: { email: string },
  onSuccess?: (message: string) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/forgot-password',
  async ({ dto, onSuccess, onValidationError, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<ResponseMessage>(APIRoute.Auth.ForgotPassword, dto);
      if (onSuccess) onSuccess(response.data.message);
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

export const resetPasswordAction = createAsyncThunk<void, {
  dto: ResetPasswordDTO,
  onSuccess?: (message: string) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/reset-password',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<ResponseMessage>(APIRoute.Auth.ResetPassword, dto);
      if (onSuccess) onSuccess(response.data.message);
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
