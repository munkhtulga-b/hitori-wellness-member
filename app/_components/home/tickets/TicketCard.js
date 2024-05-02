"use client";

import { Button } from "antd";
import { nullSafety } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";
import { useReservationStore } from "@/app/_store/reservation";

const TicketCard = ({ ticket, branch }) => {
  const router = useRouter();
  const setReservationBody = useReservationStore((state) => state.setBody);
  const resetReservationBody = useReservationStore((state) => state.resetBody);

  const onSelect = (ticket) => {
    resetReservationBody();
    setReservationBody({ ticket: ticket, branch: branch });
    router.push("/home/reservation");
  };

  return (
    <>
      <section
        key={ticket.id}
        className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow"
      >
        <div className="tw-flex tw-flex-col tw-gap-2">
          <span className="tw-text-lg">{nullSafety(ticket.ticket?.name)}</span>
          <p
            dangerouslySetInnerHTML={{ __html: nullSafety(ticket.description) }}
            className="tw-leading-[22px] tw-tracking-[0.14px] tw-whitespace-pre-wrap"
          ></p>
          <Button size="large" onClick={() => onSelect(ticket)}>
            選択
          </Button>
        </div>
      </section>
    </>
  );
};

export default TicketCard;
