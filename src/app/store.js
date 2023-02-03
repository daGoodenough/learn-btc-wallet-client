import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import keyReducer from '../features/keys/keySlice';
import walletReducer from '../features/wallets/walletSlice';

const store = configureStore({
  reducer:{
    auth: authReducer,
    keys: keyReducer,
    wallets: walletReducer,
  },
});

export default store;