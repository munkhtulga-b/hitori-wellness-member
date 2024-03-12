import Image from "next/image";

const PaymentHistory = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">支払歴</span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-4 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
          <ul className="tw-flex tw-flex-col tw-gap-4">
            <li className="tw-flex tw-justify-start">
              <section className="tw-w-[30%]">
                <span className="tw-text-sm tw-tracking-[0.12px]">
                  注文番号
                </span>
              </section>
              <section className="tw-grow">
                <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                  43801
                </span>
              </section>
            </li>
            <li className="tw-flex tw-justify-start">
              <section className="tw-w-[30%]">
                <span className="tw-text-sm tw-tracking-[0.12px]">店舗</span>
              </section>
              <section className="tw-grow">
                <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                  KARADA BESTA Umeda store
                </span>
              </section>
            </li>
            <li className="tw-flex tw-justify-start">
              <section className="tw-w-[30%]">
                <span className="tw-text-sm tw-tracking-[0.12px]">
                  購入日時
                </span>
              </section>
              <section className="tw-grow">
                <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                  2024-01-01 00:00
                </span>
              </section>
            </li>
            <li className="tw-flex tw-justify-start">
              <section className="tw-w-[30%]">
                <span className="tw-text-sm tw-tracking-[0.12px]">
                  決済カード
                </span>
              </section>
              <section className="tw-grow">
                <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                  xxxx xxxx xxxx 5678
                </span>
              </section>
            </li>
          </ul>
          <div className="tw-bg-dividerLight tw-h-[1px] tw-w-full"></div>
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-4">
            <section className="tw-grow tw-flex tw-flex-col tw-gap-2">
              <span className="tw-text-sm tw-tracking-[0.12px]">購入詳細</span>
              <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                「特別なご縁キャンペーンです」初回予約券×1枚
              </p>
            </section>
            <Image
              src="/assets/profile/arrow-right.svg"
              alt="go"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default PaymentHistory;
