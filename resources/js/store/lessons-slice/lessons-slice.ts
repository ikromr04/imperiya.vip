import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Lessons } from '@/types/lessons';
import { fetchLessonsAction, storeLessonAction, updateLessonAction } from './lessons-api-actions';

export type LessonsSlice = {
  lessons: {
    data: Lessons | null;
    isFetching: boolean;
  };
}

const initialState: LessonsSlice = {
  lessons: {
    data: null,
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
      .addCase(fetchLessonsAction.fulfilled, (state, action) => {
        state.lessons.data = action.payload;
        state.lessons.isFetching = false;
      })
      .addCase(fetchLessonsAction.rejected, (state) => {
        state.lessons.isFetching = false;
      })

      .addCase(storeLessonAction.fulfilled, (state, action) => {
        state.lessons.data = state.lessons.data ? [action.payload, ...state.lessons.data] : [action.payload];
      })
      .addCase(updateLessonAction.fulfilled, (state, action) => {
        if (state.lessons.data) {
          const index = state.lessons.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.lessons.data[index] = action.payload;
          }
        }
      });
  },
});
