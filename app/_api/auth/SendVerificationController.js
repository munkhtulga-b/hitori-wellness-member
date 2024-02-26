import fetchData from "../config";

const sendVerification = (body) => {
  return fetchData("auth/send-verification-email", "POST", body);
};

export default sendVerification;
