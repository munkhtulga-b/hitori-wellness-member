// import { Button } from "antd";
import NoData from "@/app/_components/custom/NoData";
// import Image from "next/image";

const CheckInHistory = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">入館記録</span>
        </section>

        {/* <section className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-2">
          <Button>全て
</Button>
          <Button>チェックイン</Button>
          <Button>チェックアウト</Button>
        </section> */}

        {/* <section className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow">
          <div className="tw-flex tw-justify-start tw-items-start tw-gap-3">
            <section className="tw-flex tw-flex-col">
              <Image
                src="/assets/profile/check-in-history/check-in.svg"
                alt="check-in"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="tw-text-xs tw-leading-5 tw-tracking-[0.1px]">
                チェックアウト
              </span>
            </section>
            <section className="tw-bg-dividerMedium tw-w-[1px] tw-self-stretch"></section>
            <section className="tw-grow">
              <ul className="tw-flex tw-flex-col tw-gap-2">
                <li className="tw-flex tw-justify-start tw-gap-2">
                  <span className="tw-text-sm tw-tracking-[0.12px] tw-w-[20%]">
                    日時
                  </span>
                  <span className="tw-text-sm tw-text-grayLight tw-tracking-[0.12px]">
                    2024/01/03(土) 07:00-07:30
                  </span>
                </li>
                <li className="tw-flex tw-justify-start tw-gap-2">
                  <span className="tw-text-sm tw-tracking-[0.12px] tw-w-[20%]">
                    店舗
                  </span>
                  <span className="tw-text-sm tw-text-grayLight tw-tracking-[0.12px]">
                    KARADA BESTA Umeda store
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </section> */}

        <NoData message={`記録がありません。`} />
      </div>
    </>
  );
};

export default CheckInHistory;
