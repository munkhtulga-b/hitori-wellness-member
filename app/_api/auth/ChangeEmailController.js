import fetchData from "../config";

const changeEmail = (params) => {
  return fetchData("auth/reset-email", "POST", params);
};

export default changeEmail;
