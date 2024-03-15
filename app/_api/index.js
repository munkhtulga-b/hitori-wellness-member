// Auth API
import login from "@/app/_api/auth/LoginController";
import register from "./auth/RegisterController";
import sendVerification from "./auth/SendVerificationController";
import verify from "@/app/_api/auth/VerifyEmailController";
import forgotPassword from "./auth/ForgotPasswordController";
import resetPassword from "./auth/ResetPasswordController";

// Member API
import * as branch from "./member/BranchController";
import * as program from "./member/ProgramController";
import * as card from "./member/CreditCardController";

const $api = {
  auth: {
    login,
    register,
    sendVerification,
    verify,
    forgotPassword,
    resetPassword,
  },
  member: {
    branch,
    program,
    card,
  },
};

export default $api;
