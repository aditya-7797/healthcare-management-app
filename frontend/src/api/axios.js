import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // match backend route
});

export default API;
