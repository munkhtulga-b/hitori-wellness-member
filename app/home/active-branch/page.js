"use client";

import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import HomeBranchDetailCard from "@/app/_components/home/HomeBranchDetailCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomeBranchDetailPage = () => {
  const router = useRouter;

  const [isLoading, setIsLoading] = useState(false);
  const [memberPlan, setMemberPlan] = useState(null);
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    fetchMemberPlan();
    fetchReservations();
  }, []);

  const fetchMemberPlan = async () => {
    setIsLoading(true);
    const { isOk, data, status } = await $api.member.memberPlan.getMany();
    if (isOk) {
      setMemberPlan(data);
    } else {
      if (status === 401) {
        router.push("/auth/login");
      }
    }
    setIsLoading(false);
  };

  const fetchReservations = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.reservation.getMany({
      sortBy: "start_at",
      sortType: "asc",
      status: ReservationStatusEnum.ACTIVE,
    });
    if (isOk) {
      setReservations(data);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <>
          {memberPlan?.length && reservations ? (
            <>
              {memberPlan[0]?.studio ? (
                <HomeBranchDetailCard
                  branch={memberPlan[0].studio}
                  nearestReservation={
                    reservations?.length ? reservations[0] : null
                  }
                  reservations={reservations}
                  maxReservation={
                    memberPlan[0]?.plan?.max_cc_reservable_num_by_plan
                  }
                  fetchReservations={fetchReservations}
                />
              ) : (
                <NoData message={"No branch found"} />
              )}
            </>
          ) : null}
        </>
      ) : (
        <>
          <FullScreenLoading isLoading={isLoading} />
        </>
      )}
    </>
  );
};

export default HomeBranchDetailPage;
