import axiosClient from "./axiosClient";

const PartnerAPI = {
  getPartnerList: () => {
    return axiosClient.get<any[]>(`partner`);
  },
};

export default PartnerAPI;
