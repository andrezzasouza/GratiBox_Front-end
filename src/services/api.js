import axios from 'axios';

const API_URL = 'http://localhost:4000';

const createHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const signUp = (body) => axios.post(`${API_URL}/sign-up`, body);
const login = (body) => axios.post(`${API_URL}/login`, body);
const details = (token) =>
  axios.get(`${API_URL}/details`, createHeaders(token));

export { signUp, login, details };
