import { APIRoute } from '@/const/routes';
import { UserRoleUpdateDTO, UserStoreDTO, UserUpdateDTO } from '@/dto/users';
import { User, UserId, Users } from '@/types/users';
import { ValidationError } from '@/types/validation-error';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';

export const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance;
}>(
  'users/fetchUsers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Users>(APIRoute.Users.Index);

    return data;
  },
);

export const storeUserAction = createAsyncThunk<User, {
  dto: UserStoreDTO;
  onSuccess?: (user: User) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'users/storeUser',
  async ({ dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<User>(APIRoute.Users.Index, dto);
      if (onSuccess) onSuccess(data);
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

export const updateUserAction = createAsyncThunk<User, {
  id: UserId;
  dto: UserUpdateDTO;
  onSuccess?: (user: User) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'users/updateUser',
  async ({ id, dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<User>(generatePath(APIRoute.Users.Show, { id }), dto);
      if (onSuccess) onSuccess(data);

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

export const deleteUserAction = createAsyncThunk<UserId, {
  id: UserId;
  onSuccess?: () => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'users/deleteUser',
  async ({ id, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(generatePath(APIRoute.Users.Show, { id }));
      if (onSuccess) onSuccess();
      return id;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (!error.response) throw err;
      if (onFail && (error.response?.status !== 422)) onFail(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserAvatarAction = createAsyncThunk<User, {
  id: UserId;
  formData: FormData;
  onSuccess?: (user: User) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'users/updateUserAvatar',
  async ({ id, formData, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    formData.append('_method', 'put');

    try {
      const { data } = await api.post<User>(generatePath(APIRoute.Users.Avatar, { id }), formData);
      if (onSuccess) onSuccess(data);

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

export const deleteUserAvatarAction = createAsyncThunk<UserId, {
  id: UserId;
  onSuccess?: () => void;
}, {
  extra: AxiosInstance;
}>(
  'users/deleteUserAvatar',
  async ({ id, onSuccess }, { extra: api }) => {
    await api.delete(generatePath(APIRoute.Users.Avatar, { id }));
    if (onSuccess) onSuccess();
    return id;
  },
);

export const updateUserRoleAction = createAsyncThunk<Users, {
  id: UserId;
  dto: UserRoleUpdateDTO;
  onSuccess?: (users: Users) => void;
  onValidationError?: (error: ValidationError) => void;
  onFail?: (message: string) => void;
}, {
  extra: AxiosInstance;
  rejectWithValue: ValidationError;
}>(
  'users/updateUserRole',
  async ({ id, dto, onValidationError, onSuccess, onFail }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.put<Users>(generatePath(APIRoute.Users.Role, { id }), dto);
      if (onSuccess) onSuccess(data);

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
