"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SignupStepOne from "@/app/_components/auth/sign-up/StepOne";
import SignupStepTwo from "@/app/_components/auth/sign-up/StepTwo";
import SignupStepThree from "@/app/_components/auth/sign-up/StepThree";
import SignupStepFour from "@/app/_components/auth/sign-up/StepFour";
import { useSignupStore } from "@/app/_store/user-signup";
import $api from "@/app/_api";

const AuthSignup = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const updateRequestBody = useSignupStore((state) => state.setBody);
  const getRequestBody = useSignupStore((state) => state.getBody());
  const resetRequestBody = useSignupStore((state) => state.resetBody);
  const [currentForm, setCurrentForm] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);

  useEffect(() => {
    const step = searchParams.get("step");
    if (step) {
      setCurrentForm(step);
    }
  }, [searchParams]);

  const handleStepOne = (params) => {
    updateRequestBody(params);
    setRegisteredEmail(params.mailAddress);
    router.push(pathName + "?" + createQueryString("step", 2));
    setCurrentForm((prev) => prev + 1);
  };

  const handleStepTwo = (params) => {
    params.tel = params.tel?.replace(/-/g, "");
    params.emergencyTel = params.emergencyTel?.replace(/-/g, "");
    updateRequestBody(params);
    router.push(pathName + "?" + createQueryString("step", 3));
    setCurrentForm((prev) => prev + 1);
  };

  const handleStepThree = async (params) => {
    let body = { ...getRequestBody, ...params }; // Ensuring that password is not exposed to the session storage
    registerUser(body);
  };

  const registerUser = async (params) => {
    setIsLoading(true);
    const utm_source = searchParams.get("utm_source");
    const utm_medium = searchParams.get("utm_medium");
    const utm_campaign = searchParams.get("utm_campaign");
    const utm_term = searchParams.get("utm_term");
    if (utm_source && utm_campaign && utm_medium) {
      params.utmSource = utm_source;
      params.utmMedium = utm_medium;
      params.utmCampaign = utm_campaign;
      if (utm_term) {
        params.utmTerm = utm_term;
      }
    }
    const { isOk } = await $api.auth.register(params);
    if (isOk) {
      router.push(pathName + "?" + createQueryString("step", "complete"));
      resetRequestBody();
    }
    setIsLoading(false);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      {currentForm === "1" && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="tw-text-xl tw-font-medium">新規会員登録</span>
        </motion.section>
      )}
      <motion.section
        key={currentForm}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${currentForm === 1 ? "tw-mt-10" : ""} tw-w-full`}
      >
        {currentForm === "1" && <SignupStepOne onComplete={handleStepOne} />}
        {currentForm === "2" && <SignupStepTwo onComplete={handleStepTwo} />}
        {currentForm === "3" && (
          <SignupStepThree onComplete={handleStepThree} isLoading={isLoading} />
        )}
        {currentForm === "complete" && (
          <SignupStepFour registeredEmail={registeredEmail} />
        )}
      </motion.section>
      {currentForm !== "complete" && (
        <section className="tw-mt-6">
          <span
            onClick={() => router.push("/auth/login")}
            className="tw-tracking-[0.14px] tw-cursor-pointer"
          >
            アカウントを既にお持ちの方は<u>こちら</u>
          </span>
        </section>
      )}
    </div>
  );
};

export default AuthSignup;
