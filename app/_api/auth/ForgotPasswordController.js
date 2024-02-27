import fetchData from "../config";

const forgotPassword = (params) => {
  return fetchData("auth/forgot-password", "POST", params);
};

export default forgotPassword;
