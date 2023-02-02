import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authenticated: localStorage.getItem('token') || '',
  errorMessage: null,
  userId: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state) => {
      debugger;
      state = state;
    }
  }
});

export const {authUser,} = authSlice.actions;

export default authSlice.reducer;