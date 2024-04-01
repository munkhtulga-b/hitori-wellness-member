"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import { nullSafety } from "@/app/_utils/helpers";
import { usePurchaseStore } from "@/app/_store/purchase";

const TicketDetailCard = ({ ticket }) => {
  const router = useRouter();
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);

  const onselect = () => {
    setPurchaseBody({ item: ticket, plan: null });
    router.push(`/home/profile/purchase/${ticket.id}`);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            {nullSafety(ticket.name)}
          </span>
        </section>
        <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow">
          <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-whitespace-pre-wrap">
            {nullSafety(ticket.description)}
          </p>
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
    </>
  );
};

export default TicketDetailCard;
