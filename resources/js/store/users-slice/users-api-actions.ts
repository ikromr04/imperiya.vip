import { APIRoute } from '@/const/routes';
import { RoleUpdateDTO, UserStoreDTO, UserUpdateDTO } from '@/dto/users';
import { ResponseMessage } from '@/types';
import { User, UserId, Users } from '@/types/users';
import { ValidationError } from '@/types/validation-error';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';

export const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance
}>(
  'users/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Users>(APIRoute.Users.Index);
    console.log(data);

    return data;
  },
);

export const updateUserAction = createAsyncThunk<User, {
  dto: UserUpdateDTO,
  onSuccess?: (user: User) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/update',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<User>(APIRoute.Users.Index, dto);
      if (onSuccess) onSuccess(data);

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

export const checkUserLoginAction = createAsyncThunk<undefined, {
  login: string,
  onSuccess?: () => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/checkLogin',
  async ({ login, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.get<ResponseMessage>(generatePath(APIRoute.Users.Login, { login }));
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

export const deleteUserAction = createAsyncThunk<UserId, {
  id: UserId,
  onSuccess?: () => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/delete',
  async ({ id, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(generatePath(APIRoute.Users.Show, { id }));
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

export const storeUserAction = createAsyncThunk<User, {
  dto: UserStoreDTO,
  onSuccess?: (user: User) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/store',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(APIRoute.Users.Index, dto);
      if (onSuccess) onSuccess(data);
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

export const fetchUserByIdAction = createAsyncThunk<void, {
  userId: UserId,
  onSuccess?: (user: User) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/fetchById',
  async ({ userId, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<User>(generatePath(APIRoute.Users.Show, { userId }));
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

export const updateUserAvatarAction = createAsyncThunk<User, {
  userId: UserId,
  formData: FormData,
  onSuccess?: (user: User) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/updateAvatar',
  async ({ userId, formData, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    formData.append('_method', 'put');

    try {
      const { data } = await api.post<User>(generatePath(APIRoute.Users.Avatar, { userId }), formData);
      if (onSuccess) onSuccess(data);
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

export const deleteUserAvatarAction = createAsyncThunk<UserId, {
  userId: UserId,
  onSuccess?: () => void,
}, {
  extra: AxiosInstance
}>(
  'users/deleteAvatar',
  async ({ userId, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Users.Avatar, { userId }));
    if (onSuccess) onSuccess();
    return userId;
  },
);

export const updateUserRoleAction = createAsyncThunk<User, {
  dto: RoleUpdateDTO,
  onSuccess?: (user: User) => void,
  onValidationError?: (error: ValidationError) => void,
  onFail?: (message: string) => void,
}, {
  extra: AxiosInstance,
  rejectWithValue: ValidationError,
}>(
  'users/roleUpdate',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<User>(generatePath(APIRoute.Users.Role, { userId: dto.user_id }), dto);
      if (onSuccess) onSuccess(data);

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
