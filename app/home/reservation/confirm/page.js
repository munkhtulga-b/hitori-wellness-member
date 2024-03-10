"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useReservationStore } from "@/app/_store/reservation";
import { nullSafety } from "@/app/_utils/helpers";

const ReservationConfirm = () => {
  const reservationBody = useReservationStore((state) => state.getBody());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (type) => {
    console.log(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-justify-between tw-gap-4 tw-h-full">
        <div className="tw-flex tw-flex-col tw-gap-4">
          {reservationBody?.branch ? (
            <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src={`/assets/confirm/location-blue.svg`}
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-grow tw-text-lg">店舗</span>
                <Button onClick={() => handleEdit("branch")} size="small">
                  編集
                </Button>
              </div>
              <div>
                <span className="tw-text-lg">
                  {nullSafety(reservationBody?.branch?.name)}
                </span>
              </div>
              <div>
                <p className="tw-tracking-[0.14px] tw-leading-[22px] tw-text-secondary">
                  {`${nullSafety(
                    reservationBody?.branch?.address1
                  )} ${nullSafety(
                    reservationBody?.branch?.address2
                  )} ${nullSafety(reservationBody?.branch?.address3)}`}
                </p>
              </div>
            </section>
          ) : null}
          {reservationBody?.program ? (
            <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src={`/assets/confirm/program-blue.svg`}
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-grow tw-text-lg">プログラム</span>
                <Button onClick={() => handleEdit("program")} size="small">
                  編集
                </Button>
              </div>
              <div>
                <span className="tw-text-lg">
                  {nullSafety(reservationBody?.program?.name)}
                </span>
              </div>
              <div>
                <p className="tw-tracking-[0.14px] tw-leading-[22px] tw-text-secondary tw-line-clamp-3">
                  {nullSafety(reservationBody?.program?.description)}
                </p>
              </div>
            </section>
          ) : null}
          {reservationBody?.coach ? (
            <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src={`/assets/confirm/coach-blue.svg`}
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-grow tw-text-lg">プログラム</span>
                <Button onClick={() => handleEdit("coach")} size="small">
                  編集
                </Button>
              </div>
              <div className="tw-flex tw-justify-start tw-items-start tw-gap-3">
                <section className="tw-bg-gray-200 tw-rounded-full tw-min-w-[60px] tw-max-w-[60px] tw-min-h-[60px] tw-max-h-[60px]"></section>
                <section>
                  <p className="tw-tracking-[0.14px] tw-leading-[22px]">
                    齋藤航平
                  </p>
                </section>
              </div>
            </section>
          ) : null}
          {reservationBody?.time ? (
            <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src={`/assets/confirm/time-blue.svg`}
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-grow tw-text-lg">プログラム</span>
                <Button onClick={() => handleEdit("time")} size="small">
                  日時
                </Button>
              </div>
              <div>
                <span className="tw-text-secondary">
                  2024/01/03(土) 07:00-07:30
                </span>
              </div>
            </section>
          ) : null}
        </div>
        <div>
          <Button type="primary" size="large" className="tw-w-full">
            確定
          </Button>
        </div>
      </div>

      <Modal
        title="注意事項。"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-6">
          <section className="tw-rounded-xl tw-border-2 tw-border-warning tw-p-4">
            <p className="tw-leading-[26px] tw-tracking-[0.14px]">
              ※編集の場合、選択の順番に応じて選択内容が削除されます。
            </p>
          </section>
          <section className="tw-flex tw-justify-center">
            <Button type="primary" size="large">
              編集する
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default ReservationConfirm;
