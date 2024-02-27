import fetchData from "../config";

const resetPassword = (token, body) => {
  return fetchData(`auth/reset-password?token=${token}`, "POST", body);
};

export default resetPassword;
