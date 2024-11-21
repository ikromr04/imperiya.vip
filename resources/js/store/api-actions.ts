import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Options } from '../types';

export const fetchPlacesByName = createAsyncThunk<void, {
  name: string;
  onSuccess: (places: Options) => void;
}, {
  extra: AxiosInstance;
}>(
  'places/fetchByName',
  async ({ name, onSuccess }, { extra: api }) => {
    const { data } = await api.get(APIRoute.Places.Index, { params: { name } });
    onSuccess(data);
  },
);
