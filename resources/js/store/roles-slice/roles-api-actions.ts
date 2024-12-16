import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Roles } from '../../types/roles';

export const fetchRolesAction = createAsyncThunk<Roles, undefined, {
  extra: AxiosInstance
}>(
  'roles/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Roles>(APIRoute.Roles.Index);

    return data;
  },
);
