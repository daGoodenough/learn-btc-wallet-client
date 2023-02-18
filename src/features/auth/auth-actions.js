import axios from 'axios';


import {
  AUTH_USER,
  AUTH_ERROR,
} from '../../actions/types';
import BASE_URL from '../../actions/base-url';

export const localLogin = (event, callback) => dispatch => {
  event.preventDefault();
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  axios
    .post(`${BASE_URL}auth/login`, {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
      callback();
    })
    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.status,
      });
    });
}