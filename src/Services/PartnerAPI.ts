import axiosClient from "./axiosClient";

const PartnerAPI = {
  getPartnerList: () => {
    return axiosClient.get<any[]>(`partner`);
  },
  addPartner: (data: any) => {
    const formData = new FormData();

    console.log(formData, 1);
    formData.append("img", data.img[0].originFileObj);
    formData.append("name", data.name);
    console.log(formData, 2);
    return axiosClient.post(`partner`, formData);
  },
  deletePartner: (id: string) => {
    return axiosClient.delete(`partner/${id}`);
  },
};

export default PartnerAPI;
