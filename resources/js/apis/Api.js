import axios from "axios";

let Api = axios.create({
  baseURL: API_URL
});

Api.defaults.withCredentials = true;

export default Api;
