import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST

const initialState = {
  token: localStorage.getItem('token') || '',
  errorMessage: null,
  email: '',
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action) => {
      const { token, email, username } = action.payload;
      return {
        token,
        email,
        username,
      };
    },
    authError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const localLogin = (event, callback) => dispatch => {
  event.preventDefault();
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  axios
    .post(`${BASE_URL}/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(authUser(response.data));
      callback();
    })
    .catch((error) => {
      dispatch(authError(error.response?.status || 400));
    });
}

export const signup = (event, callback) => dispatch => {
  event.preventDefault();
  const email = event.currentTarget[0].value;
  const username = event.currentTarget[1].value;
  const password = event.currentTarget[2].value;

  axios
    .post(`${BASE_URL}/auth/signup`, {
      email,
      username,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(authUser(response.data));
      callback();
    })
    .catch((error) => {
      dispatch(authError(error.response?.statue || 400));
    })
}

export const { authUser, authError } = authSlice.actions;

export default authSlice.reducer;