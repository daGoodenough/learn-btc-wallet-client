import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST;

const initialState = [];

export const keySlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    addKeys: (state, action) => {
      return action.payload
    }
  }
});

export const fetchUserKeys = () => dispatch => {
  axios
    .get(`${BASE_URL}/api/keys`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      dispatch(addKeys(response.data.keys))
    })
};

export const {addKeys} = keySlice.actions;

export default keySlice.reducer;