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
    },
    addKey: (state, action) => {
      state.push(action.payload);
    }
  }
});


export const fetchUserKeys = () => dispatch => {
  axios
    .get(`${BASE_URL}/api/keys`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      dispatch(addKeys(response.data.keys))
    })
};

export const saveKeyPair =
  (keyName, privateKey, wif, publicKey, compressed, callback) =>
    dispatch => {
      axios
        .post(`${BASE_URL}/api/keys`, {
          keyName,
          privateKey,
          wif,
          publicKey,
          compressed,
        },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        .then(response => {
          dispatch(addKey(response.data))
          callback();
        })
        .catch(error => console.error(error))
    }

export const { addKeys, addKey } = keySlice.actions;

export default keySlice.reducer;