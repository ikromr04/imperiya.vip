import { APIRoute } from '@/const/routes';
import { LoginCredentials, ResetPasswordDTO } from '@/dto/auth-dto';
import { dropToken, saveToken, Token } from '@/services/token';
import { ResponseMessage } from '@/types';
import { AuthUser, RegisterLink, RegisterLinkId, RegisterLinks } from '@/types/auth';
import { ValidationError } from '@/types/validation-error';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';

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
      const { data } = await api.post<ResponseMessage>(APIRoute.Auth.ForgotPassword, dto);
      if (onSuccess) onSuccess(data.message);
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

export const fetchRegisterLinksAction = createAsyncThunk<RegisterLinks, undefined, {
  extra: AxiosInstance
}>(
  'auth/fetchRegisterLinksAction',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<RegisterLinks>(APIRoute.Auth.RegisterLinks);
    return data;
  },
);

export const generateRegisterLinkAction = createAsyncThunk<RegisterLink, {
  onSuccess?: (link: RegisterLink) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/generateRegisterLink',
  async ({ onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<RegisterLink>(APIRoute.Auth.RegisterLinks);
      if (onSuccess) onSuccess(data);
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

export const updateRegisterLinkAction = createAsyncThunk<RegisterLink, {
  id: RegisterLinkId;
  onSuccess?: (link: RegisterLink) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/updateRegisterLink',
  async ({ id, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<RegisterLink>(generatePath(APIRoute.Auth.RegisterLink, { id }));
      if (onSuccess) onSuccess(data);
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

export const deleteRegisterLinkAction = createAsyncThunk<RegisterLinkId, {
  id: RegisterLinkId,
  onSuccess?: () => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/deleteRegisterLink',
  async ({ id, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(generatePath(APIRoute.Auth.RegisterLink, { id }));
      if (onSuccess) onSuccess();
      return id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
