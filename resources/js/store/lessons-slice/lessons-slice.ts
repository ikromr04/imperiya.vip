import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { fetchLessonsAction } from './lessons-api-actions';

export type LessonsSlice = {
  lessons: {
    isFetching: boolean;
  };
}

const initialState: LessonsSlice = {
  lessons: {
    isFetching: false,
  },
};

export const lessonsSlice = createSlice({
  name: SliceName.Lessons,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLessonsAction.pending, (state) => {
        state.lessons.isFetching = true;
      })
      .addCase(fetchLessonsAction.fulfilled, (state) => {
        state.lessons.isFetching = false;
      })
      .addCase(fetchLessonsAction.rejected, (state) => {
        state.lessons.isFetching = false;
      });
  },
});
