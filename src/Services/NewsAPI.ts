import axiosClient from "./axiosClient";

const NewsAPI = {
  getNewList: () => {
    return axiosClient.get<any[]>(`news`);
  },
  addNews: (data: any) => {
    return axiosClient.post(`news`, data);
  },
};

export default NewsAPI;
