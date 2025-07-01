import axios from "axios";
import CheckToken from "../Auth/CheckToken";

const BaseUrl = "http://localhost:1122";

const axiosMain = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

axiosMain.interceptors.request.use(async (config) => {
  await CheckToken();
  return config;
});

export default axiosMain;
