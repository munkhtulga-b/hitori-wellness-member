"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderWithSteps from "@/app/_components/auth/HeaderWithSteps";
import SignupStepOne from "@/app/_components/auth/sign-up/StepOne";
import SignupStepTwo from "@/app/_components/auth/sign-up/StepTwo";
import SignupStepThree from "@/app/_components/auth/sign-up/StepThree";

const AuthSignup = () => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState(3);

  const handleStepOne = (params) => {
    console.log(params);
  };

  const onStepBack = () => {
    if (currentForm === 1) {
      return router.push("/auth/login");
    }
    setCurrentForm((prev) => prev - 1);
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
          {currentForm === 2 && <SignupStepTwo />}
          {currentForm === 3 && <SignupStepThree />}
        </section>
        <section className="tw-mt-6">
          <span
            onClick={() => router.push("/auth/reset")}
            className="tw-tracking-[0.14px] tw-cursor-pointer"
          >
            アカウントを既にお持ちの方はこちら
          </span>
        </section>
      </div>
    </div>
  );
};

export default AuthSignup;
