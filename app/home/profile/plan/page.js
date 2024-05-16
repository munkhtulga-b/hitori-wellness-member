"use client";

import $api from "@/app/_api";
import { nullSafety } from "@/app/_utils/helpers";
import NoData from "@/app/_components/custom/NoData";
import MemberPlanCard from "@/app/_components/home/profile/plan/PlanCard";
import { useEffect, useState } from "react";

const ActiveSubscription = () => {
  const [memberPlan, setMemberPlan] = useState(null);
  const [memberTickets, setMemberTickets] = useState(null);

  useEffect(() => {
    fetchMemberPlan();
    fetchMemberTickets();
  }, []);

  const fetchMemberPlan = async () => {
    const { isOk, data } = await $api.member.memberPlan.getMany();
    if (isOk) {
      setMemberPlan(data);
    }
  };

  const fetchMemberTickets = async () => {
    const { isOk, data } = await $api.member.memberTicket.getMany();
    if (isOk) {
      setMemberTickets(data);
    }
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">
            加入中プラン・所持チケット
          </span>
        </section>
        {memberPlan?.length ? (
          <>
            <MemberPlanCard memberPlan={memberPlan[0]} />
          </>
        ) : (
          <>
            {!memberTickets?.length ? (
              <NoData
                message={" 現在、ご購入されたプラン・チケットはございません。"}
              />
            ) : null}
          </>
        )}
        {memberTickets?.length ? (
          <>
            {memberTickets?.map((ticket) => (
              <section
                key={ticket.id}
                className="tw-flex tw-flex-col tw-gap-1 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow"
              >
                <span className="tw-text-lg">
                  {nullSafety(ticket.ticket?.name)}
                  {`(${nullSafety(ticket.num)}回券)`}
                </span>
                <p
                  dangerouslySetInnerHTML={{
                    __html: nullSafety(ticket.description),
                  }}
                  className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line"
                ></p>
              </section>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default ActiveSubscription;
