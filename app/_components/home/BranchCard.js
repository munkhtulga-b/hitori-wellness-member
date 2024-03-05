import Image from "next/image";

const BranchCard = () => {
  return (
    <div className="tw-p-2 tw-rounded-[16px] tw-shadow tw-w-fit tw-snap-center">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <section className="tw-rounded-xl tw-min-h-[190px] tw-max-h-[190px] tw-min-w-[220px] tw-max-w-[220px] tw-overflow-hidden tw-bg-gray-200"></section>
        <section className="tw-flex tw-flex-col tw-gap-1 tw-max-w-[220px]">
          <span className="tw-text-lg">KARADA BESTA Ginza store</span>
          <div className="tw-flex tw-flex-col tw-gap-[2px]">
            <section className="tw-flex tw-justify-start tw-items-center tw-gap-1">
              <Image
                src="/assets/branch/location-icon.svg"
                alt="location"
                width={20}
                height={20}
              />
              <span className="tw-tracking-[0.14px]">位置</span>
            </section>
            <section>
              <p className="tw-text-sm tw-tracking-[0.12px]">
                104-0061 東京都中央区築地1-10-11 RATIO広路701
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BranchCard;
