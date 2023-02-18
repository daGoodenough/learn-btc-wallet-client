import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST;
const PORT = 5000;

export const createRawP2pkh = async (transactiondData) => {
  const transaction = await axios
    .post(`${BASE_URL}:${PORT}/api/transactions/create-raw/p2pkh`,
      transactiondData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    )
    .then((response) => response.data)
    .catch(error => { throw new Error(error) });

  return transaction;
};

export const broadcastTransaction = async (txHex) => {
  const txid = await axios
    .post(`${BASE_URL}:${PORT}/api/transactions/broadcast`,
      { txHex },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    )
    .then(response => response.data)
    .catch(error => { throw new Error(error.response.data) });
  return txid;
};

export const fetchDecodedTx = async (txid) => {
  const tx = await axios
    .get(`${BASE_URL}:${PORT}/api/transactions/raw`,
      { params: { txid } }
    )
    .then(response => response.data)
    .catch(error => { throw new Error(error) });

  return tx
};
