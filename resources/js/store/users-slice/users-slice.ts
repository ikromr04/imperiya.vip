import { createSlice } from '@reduxjs/toolkit';
import { UserId, Users } from '@/types/users';
import { SliceName } from '@/const/store';
import {
  deleteGradeAction,
  storeGradeAction,
  updateGradeAction,
} from '../grades-slice/grades-api-actions';
import {
  deleteUserAction,
  deleteUserAvatarAction,
  fetchStudentAction,
  fetchUsersAction,
  storeUserAction,
  updateUserAction,
  updateUserAvatarAction,
} from './users-api-actions';
import { Grade } from '@/types/grades';

export type Student = {
  mother: {
    id: UserId;
    name: string;
    surname: string;
    patronymic: string;
  };
  father: {
    id: UserId;
    name: string;
    surname: string;
    patronymic: string;
  };
  grade: Grade;
};

export type UsersSlice = {
  users: {
    data: Users | null;
    isFetching: boolean;
  };
  student: {
    data: Student | null;
    isFetching: boolean;
  };
}

const initialState: UsersSlice = {
  users: {
    data: null,
    isFetching: false,
  },
  student: {
    data: null,
    isFetching: false,
  },
};

export const usersSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.users.isFetching = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.users.data = action.payload;
        state.users.isFetching = false;
      })
      .addCase(fetchUsersAction.rejected, (state) => {
        state.users.isFetching = true;
      })

      .addCase(fetchStudentAction.pending, (state) => {
        state.student.isFetching = true;
      })
      .addCase(fetchStudentAction.fulfilled, (state, action) => {
        state.student.data = action.payload;
        state.student.isFetching = false;
      })
      .addCase(fetchStudentAction.rejected, (state) => {
        state.student.isFetching = true;
      })

      .addCase(storeUserAction.fulfilled, (state, action) => {
        if (state.users.data) {
          state.users.data = [action.payload, ...state.users.data];
        }
      })
      .addCase(updateUserAvatarAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload.id);
          if (userIndex !== -1) {
            state.users.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(deleteUserAvatarAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload);
          if (userIndex !== -1) {
            const updatedUser = { ...state.users.data[userIndex] };
            delete updatedUser.avatar;
            delete updatedUser.avatarThumb;
            state.users.data[userIndex] = updatedUser;
          }
        }
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        if (state.users.data) {
          const userIndex = state.users.data.findIndex((user) => user.id === action.payload.id);
          if (userIndex !== -1) {
            state.users.data[userIndex] = action.payload;
          }
        }
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        if (state.users.data) {
          state.users.data = state.users.data.filter(({ id }) => id !== action.payload);
        }
      })

      .addCase(storeGradeAction.fulfilled, (state) => {
        state.users.data = null;
      })
      .addCase(updateGradeAction.fulfilled, (state) => {
        state.users.data = null;
      })
      .addCase(deleteGradeAction.fulfilled, (state, action) => {
        if (state.users.data) {
          state.users.data = state.users.data.map((user) => {
            if (user.student?.gradeId === action.payload) {
              const updatedStudent = { ...user.student };
              delete updatedStudent.gradeId;
              return { ...user, student: updatedStudent };
            }
            return user;
          });
        }
      });
  },
});
