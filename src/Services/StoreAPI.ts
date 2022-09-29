import axiosClient from "./axiosClient";

const StoreAPI = {
  getStoreList: () => {
    return axiosClient.get<any[]>(`store`);
  },
};

export default StoreAPI;
