import $api from "@/app/_api";
import TicketDetailCard from "@/app/_components/home/profile/plan/TicketDetailCard";
import { cookies } from "next/headers";

export const generateMetadata = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const { id } = params;
  const { data } = await $api.member.ticket.getOne(id, token);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const PlanDetail = () => {
  return (
    <>
      <TicketDetailCard />
    </>
  );
};

export default PlanDetail;
