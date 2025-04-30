import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { Subjects } from '@/types/subjects';
import { deleteSubjectAction, fetchSubjectsAction, storeSubjectAction, updateSubjectAction } from './subjects-api-actions';

export type SubjectsSlice = {
  subjects: {
    data?: Subjects;
    status: AsyncStatus;
  };
}

const initialState: SubjectsSlice = {
  subjects: {
    status: AsyncStatus.Idle,
  },
};

export const subjectsSlice = createSlice({
  name: SliceName.Subjects,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSubjectsAction.pending, (state) => {
        state.subjects.status = AsyncStatus.Loading;
      })
      .addCase(fetchSubjectsAction.fulfilled, (state, action) => {
        state.subjects.status = AsyncStatus.Succeeded;
        state.subjects.data = action.payload;
      })
      .addCase(fetchSubjectsAction.rejected, (state) => {
        state.subjects.status = AsyncStatus.Failed;
      })

      .addCase(storeSubjectAction.fulfilled, (state, action) => {
        if (state.subjects.data) {
          state.subjects.data = [action.payload, ...state.subjects.data];
        }
      })
      .addCase(updateSubjectAction.fulfilled, (state, action) => {
        if (state.subjects.data) {
          const index = state.subjects.data.findIndex(({ id }) => id === action.payload.id);

          if (index !== -1) {
            state.subjects.data[index] = action.payload;
          }
        }
      })
      .addCase(deleteSubjectAction.fulfilled, (state, action) => {
        if (state.subjects.data) {
          state.subjects.data = state.subjects.data.filter(({ id }) => id !== action.payload);
        }
      });
  },
});
