// import Image from "next/image";

const MainHeader = () => {
  return (
    <div className="tw-h-[84px] tw-w-full tw-bg-primary tw-relative">
      {/* <Image
        src="/assets/logo-white.png"
        alt="Logo"
        width={0}
        height={0}
        style={{
          height: "auto",
          width: "auto",
          position: "absolute",
          bottom: "12px",
          left: "16px",
        }}
      /> */}
      <span className="tw-text-white tw-absolute tw-left-4 tw-bottom-3">
        MIRROR FIT
      </span>
    </div>
  );
};

export default MainHeader;
