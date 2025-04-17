import { createSlice } from '@reduxjs/toolkit';
import { SliceName } from '@/const/store';
import { Types } from '@/types/lessons';
import {
  deleteLessonTypeAction,
  fetchLessonsAction,
  fetchLessonsTypesAction,
  storeLessonTypeAction,
  updateLessonsTypeAction,
} from './lessons-api-actions';

export type LessonsSlice = {
  lessons: {
    isFetching: boolean;
  };
  types: {
    data: Types | null;
    isFetching: boolean;
  };
}

const initialState: LessonsSlice = {
  lessons: {
    isFetching: false,
  },
  types: {
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
      .addCase(fetchLessonsAction.fulfilled, (state) => {
        state.lessons.isFetching = false;
      })
      .addCase(fetchLessonsAction.rejected, (state) => {
        state.lessons.isFetching = false;
      })

      .addCase(fetchLessonsTypesAction.pending, (state) => {
        state.types.isFetching = true;
      })
      .addCase(fetchLessonsTypesAction.fulfilled, (state, action) => {
        state.types.data = action.payload;
        state.types.isFetching = false;
      })
      .addCase(fetchLessonsTypesAction.rejected, (state) => {
        state.types.isFetching = false;
      })
      .addCase(storeLessonTypeAction.fulfilled, (state, action) => {
        if (state.types.data) {
          state.types.data = [action.payload, ...state.types.data];
        }
      })
      .addCase(updateLessonsTypeAction.fulfilled, (state, action) => {
        if (state.types.data) {
          const index = state.types.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.types.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteLessonTypeAction.fulfilled, (state, action) => {
        if (state.types.data) {
          state.types.data = state.types.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});
