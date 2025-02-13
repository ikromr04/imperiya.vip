import { APIRoute } from '@/const/routes';
import { Nationalities } from '@/types/nationalities';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

export const fetchNationalitiesAction = createAsyncThunk<Nationalities, undefined, {
  extra: AxiosInstance
}>(
  'nationalities/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Nationalities>(APIRoute.Nationalities.Index);

    return data;
  },
);
