import Image from "next/image";

const CreditCards = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            保存しているクレジットカード
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2">
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            クレジットカード
          </span>
          <div className="tw-h-[184px] tw-w-full tw-rounded-xl tw-shadow tw-bg-white tw-grid tw-place-items-center">
            <div className="tw-flex tw-flex-col tw-gap-1 tw-items-center">
              <Image
                src="/assets/profile/credit-cards/add-card-icon.svg"
                alt="add-card"
                width={0}
                height={0}
                style={{ height: "auto", width: "auto" }}
              />
              <span className="tw-text-lg">カードを追加する</span>
              <p className="tw-text-sm tw-tracking-[0.12px]">
                ここを押してカードの追加が可能です
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreditCards;
