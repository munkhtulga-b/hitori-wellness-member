"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useReservationStore } from "@/app/_store/reservation";
import { nullSafety } from "@/app/_utils/helpers";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import ReservationEnum from "@/app/_enums/EEnumReservation";
import _ from "lodash";
import $api from "@/app/_api";

const ReservationConfirm = () => {
  const router = useRouter();
  const reservationBody = useReservationStore((state) => state.getBody());
  const editReservationBody = useReservationStore((state) => state.editBody);
  const resetReservationBody = useReservationStore((state) => state.resetBody);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyType, setBodyType] = useState(null);

  useLayoutEffect(() => {
    // Check if all fields are filled
    if (_.some(reservationBody, (value) => value === null)) {
      return router.push("/home/");
    }
  }, []);

  const createReservation = async () => {
    setIsLoading(true);
    const body = {
      studioId: reservationBody.branch?.id,
      programId: reservationBody.program?.id,
      startAt: reservationBody.time[0],
      endAt: reservationBody.time[reservationBody.time?.length - 1],
    };
    if (reservationBody.ticket) {
      body["memberTicketId"] = reservationBody.ticket.ticket_id;
    }
    const { isOk } = await $api.member.reservation.create(body);
    if (isOk) {
      resetReservationBody();
      router.push("/home/reservation/success");
    }
    setIsLoading(false);
  };

  const updateReservation = async () => {
    setIsLoading(true);
    const body = {
      studioId: reservationBody.branch?.id,
      programId: reservationBody.program?.id,
      startAt: reservationBody.time[0],
      endAt: reservationBody.time[reservationBody.time?.length - 1],
    };
    const { isOk } = await $api.member.reservation.update(
      reservationBody.id,
      body
    );
    if (isOk) {
      resetReservationBody();
      router.push("/home/reservation/success");
    }
    setIsLoading(false);
  };

  const handleEdit = (type) => {
    setBodyType(type);
    setIsModalOpen(true);
  };

  const handleEditConfirm = () => {
    editReservationBody(bodyType);
    setIsModalOpen(false);
    if (bodyType === "branch") {
      router.push(`/home/`);
    }
    if (bodyType === ReservationEnum.PROGRAM.queryString) {
      router.push(
        `/home/reservation?select=${ReservationEnum.PROGRAM.queryString}`
      );
    }
    if (bodyType === ReservationEnum.COACH.queryString) {
      router.push(
        `/home/reservation?select=${ReservationEnum.COACH.queryString}`
      );
    }
    if (bodyType === ReservationEnum.TIMESLOT.queryString) {
      router.push(
        `/home/reservation?select=${ReservationEnum.TIMESLOT.queryString}`
      );
    }
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
                <Button
                  disabled={reservationBody.id}
                  onClick={() => handleEdit("branch")}
                  size="small"
                >
                  変更
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
                  変更
                </Button>
              </div>
              <div>
                <span className="tw-text-lg">
                  {nullSafety(reservationBody?.program?.name)}
                </span>
              </div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: nullSafety(reservationBody?.program?.description),
                  }}
                  className="tw-tracking-[0.14px] tw-leading-[22px] tw-text-secondary tw-line-clamp-3"
                ></p>
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
                  変更
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
          {reservationBody?.time?.length ? (
            <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src={`/assets/confirm/time-blue.svg`}
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-grow tw-text-lg">日時</span>
                <Button onClick={() => handleEdit("time")} size="small">
                  変更
                </Button>
              </div>
              <div>
                <span className="tw-text-secondary">
                  {`${dayjs
                    .utc(reservationBody?.time[0])
                    .format("YYYY/MM/DD")}(${dayjs
                    .utc(reservationBody?.time[0])
                    .format("ddd")}) ${dayjs
                    .utc(reservationBody?.time[0])
                    .format("HH:mm")} ~ ${dayjs
                    .utc(
                      reservationBody?.time[reservationBody?.time?.length - 1]
                    )
                    .format("HH:mm")}`}
                </span>
              </div>
            </section>
          ) : null}
        </div>
        <div>
          <Button
            loading={isLoading}
            onClick={() =>
              reservationBody.id ? updateReservation() : createReservation()
            }
            type="primary"
            size="large"
            className="tw-w-full"
          >
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
              ※変更の場合、選択の順番に応じて選択内容が削除されます。
            </p>
          </section>
          <section className="tw-flex tw-justify-center">
            <Button
              onClick={() => handleEditConfirm()}
              type="primary"
              size="large"
            >
              変更する
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default ReservationConfirm;
