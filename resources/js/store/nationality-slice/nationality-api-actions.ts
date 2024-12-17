import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Nationalities } from '../../types/nationalities';

export const fetchNationalitiesAction = createAsyncThunk<Nationalities, undefined, {
  extra: AxiosInstance
}>(
  'nationalities/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Nationalities>(APIRoute.Nationalities.Index);

    return data;
  },
);
