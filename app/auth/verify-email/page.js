"use client";

import StatusAnimation from "@/app/_components/animation/StatusAnimation";
import { Button } from "antd";
import $api from "@/app/_api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerificationSuccessful, setIsVerificationSuccessful] =
    useState(false);

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    setIsLoading(true);
    const verifyToken = searchParams.get("token");
    if (verifyToken) {
      const { status, isOk } = await $api.auth.verify(verifyToken);
      if (isOk || status === 200) {
        setIsVerificationSuccessful(true);
      }
    }
    setIsLoading(false);
  };

  const SuccessComponent = () => {
    return (
      <>
        <StatusAnimation />
        <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info tw-w-full">
          <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
            メールアドレスの確認ができました。
          </p>
        </section>
        <section className="tw-w-full">
          <Button
            onClick={() => router.push("/")}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            ログインページへ戻る
          </Button>
        </section>
      </>
    );
  };

  const ErrorComponent = () => {
    return (
      <>
        <StatusAnimation type={"error"} />
        <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info tw-w-full">
          <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
            Oops, something went wrong!
          </p>
        </section>
        <section className="tw-w-full">
          <Button
            onClick={() => router.push("/")}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            Back to login
          </Button>
        </section>
      </>
    );
  };

  const LoadingComponent = () => {
    return (
      <>
        <section className="tw-bg-gray-200 tw-rounded-xl tw-w-full tw-h-[60px] tw-animate-pulse"></section>
        <section className="tw-bg-gray-200 tw-rounded-xl tw-w-full tw-h-[80px] tw-animate-pulse"></section>
        <section className="tw-bg-gray-200 tw-rounded-xl tw-w-full tw-h-[48px] tw-animate-pulse"></section>
      </>
    );
  };

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-py-[28px] tw-px-5">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-[68px]">
          {isLoading ? (
            LoadingComponent()
          ) : (
            <>
              {isVerificationSuccessful ? SuccessComponent() : ErrorComponent()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
