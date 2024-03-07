import { useState } from "react";

const SwitchSlider = ({ options, setActiveStepId }) => {
  const [indicatorPosition, setIndicatorPosition] = useState(2);
  const onOptionClick = (e, option) => {
    setIndicatorPosition(e.target.offsetLeft);
    setActiveStepId(option.id);
  };

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
                onClick={(e) => onOptionClick(e, option)}
                key={option.id}
                className={`tw-cursor-pointer tw-h-[30px] tw-w-[110px] tw-rounded-full tw-flex tw-justify-center tw-items-center tw-z-10`}
              >
                {option.text}
              </section>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default SwitchSlider;
