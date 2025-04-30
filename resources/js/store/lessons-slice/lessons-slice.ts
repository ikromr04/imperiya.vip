import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
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
    status: AsyncStatus;
  };
  types: {
    data?: Types;
    status: AsyncStatus;
  };
}

const initialState: LessonsSlice = {
  lessons: {
    status: AsyncStatus.Idle,
  },
  types: {
    status: AsyncStatus.Idle,
  },
};

export const lessonsSlice = createSlice({
  name: SliceName.Lessons,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLessonsAction.pending, (state) => {
        state.lessons.status = AsyncStatus.Loading;
      })
      .addCase(fetchLessonsAction.fulfilled, (state) => {
        state.lessons.status = AsyncStatus.Succeeded;
      })
      .addCase(fetchLessonsAction.rejected, (state) => {
        state.lessons.status = AsyncStatus.Failed;
      })

      .addCase(fetchLessonsTypesAction.pending, (state) => {
        state.types.status = AsyncStatus.Loading;
      })
      .addCase(fetchLessonsTypesAction.fulfilled, (state, action) => {
        state.types.status = AsyncStatus.Succeeded;
        state.types.data = action.payload;
      })
      .addCase(fetchLessonsTypesAction.rejected, (state) => {
        state.types.status = AsyncStatus.Failed;
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
