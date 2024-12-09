import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Users } from '../../types/users';

export const fetchUsersAction = createAsyncThunk<Users, undefined, {
  extra: AxiosInstance
}>(
  'users/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Users>(APIRoute.Users.Index);
    return data;
  },
);
