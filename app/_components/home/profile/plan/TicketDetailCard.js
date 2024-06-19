"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { nullSafety } from "@/app/_utils/helpers";
import { usePurchaseStore } from "@/app/_store/purchase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";

const TicketDetailCard = () => {
  const router = useRouter();
  const { id } = useParams();
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.ticket.getOne(id);
    if (isOk) {
      setTicket(data);
    }
    setIsLoading(false);
  };

  const onselect = () => {
    setPurchaseBody({ item: ticket, plan: null });
    router.push(`/home/profile/purchase/${ticket.id}`);
  };

  return (
    <>
      {!isLoading ? (
        <>
          {ticket ? (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <section>
                <span className="tw-text-xxl tw-font-medium">
                  {nullSafety(ticket.name)}
                </span>
              </section>
              <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow">
                <p
                  dangerouslySetInnerHTML={{
                    __html: nullSafety(ticket.m_item?.description),
                  }}
                  className="tw-leading-[22px] tw-tracking-[0.14px] tw-whitespace-pre-line"
                ></p>
              </section>
              <section className="tw-mt-1">
                <Button
                  size="large"
                  type="primary"
                  className="tw-w-full"
                  onClick={() => onselect()}
                >
                  選ぶ
                </Button>
              </section>
            </div>
          ) : (
            <NoData />
          )}
        </>
      ) : (
        <FullScreenLoading isLoading={isLoading} />
      )}
    </>
  );
};

export default TicketDetailCard;
