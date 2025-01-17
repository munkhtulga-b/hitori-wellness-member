import { useState } from "react";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import $api from "@/app/_api";
import { toast } from "react-toastify";

const ReservationCard = ({
  reservation,
  activeFilter,
  editReservation,
  fetchList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const cancelReservation = async ({ id }) => {
    setIsRequesting(true);
    const { isOk } = await $api.member.reservation.cancel(id);
    if (isOk) {
      await fetchList();
      setIsModalOpen(false);
      toast.success("キャンセルされました。");
    }
    setIsRequesting(false);
  };

  const isNotCancellable = ({ start_at }) => {
    let result = true;
    if (start_at) {
      const timeDifference = dayjs(dayjs.utc(start_at)).diff(dayjs(), "hour");
      result = timeDifference >= 24 ? false : true;
    }
    return result;
  };

  return (
    <>
      <>
        {activeFilter?.id === ReservationStatusEnum.CANCELLED ||
        activeFilter?.id === ReservationStatusEnum.AUTOMATIC_CANCELLATION ? (
          <section className="tw-absolute tw-top-4 tw--right-4 tw-rotate-[38deg]">
            <span className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-py-[2px] tw-px-2 tw-rounded-full tw-shadow">
              {activeFilter?.text}
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
            <span className="tw-grow tw-text-lg">予約日時</span>
          </div>
          <span className="tw-text-secondary tw-leading-[22px] tw-tracking-[0.14px]">
            {`${dayjs.utc(reservation.start_at).format("YYYY/MM/DD")}(${dayjs(
              reservation.start_at
            ).format("ddd")}) ${dayjs
              .utc(reservation.start_at)
              .format("HH:mm")} ~ ${dayjs
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
          <p
            dangerouslySetInnerHTML={{
              __html: nullSafety(reservation.m_program?.description),
            }}
            className="tw-text-secondary tw-text-sm tw-tracking-[0.12px] tw-whitespace-pre-line"
          ></p>
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
        {activeFilter?.id === ReservationStatusEnum.ACTIVE ? (
          <>
            {reservation.m_program?.cancellation_policy ? (
              <section className="tw-p-2 tw-rounded-xl tw-border-2 tw-border-info">
                <p className="tw-leading-[22px] tw-tracking-[0.14px]">
                  {nullSafety(reservation.m_program?.cancellation_policy)}
                </p>
              </section>
            ) : null}

            <section className="tw-flex tw-justify-end tw-gap-2">
              <Button
                disabled={isNotCancellable(reservation)}
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                キャンセルする
              </Button>
              <Button
                disabled={isNotCancellable(reservation)}
                type="primary"
                size="large"
                className="tw-w-[128px]"
                onClick={() => editReservation(reservation)}
              >
                変更
              </Button>
            </section>
          </>
        ) : null}
      </>

      <Modal
        title="注意事項"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-6">
          <section className="tw-rounded-xl tw-border-2 tw-border-warning tw-p-4">
            <p className="tw-leading-[26px] tw-tracking-[0.14px]">
              ※キャンセルは取り消すことはできません。本当にキャンセルしますか？
            </p>
          </section>
          <section className="tw-flex tw-justify-end tw-items-center tw-gap-2">
            <Button
              onClick={() => setIsModalOpen(false)}
              size="large"
              className="tw-w-auto"
            >
              戻る
            </Button>
            <Button
              onClick={() => cancelReservation(reservation)}
              loading={isRequesting}
              type="primary"
              size="large"
              className="tw-w-auto"
            >
              キャンセルする
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default ReservationCard;
