import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Grades } from '../../types/grades';

export const fetchGradesAction = createAsyncThunk<Grades, undefined, {
  extra: AxiosInstance
}>(
  'grades/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Grades>(APIRoute.Grades.Index);

    return data;
  },
);
