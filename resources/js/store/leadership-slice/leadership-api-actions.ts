import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const/routes';
import { Data } from '@/pages/leadership-page/leadership-page';
import { UserId } from '@/types/users';
import { GradeId } from '@/types/grades';

export const fetchLeadershipDataAction = createAsyncThunk<void, {
  gradeId?: GradeId;
  studentId?: UserId;
  onSuccess: (data: Data) => void;
}, {
  extra: AxiosInstance;
}>(
  'leadership/fetchData',
  async ({ gradeId, studentId, onSuccess }, { extra: api }) => {
    const params = new URLSearchParams();
    if (studentId) params.append('studentId', studentId.toString());
    if (gradeId) params.append('gradeId', gradeId.toString());

    const { data } = await api.get<Data>(`${APIRoute.Leadership.Index}?${params.toString()}`);

    onSuccess(data);
  },
);
