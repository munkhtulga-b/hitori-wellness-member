import { Button } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";

const ReservationCard = ({ reservation, activeFilterId }) => {
  return (
    <>
      <>
        {activeFilterId === 3 ? (
          <section className="tw-absolute tw-top-4 tw--right-4 tw-rotate-[38deg]">
            <span className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-py-[2px] tw-px-2 tw-rounded-full tw-shadow">
              キャンセル済み
            </span>
          </section>
        ) : null}
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/time-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">日付時刻</span>
          </div>
          <span className="tw-text-secondary tw-leading-[22px] tw-tracking-[0.14px]">
            {`${dayjs.utc(reservation.start_at).format("YYYY/MM/DD")}(${dayjs(
              reservation.start_at
            ).format("ddd")}) ${dayjs
              .utc(reservation.start_at)
              .format("HH:mm")}-${dayjs
              .utc(reservation.end_at)
              .format("HH:mm")}`}
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/location-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">店舗</span>
          </div>
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            {nullSafety(reservation.m_studio?.name)}
          </span>
          <span className="tw-text-secondary tw-text-sm tw-tracking-[0.12px]">
            {`${nullSafety(reservation.m_studio?.address1)} ${nullSafety(
              reservation.m_studio?.address2
            )} ${nullSafety(reservation.m_studio?.address3)}`}
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/program-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">プログラム</span>
          </div>
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            {nullSafety(reservation.m_program?.name)}
          </span>
          <span className="tw-text-secondary tw-text-sm tw-tracking-[0.12px]">
            {nullSafety(reservation.m_program?.description)}
          </span>
        </section>
        {/* <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/coach-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">プログラム</span>
          </div>
          <div className="tw-flex tw-justify-start tw-items-start tw-gap-3">
            <section className="tw-bg-gray-200 tw-rounded-full tw-w-[60px] tw-h-[60px]"></section>
            <section>
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                齋藤航平
              </span>
            </section>
          </div>
        </section> */}
        {activeFilterId === null &&
        reservation.m_program?.cancellation_policy ? (
          <>
            <section className="tw-p-2 tw-rounded-xl tw-border-2 tw-border-info">
              <p className="tw-leading-[22px] tw-tracking-[0.14px]">
                {nullSafety(reservation.m_program?.cancellation_policy)}
              </p>
            </section>

            <section className="tw-flex tw-justify-end tw-gap-2">
              <Button size="large" className="tw-w-[128px]">
                キャンセル
              </Button>
              <Button type="primary" size="large" className="tw-w-[128px]">
                編集
              </Button>
            </section>
          </>
        ) : null}
      </>
    </>
  );
};

export default ReservationCard;
