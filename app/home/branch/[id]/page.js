"use client";

import $api from "@/app/_api";
import { useParams, useRouter } from "next/navigation";
import BranchDetailCard from "@/app/_components/home/BranchDetailCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";
import { useEffect, useState } from "react";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const BranchDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const [branch, setBranch] = useState(null);
  const [memberPlan, setMemberPlan] = useState(null);
  const [permittedBranches, setPermittedBranches] = useState(null);
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    fetchBranch();
    fetchMemberPlan();
    fetchPermittedBranches();
    fetchReservations();
  }, []);

  const fetchBranch = async () => {
    const { isOk, data } = await $api.member.branch.getOne(id);
    if (isOk) {
      setBranch(data);
    }
  };

  const fetchMemberPlan = async () => {
    const { isOk, data, status } = await $api.member.memberPlan.getMany();
    if (isOk) {
      setMemberPlan(data);
    } else {
      if (status === 401) {
        router.push("/auth/login");
      }
    }
  };

  const fetchPermittedBranches = async () => {
    const { isOk, data } = await $api.member.branch.getPermitted();
    if (isOk) {
      setPermittedBranches(data);
    }
  };

  const fetchReservations = async () => {
    const { isOk, data } = await $api.member.reservation.getMany({
      status: ReservationStatusEnum.ACTIVE,
    });
    if (isOk) {
      setReservations(data);
    }
  };

  return (
    <>
      {branch && permittedBranches && reservations && memberPlan ? (
        <>
          <BranchDetailCard
            branch={branch}
            memberPlan={memberPlan}
            reservations={reservations}
            permittedBranches={permittedBranches}
          />
        </>
      ) : (
        <FullScreenLoading isLoading={true} />
      )}
    </>
  );
};

export default BranchDetail;
