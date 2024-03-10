"use client";

import { useState, useEffect } from "react";
import { useReservationStore } from "@/app/_store/reservation";
import Image from "next/image";

const SwitchSlider = ({ options, activeStepId, setActiveStepId }) => {
  const reservationBody = useReservationStore((state) => state.getBody());
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    const el = document.getElementById(`slider-option-${activeStepId}`);
    if (el) {
      setIndicatorPosition(el.offsetLeft);
    }
  }, [activeStepId]);

  return (
    <>
      {options?.length ? (
        <div className="tw-flex tw-justify-between tw-items-center tw-rounded-full tw-p-[2px] tw-bg-grayMedium tw-relative">
          <div
            style={{ left: `${indicatorPosition}px` }}
            className="tw-absolute tw-h-[30px] tw-w-[110px] tw-rounded-full tw-bg-white tw-z-0 tw-transition-all tw-duration-300"
          ></div>
          {options.map((option) => {
            return (
              <section
                id={`slider-option-${option.id}`}
                onClick={() => setActiveStepId(option.id)}
                key={option.id}
                className={`tw-cursor-pointer tw-h-[30px] tw-w-[110px] tw-rounded-full tw-flex tw-justify-center tw-items-center tw-gap-2 tw-z-10`}
              >
                <span>{option.text}</span>
                {reservationBody[option.dataIndex] ? (
                  <Image
                    src="/assets/step-completed.svg"
                    alt="completed"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default SwitchSlider;
