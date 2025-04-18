import { createSlice } from '@reduxjs/toolkit';
import { deleteGradeAction, fetchGradesAction, storeGradeAction, updateGradeAction } from './grades-api-actions';
import { Grades } from '@/types/grades';
import { SliceName } from '@/const/store';

export type GradesSlice = {
  grades: {
    data: Grades | null;
    isFetching: boolean;
  };
}

const initialState: GradesSlice = {
  grades: {
    data: null,
    isFetching: false,
  },
};

export const gradesSlice = createSlice({
  name: SliceName.Grades,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGradesAction.pending, (state) => {
        state.grades.isFetching = true;
      })
      .addCase(fetchGradesAction.fulfilled, (state, action) => {
        state.grades.data = action.payload;
        state.grades.isFetching = false;
      })
      .addCase(fetchGradesAction.rejected, (state) => {
        state.grades.isFetching = false;
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
