import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Data } from '@/pages/leadership-page/leadership-page';
import { UserId } from '@/types/users';

export const fetchLeadershipDataAction = createAsyncThunk<void, {
  studentId?: UserId;
  onSuccess: (data: Data) => void;
}, {
  extra: AxiosInstance;
}>(
  'leadership/fetchData',
  async ({ studentId, onSuccess }, { extra: api }) => {
    const { data } = await api.get<Data>(`${APIRoute.Leadership.Index}${studentId ? `?studentId=${studentId}` : ''}`);

    onSuccess(data);
  },
);
