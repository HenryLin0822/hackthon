import _axios from "axios";

const instance = _axios.create({
  baseURL:
    "http://localhost:4000/api",
  timeout: 2000,
});

export default instance;
