import axiosClient from "./axiosClient";

const NewsAPI = {
  getNewList: () => {
    return axiosClient.get<any[]>(`news`);
  },
};

export default NewsAPI;
