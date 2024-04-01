import $api from "@/app/_api";
import NoData from "@/app/_components/custom/NoData";
import TicketDetailCard from "@/app/_components/home/profile/plan/TicketDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.plan.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const PlanDetail = async ({ params }) => {
  const { id } = params;
  const { data: ticket } = await $api.member.item.getOne(id); // Fetching ticket detail on the server side

  return (
    <>
      {ticket ? (
        <>
          <TicketDetailCard ticket={ticket} />
        </>
      ) : (
        <>
          <NoData message={"No ticket found"} />
        </>
      )}
    </>
  );
};

export default PlanDetail;
