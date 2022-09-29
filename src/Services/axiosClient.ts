import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://t52-loan-nodejs.herokuapp.com/t52",
  headers: {},
});
axiosClient.interceptors.request.use((config) => {
  //config là nội dung của request
  // ta có thể thay đổi nội dung của request trước khi  nó đc gửi lên server
  if (config.headers) {
    const accessToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzNhZDQ3ZjA4YWI1MGIzMGNhM2EwMSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjY0MzUyOTg4LCJleHAiOjE2NjY5NDQ5ODh9.3uw9T_ew9cmoMTYbixwMQFS8jPK74Ct8vPQVRBVLv_kds4324g
    `;
    if (accessToken) {
      config.headers.token = `${accessToken}`;
    }
  }
  return config;
});
axiosClient.interceptors.response.use(
  (reponse) => {
    return reponse.data;
  },
  (error) => {
    return error.response.data;
  },
);
export default axiosClient;
