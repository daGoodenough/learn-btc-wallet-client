import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { authConfig } from "../../utils/axiosConfigs";
const BASE_URL = process.env.REACT_APP_API_HOST;

const initialState = [];

export const walletSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallets: (state, action) => {
      return action.payload;
    },
    addWallet: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const fetchUserWallets = () => dispatch => {
  axios
    .get(`${BASE_URL}/api/wallets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      dispatch(addWallets(response.data))
    })
    .catch(error => console.log(error))
};

export const createWallet = (addrType, keys) => dispatch => {
  axios
    .post(
      `${BASE_URL}/api/wallets/${addrType}`, 
      {keys, network: 'regtest'}, 
      authConfig
      )
    .then(response => {
      dispatch(addWallet(response.data))
    })
    .catch(error => console.log(error))
}

export const {addWallets, addWallet} = walletSlice.actions;

export default walletSlice.reducer;
