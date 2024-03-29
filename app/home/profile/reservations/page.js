"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import ReservationCard from "@/app/_components/home/profile/reservation/ReservationCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";

const filters = [
  {
    id: ReservationStatusEnum.ACTIVE,
    text: "予約中",
    dataIndex: "",
  },
  {
    id: ReservationStatusEnum.CHECK_OUT,
    text: "過去",
    dataIndex: "",
  },
  {
    id: ReservationStatusEnum.CANCELLED,
    text: "キャンセル",
    dataIndex: "",
  },
];

const ReservationHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [reservations, setReservations] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState(
    ReservationStatusEnum.ACTIVE
  );

  useEffect(() => {
    fetchReservations();
  }, [activeFilterId]);

  const fetchReservations = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.reservation.getMany({
      status: activeFilterId,
    });
    if (isOk) {
      setReservations(data);
    }
    setIsLoading(false);
  };

  const cancelReservation = async ({ id }) => {
    setIsRequesting(true);
    const { isOk } = await $api.member.reservation.cancel(id);
    if (isOk) {
      await fetchReservations();
    }
    setIsRequesting(false);
  };

  const onFilterChange = ({ id }) => {
    if (id === activeFilterId)
      return setActiveFilterId(ReservationStatusEnum.ACTIVE);
    setActiveFilterId(id);
  };

  const isFilterActive = ({ id }) => {
    return activeFilterId === id;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">予約履歴</span>
        </section>
        <section className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-2">
          {filters.map((filter) => {
            return (
              <Button
                key={filter.text}
                onClick={() => onFilterChange(filter)}
                style={{
                  borderColor: isFilterActive(filter) && "#B7DDFF",
                  color: isFilterActive(filter) && "#1890FF",
                }}
              >
                <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                  <span>{filter.text}</span>
                  {activeFilterId !== ReservationStatusEnum.ACTIVE &&
                  isFilterActive(filter) ? (
                    <Image
                      src="/assets/branch/close-icon-blue.svg"
                      alt="remove"
                      width={0}
                      height={0}
                      style={{ width: "auto", height: "auto" }}
                    />
                  ) : null}
                </div>
              </Button>
            );
          })}
        </section>

        {!isLoading ? (
          <>
            {reservations?.length ? (
              <>
                {reservations.map((reservation) => {
                  return (
                    <section
                      key={reservation.id}
                      className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow"
                    >
                      <div className="tw-flex tw-flex-col tw-gap-4 tw-relative">
                        <ReservationCard
                          reservation={reservation}
                          activeFilterId={activeFilterId}
                          isRequesting={isRequesting}
                          cancelReservation={cancelReservation}
                        />
                      </div>
                    </section>
                  );
                })}
              </>
            ) : (
              <NoData message={"履歴が存在しません。"} />
            )}
          </>
        ) : (
          <FullScreenLoading />
        )}
      </div>
    </>
  );
};

export default ReservationHistory;
