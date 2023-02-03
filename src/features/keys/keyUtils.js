import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST

export const generatePrivKey = async () => {
  const response = await
    axios
      .get(`${BASE_URL}/api/keys/private`)
  return response.data;
};

export const generatePubKey = async (privateKey, compressed) => {
  const response = await
    axios.post(`${BASE_URL}/api/keys/public`, {
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