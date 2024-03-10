"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useReservationStore } from "@/app/_store/reservation";

const BranchDetailCard = ({ branch }) => {
  const router = useRouter();
  const setBranch = useReservationStore((state) => state.setBody);
  const [isHomeBranch, setIsHomeBranch] = useState(false);

  const handleMakeReservation = () => {
    setBranch({ branch: branch });
    router.push("/home/reservation");
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-flex tw-flex-col tw-gap-1">
          <div className="tw-w-full tw-h-[285px] tw-bg-gray-200 tw-rounded-xl"></div>
          <span className="tw-text-xxl tw-font-medium">
            {nullSafety(branch.name)}
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
              <Image
                src="/assets/branch/schedule-icon.svg"
                alt="schedule"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="tw-text-lg">営業時間</span>
            </div>
            <p className="tw-whitespace-pre-line">
              {nullSafety(branch.business_hours)}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
              <Image
                src="/assets/branch/location-icon.svg"
                alt="location"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="tw-text-lg">住所</span>
            </div>
            <p className="tw-whitespace-normal">
              {`${nullSafety(branch.address1)} ${nullSafety(
                branch.address2
              )} ${nullSafety(branch.address3)}`}
            </p>
          </div>
        </section>
        <section className="tw-w-full tw-rounded-xl tw-border tw-border-info tw-p-4">
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            年中無休（年末年始を除く）
            ※閉店30分前の最終受付時間はトレーニングのみとなります。
          </p>
        </section>
        <section className="tw-w-full tw-rounded-xl tw-border tw-border-info tw-p-4 tw-flex tw-justify-between tw-items-center">
          <Image
            src="/assets/branch/warning-icon.svg"
            alt="warning"
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
          <span className="tw-text-sm tw-tracking-[0.12px]">
            予約するにはチケットが必要です。
          </span>
          <Button size="small">買う</Button>
        </section>
        <section className="tw-py-6">
          <Checkbox
            checked={isHomeBranch}
            onChange={(e) => setIsHomeBranch(e.target.checked)}
          >
            所属店舗にする。
          </Checkbox>
        </section>
        <section className="tw-mt-1">
          <Button
            onClick={handleMakeReservation}
            size="large"
            type="primary"
            className="tw-w-full"
          >
            予約する
          </Button>
        </section>
      </div>
    </>
  );
};

export default BranchDetailCard;
