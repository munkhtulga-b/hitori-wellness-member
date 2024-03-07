"use client";

// import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { Button } from "antd";

const ProgramDetailCard = ({ program }) => {
  return (
    <>
      <div className="tw-flex tw-flex-col">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <section className="tw-flex tw-flex-col tw-gap-1">
            <div className="tw-w-full tw-h-[150px] tw-bg-gray-200 tw-rounded-xl"></div>
            <span className="tw-text-xxl tw-font-medium">
              {nullSafety(program.name)}
            </span>
          </section>
          <section>
            <p className="tw-leading-[22px] tw-tracking-[0.14px]">
              {nullSafety(program.description)}
            </p>
          </section>
          <section className="tw-p-4 tw-rounded-xl tw-border tw-border-info">
            <p className="w-leading-[26px] tw-tracking-[0.14px]">
              {nullSafety(program.cancellation_policy)}
            </p>
          </section>
        </div>
        <div className="tw-mt-10">
          <Button size="large" type="primary" className="tw-w-full">
            選ぶ
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProgramDetailCard;
