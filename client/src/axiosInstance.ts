import axios from "axios";

const API_BASE_URL = "https://api.coingecko.com/api/v3"; // API

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Таймаут запроса 5 секунд
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
