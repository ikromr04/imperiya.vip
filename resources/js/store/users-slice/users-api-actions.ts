import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { User, UserId, Users } from '../../types/users';
import { UserStoreDTO } from '../../dto/users';
import { ValidationError } from '../../types/validation-error';
import { generatePath } from 'react-router-dom';

export const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance
}>(
  'users/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Users>(APIRoute.Users.Index);

    return data;
  },
);

export const storeUserAction = createAsyncThunk<void, {
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

export const updateUserAvatarAction = createAsyncThunk<void, {
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
