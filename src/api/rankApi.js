import axiosInstance from "./axiosInstance";

const apiService = async () => {
  const response = await axiosInstance.get(`/ranking/all`);
  if (response.status !== 200) {
    throw Error(`api return ${response.status}.`);
  }
  return response.data;
}

export default apiService;