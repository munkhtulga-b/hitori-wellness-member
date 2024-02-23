"use client";

import HeaderWithSteps from "@/app/_components/auth/HeaderWithSteps";
import SuccessAnimation from "@/app/_components/animation/SuccessAnimation";
import { Button } from "antd";
import $api from "@/app/_api";

const VerifyEmail = () => {
  const verifyEmail = async () => {
    const { status } = await $api.auth.verify("123456");
    console.log(status);
  };

  return (
    <div className="tw-flex tw-flex-col">
      <HeaderWithSteps onStepBack={() => {}} />
      <div className="tw-py-[28px] tw-px-5">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-[68px]">
          <SuccessAnimation />
          <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info tw-w-full">
            <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
              メールアドレスの確認ができました。
            </p>
          </section>
          <section className="tw-w-full">
            <Button
              onClick={verifyEmail}
              type="primary"
              htmlType="submit"
              className="tw-w-full"
            >
              ログインページへ戻る
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
