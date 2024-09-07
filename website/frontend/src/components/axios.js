import _axios from "axios";

const instance = _axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://cktfgsc-bank-z3zpvj7vba-de.a.run.app/api",
  timeout: 10000,
});

export default instance;
