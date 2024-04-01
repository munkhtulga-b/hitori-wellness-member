import fetchData from "../config";

export const resetPassword = (token, body) => {
  return fetchData(`auth/reset-password?token=${token}`, "POST", body);
};

export const resetCurrentPassword = (body) => {
  return fetchData("auth/reset-password-verify", "POST", body);
};
