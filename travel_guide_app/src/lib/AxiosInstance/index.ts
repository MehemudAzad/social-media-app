import envConfig from "@/src/config/envConfig";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/auth",
});

export default axiosInstance;