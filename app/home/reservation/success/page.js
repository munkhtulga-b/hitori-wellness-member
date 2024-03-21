"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";

const ReservationSuccess = () => {
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
        <section className="tw-mt-[100px]">
          <SuccessAnimation />
        </section>
        <section className="tw-bg-grayLight tw-p-4 tw-h-[80px] tw-rounded-[12px] tw-border tw-border-info tw-w-full tw-grid tw-place-items-center">
          <span className="tw-tracking-[0.14px] tw-leading-[26px]">
            予約が完了しました。
          </span>
        </section>
        <section className="tw-w-full">
          <Button
            onClick={() => router.push("/home")}
            size="large"
            type="primary"
            className="tw-w-full"
          >
            ホームページへ戻る
          </Button>
        </section>
      </div>
    </>
  );
};

export default ReservationSuccess;
