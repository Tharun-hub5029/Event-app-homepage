import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001", // Use `baseURL` instead of `URL`
});

export default api;
