"use client";

import { Pagination } from "antd";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

const CheckInHistory = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [reservations, setReservations] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData({
      page: pagination.current - 1,
      limit: pagination.size,
      status: ReservationStatusEnum.CHECK_IN,
    });
  }, []);

  const fetchData = async (queries) => {
    setIsFetching(true);
    const { isOk, data, range } = await $api.member.reservation.getMany(
      queries
    );
    if (isOk) {
      setReservations(data);
      if (range) {
        setPagination((prev) => ({
          ...prev,
          total: Number(range?.split("/")[1]),
        }));
      }
    }
    setIsFetching(false);
  };

  const onPaginationChange = (page, size) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      size: size,
    }));
    fetchData({
      status: ReservationStatusEnum.CHECK_IN,
      page: page - 1,
      limit: size,
    });
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">入館記録</span>
        </section>

        {!isFetching ? (
          <>
            {reservations?.length ? (
              <>
                {reservations.map((item) => (
                  <section
                    key={item.id}
                    className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow"
                  >
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
                          チェックイン
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
                              {`${dayjs(item.checkin_at).format(
                                "YYYY/MM/DD"
                              )}(${dayjs(item.checkin_at).format(
                                "ddd"
                              )}) ${dayjs(item.start_at).format(
                                "HH:mm"
                              )}-${dayjs(item.end_at).format("HH:mm")}`}
                            </span>
                          </li>
                          <li className="tw-flex tw-justify-start tw-gap-2">
                            <span className="tw-text-sm tw-tracking-[0.12px] tw-w-[20%]">
                              店舗
                            </span>
                            <span className="tw-text-sm tw-text-grayLight tw-tracking-[0.12px]">
                              {item.m_studio && item.m_studio.name
                                ? item.m_studio.name
                                : "-"}
                            </span>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </section>
                ))}
              </>
            ) : (
              <NoData message={`記録がありません。`} />
            )}
          </>
        ) : (
          <>
            <FullScreenLoading isLoading={isFetching} />
          </>
        )}

        {/* <section className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-2">
          <Button>全て
</Button>
          <Button>チェックイン</Button>
          <Button>チェックアウト</Button>
        </section> */}

        {reservations?.length > 10 && !isFetching ? (
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

export default CheckInHistory;
