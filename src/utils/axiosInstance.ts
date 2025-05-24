import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://front-end-task.bmbzr.ir/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
