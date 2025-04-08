import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Professions } from '@/types/professions';

export const fetchProfessionsAction = createAsyncThunk<Professions, undefined, {
  extra: AxiosInstance;
}>(
  'users/fetchProfessions',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Professions>(APIRoute.Professions.Index);

    return data;
  },
);
