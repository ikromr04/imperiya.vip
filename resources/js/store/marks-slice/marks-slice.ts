import { createSlice } from '@reduxjs/toolkit';
import { AsyncStatus, SliceName } from '@/const/store';
import { fetchMarksAction } from './marks-api-actions';

export type MarksSlice = {
  marks: {
    status: AsyncStatus;
  };
}

const initialState: MarksSlice = {
  marks: {
    status: AsyncStatus.Idle,
  },
};

export const marksSlice = createSlice({
  name: SliceName.Marks,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMarksAction.pending, (state) => {
        state.marks.status = AsyncStatus.Loading;
      })
      .addCase(fetchMarksAction.fulfilled, (state) => {
        state.marks.status = AsyncStatus.Succeeded;
      })
      .addCase(fetchMarksAction.rejected, (state) => {
        state.marks.status = AsyncStatus.Failed;
      });
  },
});
