import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const authToken = localStorage.getItem("token") || "";

//   config.headers.token = authToken;

//   return config;
// });

export default axiosInstance;