import _axios from "axios";

const instance = _axios.create({
  baseURL:
    "https://10.0.2.2:4000/api",
  timeout: 2000,
});

export default instance;
