import $api from "@/app/_api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import TicketCard from "@/app/_components/home/tickets/TicketCard";

const ReservationTickets = async ({ params }) => {
  const cookieStore = cookies();
  const serverToken = cookieStore.get("token").value;
  const { data: branch } = await $api.member.branch.getOne(params.branch);
  const { data: memberTickets, status } =
    await $api.member.memberTicket.getMany(serverToken, {
      branch: params.branch,
    });

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
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
    </>
  );
};

export default ReservationTickets;
