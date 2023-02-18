import axios from 'axios';
const BASE_URL = 'http://144.202.100.189:5000';

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