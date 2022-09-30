import axiosClient from "./axiosClient";

const StoreAPI = {
  getStoreList: () => {
    return axiosClient.get<any[]>(`store`);
  },
  addStore: (data: any) => {
    return axiosClient.post(`store`, data);
  },
  deleteStore: (id: string) => {
    return axiosClient.delete(`store/${id}`);
  },
};

export default StoreAPI;
