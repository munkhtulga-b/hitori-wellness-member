"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderWithSteps from "@/app/_components/auth/HeaderWithSteps";
import SignupStepOne from "@/app/_components/auth/sign-up/StepOne";
import SignupStepTwo from "@/app/_components/auth/sign-up/StepTwo";
import SignupStepThree from "@/app/_components/auth/sign-up/StepThree";
import SignupStepFour from "@/app/_components/auth/sign-up/StepFour";
import { useSignupStore } from "@/app/_store/user-signup";
import $api from "@/app/_api";

const AuthSignup = () => {
  const router = useRouter();
  const updateRequestBody = useSignupStore((state) => state.setBody);
  const getRequestBody = useSignupStore((state) => state.getBody);
  const [currentForm, setCurrentForm] = useState(1);

  const handleStepOne = (params) => {
    updateRequestBody(params);
    setCurrentForm((prev) => prev + 1);
  };

  const handleStepTwo = (params) => {
    console.log(params);
    updateRequestBody(params);
    setCurrentForm((prev) => prev + 1);
  };

  const handleStepThree = (params) => {
    updateRequestBody(params);
    registerUser(getRequestBody());
  };

  const onStepBack = () => {
    if (currentForm === 1) {
      return router.push("/auth/login");
    }
    setCurrentForm((prev) => prev - 1);
  };

  const registerUser = async (params) => {
    const { status, data } = await $api.auth.register(params);
    console.log(data);
    if (status === 200 || status === 201) {
      sendVerificationEmail();
    }
  };

  const sendVerificationEmail = async () => {
    const { status, data } = await $api.auth.sendVerification({
      email: getRequestBody().mailAddress,
    });
    if (status === 200 || status === 201 || status === 204) {
      setCurrentForm((prev) => prev + 1);
    }
  };

  return (
    <div className="tw-flex tw-flex-col">
      <HeaderWithSteps onStepBack={onStepBack} />
      <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
        {currentForm === 1 && (
          <section>
            <span className="tw-text-xl tw-font-medium">新規会員登録</span>
          </section>
        )}
        <section className={`${currentForm === 1 ? "tw-mt-10" : ""} tw-w-full`}>
          {currentForm === 1 && <SignupStepOne onComplete={handleStepOne} />}
          {currentForm === 2 && <SignupStepTwo onComplete={handleStepTwo} />}
          {currentForm === 3 && (
            <SignupStepThree onComplete={handleStepThree} />
          )}
          {currentForm === 4 && <SignupStepFour />}
        </section>
        {currentForm !== 4 && (
          <section className="tw-mt-6">
            <span
              onClick={() => router.push("/auth/reset")}
              className="tw-tracking-[0.14px] tw-cursor-pointer"
            >
              アカウントを既にお持ちの方はこちら
            </span>
          </section>
        )}
      </div>
    </div>
  );
};

export default AuthSignup;
