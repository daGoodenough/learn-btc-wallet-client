import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_HOST

export const generatePrivKey = async () => {
  const response = await
  axios
    .get(`${BASE_URL}/api/keys/private`)
  return response.data;
}