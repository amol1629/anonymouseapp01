import axios from "axios";

// TODO : Uncomment this link for LIVE
// const instance = axios.create({
//   baseURL: `https://gptapp.quillionz.com/api`,
// });

// This is only for LOCAL
const instance = axios.create({
  baseURL: `http://localhost:4041`,
});

// Add an interceptor to set the authorization token for each request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
