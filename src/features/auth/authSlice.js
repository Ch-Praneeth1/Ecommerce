import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, signOut } from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error:null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo, {rejectWithValue}) => {
    
    try{
      const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (userId) => {
    const response = await signOut(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'userCreated';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'userUpdated';
        state.loggedInUserToken = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'userUpdated';
        state.loggedInUserToken = null;
      });
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken

export default authSlice.reducer;
