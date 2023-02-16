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
    signout: (state) => {
      localStorage.removeItem('token');
      return {
        ...initialState,
        token: null
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
  if(event.currentTarget) {
    event.preventDefault();
  }
  const email = event.currentTarget ? event.currentTarget[0].value : event.email;
  const username = event.currentTarget ? event.currentTarget[1].value : event.username;
  const password = event.currentTarget ? event.currentTarget[2].value : event.password;

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
      dispatch(authError(error.response?.status || 400));
    })
}

export const fetchCurrentUser = () => dispatch => {
  axios
    .get(`${BASE_URL}/auth/current_user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(authUser(response.data))
    })
    .catch((error) => {
      dispatch(authError(error.response?.status || 400))
    })
}

export const { authUser, authError, signout } = authSlice.actions;

export default authSlice.reducer;