import axios from "axios";

const instance = axios.create({
  baseURL: "http://52.66.239.222:3009/api/v1/"
});

export default instance;
