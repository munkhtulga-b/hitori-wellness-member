"use client";

import { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import Image from "next/image";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import ReservationCard from "@/app/_components/home/profile/reservation/ReservationCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import { useReservationStore } from "@/app/_store/reservation";
import { useRouter } from "next/navigation";

const filters = [
  {
    id: ReservationStatusEnum.ACTIVE,
    text: "予約中",
    dataIndex: "",
  },
  {
    id: ReservationStatusEnum.CHECK_IN,
    text: "過去",
    dataIndex: "",
  },
  {
    id: ReservationStatusEnum.CANCELLED,
    text: "キャンセル",
    dataIndex: "",
  },
  {
    id: ReservationStatusEnum.AUTOMATIC_CANCELLATION,
    text: "無断キャンセル",
    dataIndex: "",
  },
];

const ReservationHistory = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState(null);
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const resetReservationBody = useReservationStore((state) => state.resetBody);
  const setReservationBody = useReservationStore((state) => state.setBody);
  const setReservationEdit = useReservationStore((state) => state.setEdit);

  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
    total: 0,
  });

  useEffect(() => {
    fetchReservations({
      status: activeFilter?.id,
      page: pagination.current - 1,
      limit: pagination.size,
    });
  }, []);

  const fetchReservations = async (queries) => {
    setIsLoading(true);
    const { isOk, data, range } = await $api.member.reservation.getMany(
      queries
        ? queries
        : {
            status: activeFilter?.id,
            page: pagination.current - 1,
            limit: pagination.size,
          }
    );
    if (isOk) {
      setReservations(data);
      setPagination((prev) => ({
        ...prev,
        total: Number(range?.split("/")[1]),
      }));
    }
    setIsLoading(false);
  };

  const editReservation = (reservation) => {
    resetReservationBody();
    setReservationBody({
      id: reservation.id,
      branch: reservation.m_studio,
      program: reservation.m_program,
      time: [reservation.start_at, reservation.end_at],
    });
    if (reservation.memberTicket) {
      setReservationBody({
        ticket: {
          id: reservation.member_ticket_id,
          ticket_id: reservation.memberTicket?.ticket?.id,
          name: reservation.memberTicket?.ticket?.name,
        },
      });
    }
    setReservationEdit({
      isEditing: true,
      date: reservation.start_at,
    });
    router.push(`/home/reservation/confirm`);
  };

  const onFilterChange = (filter) => {
    const el = document.getElementById(`filter-${filter?.id}`);
    setPagination((prev) => ({
      ...prev,
      current: 1,
      size: 10,
    }));
    if (filter?.id === activeFilter?.id) {
      setActiveFilter(filters[0]);
    } else {
      setActiveFilter(filter);
    }
    el?.blur();
    fetchReservations({
      status: filter?.id,
      page: 0,
      limit: 10,
    });
  };

  const onPaginationChange = (page, size) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      size: size,
    }));
    fetchReservations({
      status: activeFilter?.id,
      page: page - 1,
      limit: size,
    });
  };

  const isFilterActive = ({ id }) => {
    return activeFilter?.id === id;
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
                id={`filter-${filter.id}`}
                key={filter.text}
                onClick={() => onFilterChange(filter)}
                style={{
                  borderColor: isFilterActive(filter) && "#B7DDFF",
                  color: isFilterActive(filter) && "#1890FF",
                }}
              >
                <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                  <span>{filter.text}</span>
                  {activeFilter?.id !== ReservationStatusEnum.ACTIVE &&
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
                          activeFilter={activeFilter}
                          editReservation={editReservation}
                          fetchList={fetchReservations}
                        />
                      </div>
                    </section>
                  );
                })}
              </>
            ) : (
              <NoData message={"履歴がありません。"} />
            )}
          </>
        ) : (
          <FullScreenLoading />
        )}

        {reservations?.length && !isLoading ? (
          <section className="tw-flex tw-justify-center">
            <Pagination
              current={pagination.current}
              pageSize={pagination.size}
              total={pagination.total}
              onChange={(page, size) => onPaginationChange(page, size)}
            />
          </section>
        ) : null}
      </div>
    </>
  );
};

export default ReservationHistory;
