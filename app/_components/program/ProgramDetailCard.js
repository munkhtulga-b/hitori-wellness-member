"use client";

// import Image from "next/image";
import { useCallback } from "react";
import { nullSafety } from "@/app/_utils/helpers";
import { Button } from "antd";
import { useReservationStore } from "@/app/_store/reservation";
import { useRouter, useSearchParams } from "next/navigation";
import ReservationEnum from "@/app/_enums/EEnumReservation";

const ProgramDetailCard = ({ program }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setProgram = useReservationStore((state) => state.setBody);

  const onProgramSelect = () => {
    setProgram({ program: program });
    router.push(
      `/home/reservation?${createQueryString(
        "select",
        ReservationEnum.PROGRAM.next
      )}`
    );
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
          <Button
            onClick={() => onProgramSelect()}
            size="large"
            type="primary"
            className="tw-w-full"
          >
            選ぶ
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProgramDetailCard;
