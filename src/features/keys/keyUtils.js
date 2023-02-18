import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST
const PORT = 5000;

export const generatePrivKey = async () => {
  const response = await
    axios
      .get(`${BASE_URL}:${PORT}/api/keys/private`)
  return response.data;
};

export const generatePubKey = async (privateKey, compressed) => {
  const response = await
    axios.post(`${BASE_URL}:${PORT}/api/keys/public`, {
      privateKey
    }, {
      params: {
        compressed
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  return response.data;
}