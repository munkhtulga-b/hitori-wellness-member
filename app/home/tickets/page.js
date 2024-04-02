import $api from "@/app/_api";
import { cookies } from "next/headers";

const ReservationTickets = async () => {
  const cookieStore = cookies();
  const serverToken = cookieStore.get("token").value;
  const { data: memberTickets } = await $api.member.memberTicket.getMany(
    serverToken
  );

  console.log(memberTickets);
  return (
    <>
      <h1>Tickets</h1>
    </>
  );
};

export default ReservationTickets;
