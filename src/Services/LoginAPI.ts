import axiosClient from "./axiosClient";

const LoginAPI = {
  LoginAction: (user: any) => {
    return axiosClient.post(`manager/login`, user);
  },
};
export default LoginAPI;
