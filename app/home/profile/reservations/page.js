"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import Image from "next/image";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import ReservationCard from "@/app/_components/home/profile/reservation/ReservationCard";

const filters = [
  {
    id: null,
    text: "予約中",
    dataIndex: "",
  },
  {
    id: 2,
    text: "過去",
    dataIndex: "",
  },
  {
    id: 3,
    text: "キャンセル",
    dataIndex: "",
  },
];

const ReservationHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.reservation.getMany();
    if (isOk) {
      setReservations(data);
    }
    setIsLoading(false);
  };

  const onFilterChange = (id) => {
    if (id === activeFilterId) return setActiveFilterId(null);
    setActiveFilterId(id);
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
                onClick={() => onFilterChange(filter.id)}
                style={{
                  borderColor: activeFilterId === filter.id && "#B7DDFF",
                  color: activeFilterId === filter.id && "#1890FF",
                }}
              >
                <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                  <span>{filter.text}</span>
                  {activeFilterId && activeFilterId === filter.id ? (
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
