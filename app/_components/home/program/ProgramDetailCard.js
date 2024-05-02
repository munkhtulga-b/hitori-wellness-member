"use client";

// import Image from "next/image";
import { useCallback } from "react";
import { nullSafety } from "@/app/_utils/helpers";
import { Button } from "antd";
import { useReservationStore } from "@/app/_store/reservation";
import { useRouter, useSearchParams } from "next/navigation";
import ReservationEnum from "@/app/_enums/EEnumReservation";
import Image from "next/image";
import dayjs from "dayjs";

const ProgramDetailCard = ({ program }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getReservationBody = useReservationStore((state) => state.getBody());
  const setReservationBody = useReservationStore((state) => state.setBody);

  const onProgramSelect = () => {
    setReservationBody({ program: program });
    if (!getReservationBody.time) {
      router.push(
        `/home/reservation?${createQueryString(
          "select",
          ReservationEnum.PROGRAM.next
        )}`
      );
    } else {
      setReservationBody({
        time: [
          getReservationBody.time[0],
          dayjs(getReservationBody.time[0]).add(
            program.service_minutes,
            "minutes"
          ),
        ],
      });
      router.push("/home/reservation/confirm");
    }
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
            <div
              className={`tw-w-full tw-h-[230px] tw-bg-gray-200 tw-rounded-xl tw-overflow-hidden`}
            >
              {program.thumbnail_code ? (
                <Image
                  priority
                  src={`https://${process.env.BASE_IMAGE_URL}${program.thumbnail_code}`}
                  alt="thumbnail"
                  width={0}
                  height={0}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                  unoptimized
                />
              ) : null}
            </div>
            <span className="tw-text-xxl tw-font-medium">
              {nullSafety(program.name)}
            </span>
          </section>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: nullSafety(program.description),
              }}
              className="tw-leading-[22px] tw-tracking-[0.14px]"
            ></p>
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
