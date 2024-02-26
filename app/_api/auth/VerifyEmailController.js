import fetchData from "../config";

const verify = (token) => {
  return fetchData(`auth/verify-email?token=${token}`, "POST");
};

export default verify;
