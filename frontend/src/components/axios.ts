import axios from "axios";

const requestToApi = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  withCredentials: true,
});

export default requestToApi;
