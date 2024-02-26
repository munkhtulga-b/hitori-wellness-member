import fetchData from "../config";

const login = (params) => {
  return fetchData("auth/login", "POST", params);
};

export default login;
