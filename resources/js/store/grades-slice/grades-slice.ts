import { createSlice } from '@reduxjs/toolkit';
import { fetchGradesAction, storeGradeAction, updateGradeAction } from './grades-api-actions';
import { Grades } from '@/types/grades';
import { SliceName } from '@/const';

export type GradesSlice = {
  grades: Grades | null;
}

const initialState: GradesSlice = {
  grades: null,
};

export const gradesSlice = createSlice({
  name: SliceName.Roles,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGradesAction.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(storeGradeAction.fulfilled, (state, action) => {
        state.grades = [action.payload, ...(state.grades || [])];
      })
      .addCase(updateGradeAction.fulfilled, (state, action) => {
        if (state.grades) {
          state.grades = state.grades.map((grade) =>
            grade.id === action.payload.id ? { ...action.payload } : grade
          );
        }
      });
  },
});
