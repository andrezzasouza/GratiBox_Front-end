import axios from 'axios';

const API_URL = 'https://urgratiboxshere.herokuapp.com';

const createHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const signUp = (body) => axios.post(`${API_URL}/sign-up`, body);
const login = (body) => axios.post(`${API_URL}/login`, body);
const details = (token) =>
  axios.get(`${API_URL}/details`, createHeaders(token));
const placeOrder = (body, token) =>
  axios.post(`${API_URL}/place-order`, body, createHeaders(token));
const updateStorage = (token) =>
  axios.get(`${API_URL}/update`, createHeaders(token));
export { signUp, login, placeOrder, details, updateStorage };
