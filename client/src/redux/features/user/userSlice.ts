/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};
export const getUser = createAsyncThunk('user/getUser', async () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set(
    'authorization',
    `bearer ${localStorage.getItem('token')}`
  );
  const res = await fetch(
    'https://divine-library-backend.vercel.app/api/v1/auth/get-user',
    {
      headers: requestHeaders,
    }
  );
  const data = await res.json();
  console.log(data.data.email);
  return data?.data?.email;
});
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    removeUser: (state) => {
      state.user.email = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export const { removeUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
