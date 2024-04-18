"use client";

import $api from "@/app/_api";
import { useParams } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import TicketCard from "@/app/_components/home/tickets/TicketCard";
import { useEffect, useState } from "react";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const ReservationTickets = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [branch, setBranch] = useState(null);
  const [memberTickets, setMemberTickets] = useState(null);

  useEffect(() => {
    fetchBranch();
    fetchMemberTickets();
  }, []);

  useEffect(() => {
    if (memberTickets && branch) {
      setIsLoading(false);
    }
  }, [memberTickets, branch]);

  const fetchBranch = async () => {
    const { isOk, data } = await $api.member.branch.getOne(params.branch);
    if (isOk) {
      setBranch(data);
    }
  };

  const fetchMemberTickets = async () => {
    const { isOk, data } = await $api.member.memberTicket.getMany(undefined, {
      branch: params.branch,
    });
    if (isOk) {
      setMemberTickets(data);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="tw-flex tw-flex-col tw-gap-4">
          <section>
            <span className="tw-text-xxl tw-font-medium">
              使用するチケットを選択してください。
            </span>
          </section>
          {memberTickets?.length ? (
            <>
              {memberTickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} branch={branch} />
              ))}
            </>
          ) : (
            <NoData message={"No tickets found"} />
          )}
        </div>
      ) : (
        <FullScreenLoading isLoading={isLoading} />
      )}
    </>
  );
};

export default ReservationTickets;
