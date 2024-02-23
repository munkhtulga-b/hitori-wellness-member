import fetchData from "../config";

const register = (params) => {
  return fetchData("auth/register", "POST", params);
};

export default register;
