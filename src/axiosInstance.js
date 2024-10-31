import axios from "axios";

const customInstance = axios.create({
  baseURL: "https://devcamper-api-v2.onrender.com",
});

customInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customInstance;
