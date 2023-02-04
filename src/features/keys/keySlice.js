import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { authConfig as config } from '../../utils/axiosConfigs';
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
    .get(`${BASE_URL}/api/keys`, config)
    .then((response) => {
      dispatch(addKeys(response.data.keys))
    })
};

export const saveKeyPair =
  (keyName, privateKey, wif, publicKey) =>
    dispatch => {
      axios
        .post(`${BASE_URL}/api/keys`, {
        keyName,
        privateKey,
        wif,
        publicKey,
      },
        config)
        .then(response => dispatch(addKey(response.data)))
        .catch(error => console.error(error))
    }

export const { addKeys, addKey } = keySlice.actions;

export default keySlice.reducer;