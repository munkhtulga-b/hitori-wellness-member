"use client";

import $api from "@/app/_api";
import { useRouter } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import BranchDetailCard from "@/app/_components/home/BranchDetailCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import { useEffect, useState } from "react";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const BranchDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(false);
  const [branch, setBranch] = useState(null);
  const [permittedBranches, setPermittedBranches] = useState(null);
  const [memberPlan, setMemberPlan] = useState(null);
  const [memberTickets, setMemberTickets] = useState(null);
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    fetchBranch();
    fetchPermittedBranches();
    fetchMemberPlan();
    fetchMemberTickets();
    fetchReservations();
  }, []);

  const fetchBranch = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.branch.getOne(id);
    if (isOk) {
      setBranch(data);
    }
    setIsLoading(false);
  };

  const fetchPermittedBranches = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.branch.getPermitted();
    if (isOk) {
      setPermittedBranches(data);
    }
    setIsLoading(false);
  };

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

  const fetchMemberTickets = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.memberTicket.getMany();
    if (isOk) {
      setMemberTickets(data);
    }
    setIsLoading(false);
  };

  const fetchReservations = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.reservation.getMany({
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
          {branch &&
          memberPlan &&
          memberTickets &&
          permittedBranches &&
          reservations ? (
            <>
              <BranchDetailCard
                branch={branch}
                memberPlan={memberPlan}
                reservations={reservations}
                memberTickets={memberTickets}
                permittedBranches={permittedBranches}
              />
            </>
          ) : (
            <NoData message={"No branch found"} />
          )}
        </>
      ) : (
        <>
          <FullScreenLoading isLoading={isLoading} />
        </>
      )}
    </>
  );
};

export default BranchDetail;
