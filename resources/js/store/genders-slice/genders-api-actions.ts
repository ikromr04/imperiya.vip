import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Genders } from '../../types/genders';

export const fetchGendersAction = createAsyncThunk<Genders, undefined, {
  extra: AxiosInstance
}>(
  'genders/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Genders>(APIRoute.Genders.Index);

    return data;
  },
);
