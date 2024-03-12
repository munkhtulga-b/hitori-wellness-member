"use client";

import { useState, useEffect } from "react";
import { useReservationStore } from "@/app/_store/reservation";
import Image from "next/image";

const SwitchSlider = ({ options, activeStepId, setActiveStepId }) => {
  const reservationBody = useReservationStore((state) => state.getBody());
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [optionWidth, setOptionWidth] = useState(0);

  useEffect(() => {
    const container = document.getElementById("slider-container");
    const el = document.getElementById(`slider-option-${activeStepId}`);
    if (el && container) {
      setOptionWidth((container.offsetWidth - 4) / options.length);
      setTimeout(() => {
        setIndicatorPosition(el.offsetLeft);
      }, 100);
    }
  }, [activeStepId]);

  return (
    <>
      {options?.length ? (
        <div
          id="slider-container"
          className="tw-flex tw-justify-between tw-items-center tw-rounded-full tw-p-[2px] tw-bg-grayMedium tw-relative"
        >
          <div
            style={{
              left: `${indicatorPosition}px`,
              width: `${optionWidth}px`,
            }}
            className="tw-absolute tw-h-[30px] tw-rounded-full tw-bg-white tw-z-0 tw-transition-all tw-duration-300"
          ></div>
          {options.map((option) => {
            return (
              <section
                id={`slider-option-${option.id}`}
                onClick={() => setActiveStepId(option.id)}
                key={option.id}
                className={`tw-cursor-pointer tw-h-[30px] tw-rounded-full tw-flex tw-justify-center tw-items-center tw-gap-2 tw-z-10`}
                style={{ width: `${optionWidth}px` }}
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
