import envConfig from "@/src/config/envConfig";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }

export default axiosInstance;
