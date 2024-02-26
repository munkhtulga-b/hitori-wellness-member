// Auth API
import login from "@/app/_api/auth/LoginController";
import register from "./auth/RegisterController";
import sendVerification from "./auth/SendVerificationController";
import verify from "@/app/_api/auth/VerifyEmailController";

const $api = {
  auth: {
    login,
    register,
    sendVerification,
    verify,
  },
};

export default $api;
