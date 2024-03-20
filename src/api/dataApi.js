import axiosInstance from "./axiosInstance";

class dataAPI {
  uploadCallFlow = async(formData) => {
    const response = await axiosInstance.post(`/data/callFlow/upload`, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then((res) => {
      alert(JSON.stringify(res.data.data.data) + " [" + res.status + "]");
      return res.data;
    }).catch((err) => {
      alert(err.response.data.message + " [" + err.response.status + "]");
    });
  };
  uploadCommPeak = async(formData) => {
    const response = await axiosInstance.post(`/data/commPeak/upload`, formData, {
      headers: {
        "content-type": ",multipart/form-data"
      }
    }).then((res) => {
      alert(JSON.stringify(res.data.data.data) + " [" + res.status + "]");
      return res.data;
    }).catch((err) => {
      alert(err.response.data.message + " [" + err.response.status + "]");
    });
  };
}

export default new dataAPI();