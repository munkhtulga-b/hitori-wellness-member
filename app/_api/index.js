// Auth API
import login from "@/app/_api/auth/LoginController";
import register from "./auth/RegisterController";
import sendVerification from "./auth/SendVerificationController";
import verify from "@/app/_api/auth/VerifyEmailController";
import forgotPassword from "./auth/ForgotPasswordController";
import * as resetPassword from "./auth/ResetPasswordController";
import changeEmail from "./auth/ChangeEmailController";

// Member API
import * as branch from "./member/BranchController";
import * as program from "./member/ProgramController";
import * as card from "./member/CreditCardController";
import * as plan from "./member/PlanController";
import * as memberPlan from "./member/MemberPlanController";
import * as purchase from "./member/PurchaseController";
import * as reservation from "./member/ReservationController";
import * as memberTicket from "./member/MemberTicketController";
import * as item from "./member/ItemController";
import * as ticket from "./member/TicketController";
import * as user from "./member/UserController";

const $api = {
  auth: {
    login,
    register,
    sendVerification,
    verify,
    forgotPassword,
    resetPassword,
    changeEmail,
  },
  member: {
    branch,
    program,
    card,
    plan,
    memberPlan,
    purchase,
    reservation,
    memberTicket,
    item,
    ticket,
    user,
  },
};

export default $api;
