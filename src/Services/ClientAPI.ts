import axiosClient from "./axiosClient";
const ClientAPI = {
  getClientList: () => {
    return axiosClient.get<any[]>(`client`);
  },
  addClient: (data: any) => {
    return axiosClient.post(`client`, data);
  },
  deleteClient: (id: string) => {
    return axiosClient.delete(`client/${id}`);
  },
  updateClient: (data: any) => {
    console.log(data, "321");
    return axiosClient.put(`client/${data._id}`, data);
  },
};

export default ClientAPI;
