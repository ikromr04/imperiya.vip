import { createSlice } from '@reduxjs/toolkit';
import { deleteGradeAction, fetchGradesAction, storeGradeAction, updateGradeAction } from './grades-api-actions';
import { Grades } from '@/types/grades';
import { AsyncStatus, SliceName } from '@/const/store';

export type GradesSlice = {
  grades: {
    data?: Grades;
    status: AsyncStatus;
  };
}

const initialState: GradesSlice = {
  grades: {
    status: AsyncStatus.Idle,
  },
};

export const gradesSlice = createSlice({
  name: SliceName.Grades,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGradesAction.pending, (state) => {
        state.grades.status = AsyncStatus.Loading;
      })
      .addCase(fetchGradesAction.fulfilled, (state, action) => {
        state.grades.status = AsyncStatus.Succeeded;
        state.grades.data = action.payload;
      })
      .addCase(fetchGradesAction.rejected, (state) => {
        state.grades.status = AsyncStatus.Failed;
      })

      .addCase(storeGradeAction.fulfilled, (state, action) => {
        if (state.grades.data) {
          state.grades.data =  [action.payload, ...state.grades.data];
        }
      })
      .addCase(updateGradeAction.fulfilled, (state, action) => {
        if (state.grades.data) {
          const gradeIndex = state.grades.data.findIndex(({ id }) => id === action.payload.id);

          if (gradeIndex !== -1) {
            state.grades.data[gradeIndex] = action.payload;
          }
        }
      })
      .addCase(deleteGradeAction.fulfilled, (state, action) => {
        if (state.grades.data) {
          state.grades.data = state.grades.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});
