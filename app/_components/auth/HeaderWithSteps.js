"use client";

import Image from "next/image";

const MainHeader = ({ onStepBack }) => {
  return (
    <div className="tw-h-[84px] tw-w-full tw-bg-primary tw-relative">
      <div
        className={`tw-absolute tw-left-4 tw-right-4 tw-bottom-3 tw-flex tw-justify-between tw-items-center`}
      >
        <Image
          src="/assets/back-arrow-white.svg"
          alt="back"
          width={0}
          height={0}
          onClick={onStepBack}
          style={{
            cursor: "pointer",
            width: "auto",
            height: "auto",
          }}
        />
        <Image
          priority
          src="/assets/logo-white.png"
          alt="logo"
          width={158}
          height={24}
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        />
        <span className="tw-w-[28px] tw-h-[28px]"></span>
      </div>
    </div>
  );
};

export default MainHeader;
