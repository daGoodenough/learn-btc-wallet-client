import axios from 'axios';
import { authConfig } from '../axiosConfigs';
const BASE_URL = process.env.REACT_APP_API_HOST;

export const createRawP2pkh = async (transactiondData) => {
  const transaction = await axios
    .post(`${BASE_URL}/api/transactions/create-raw/p2pkh`,
      transactiondData,
      authConfig
    )
    .then((response) => response.data)
    .catch(error => { throw new Error(error) });

    return transaction;
}
