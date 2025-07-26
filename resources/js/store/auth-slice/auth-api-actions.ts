import { APIRoute } from '@/const/routes';
import { LoginCredentials, RegisterDTO, ResetPasswordDTO, UserRatings } from '@/dto/auth-dto';
import { dropToken, saveToken, Token } from '@/services/token';
import { ResponseMessage } from '@/types';
import { RegisterLink, RegisterLinkId, RegisterLinks } from '@/types/auth';
import { User } from '@/types/users';
import { ValidationError } from '@/types/validation-error';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';

export const checkAuthAction = createAsyncThunk<User, undefined, {
  extra: AxiosInstance
}>(
  'auth/check',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Auth.Check);
    return data;
  },
);

export const loginAction = createAsyncThunk<User, {
  dto: LoginCredentials;
  onValidationError?: (error: ValidationError) => void;
  onBlocked?: () => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'auth/login',
  async ({ dto, onValidationError, onBlocked }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<{ user: User, token: Token }>(APIRoute.Auth.Login, dto);
      saveToken(data.token);
      return data.user;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onValidationError && (error.response?.status === 422)) onValidationError(error.response.data);
      if (onBlocked && (error.response?.status === 403)) onBlocked();
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

export const registerAction = createAsyncThunk<void, {
  dto: RegisterDTO;
  onSuccess?: () => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/register',
  async ({ dto, onSuccess, onValidationError, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.post<ResponseMessage>(APIRoute.Auth.Register, dto);
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

export const checkRegisterLinkAction = createAsyncThunk<void, {
  token: string,
  onSuccess?: (link: RegisterLink) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'auth/checkRegisterLink',
  async ({ token, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<RegisterLink>(`${APIRoute.Auth.Register}?token=${token}`);
      if (onSuccess) onSuccess(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error: AxiosError<ValidationError> = err;
      if (!error.response) throw err;
      if (onFail) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAuthRatingsAction = createAsyncThunk<void, {
  years: string;
  onSuccess?: (data: UserRatings) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'auth/fetchAuthRatings',
  async ({ years, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('years', years);

      const { data } = await api.get<UserRatings>(`${APIRoute.Auth.Ratings}?${params.toString()}`);

      if (onSuccess) onSuccess(data);
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);
