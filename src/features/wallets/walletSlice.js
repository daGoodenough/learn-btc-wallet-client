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
    },
    changeBalance: (state, action) => {
      const wallet = state.find(
        wallet => wallet.address === action.payload.address
      );
      wallet.balance = action.payload.newBalance;
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
      { keys, network: 'regtest' },
      authConfig
    )
    .then(response => {
      dispatch(addWallet(response.data))
    })
    .catch(error => console.log(error))
}

export const fundWallet = (address) => dispatch => {
  axios
    .post(
      `${BASE_URL}/api/transactions/fund-wallet`,
      { address },
      authConfig
    )
    .then(response => {
      dispatch(changeBalance({ newBalance: response.data, address }))
    })
    .catch(error => console.error(error))

  // axios
  //   .post(`http://regtest-server:8080/1/generate`, {address, blocks: 10}).then(response => console.log(response))
  
}

export const { addWallets, addWallet, changeBalance } = walletSlice.actions;

export default walletSlice.reducer;
