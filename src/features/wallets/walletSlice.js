import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
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
        wallet => wallet._id === action.payload.addressId
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

export const createWallet = (addrType, keys, name) => dispatch => {
  axios
    .post(
      `${BASE_URL}/api/wallets/${addrType}`,
      { keys, network: 'regtest', name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    )
    .then(response => {
      dispatch(addWallet(response.data))
    })
    .catch(error => console.log(error))
}

export const fundWallet = (addressId, callback) => dispatch => {
  axios
    .post(
      `${BASE_URL}/api/transactions/fund-wallet`,
      { addressId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    )
    .then(response => {
      dispatch(changeBalance({ newBalance: response.data, addressId }));
      dispatch(fetchUserWallets());
      callback(response.data, null)
    })
    .catch(error => callback(null, error));
}

export const { addWallets, addWallet, changeBalance } = walletSlice.actions;

export default walletSlice.reducer;
