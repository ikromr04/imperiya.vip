import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Data } from '@/pages/leadership-page';

export const fetchLeadershipDataAction = createAsyncThunk<void, {
  onSuccess: (data: Data) => void;
}, {
  extra: AxiosInstance;
}>(
  'leadership/fetchData',
  async ({ onSuccess }, { extra: api }) => {
    const { data } = await api.get<Data>(APIRoute.Leadership.Index);

    onSuccess(data);
  },
);
