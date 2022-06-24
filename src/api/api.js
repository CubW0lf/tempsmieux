import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.tempsmieux.vincentcottalorda.me/",
});

export default api;
