import $api from "@/app/_api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import BranchDetailCard from "@/app/_components/home/BranchDetailCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.branch.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const BranchDetail = async ({ params }) => {
  const cookieStore = cookies();
  const serverToken = cookieStore.get("token").value;
  const { id } = params;
  const { data: branch } = await $api.member.branch.getOne(id); // Fetching branch detail on the server side
  const { status, data: memberPlan } = await $api.member.memberPlan.getMany(
    serverToken
  );
  const { data: memberTickets } = await $api.member.memberTicket.getMany(
    serverToken
  );
  const { data: reservations } = await $api.member.reservation.getMany(
    { status: ReservationStatusEnum.ACTIVE },
    serverToken
  );
  const { data: permittedBranches } = await $api.member.branch.getPermitted(
    serverToken
  );

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
      {branch ? (
        <>
          <BranchDetailCard
            branch={branch}
            memberPlan={memberPlan}
            reservations={reservations}
            memberTickets={memberTickets}
            permittedBranches={permittedBranches}
          />
        </>
      ) : (
        <>
          <NoData message={"No branch found"} />
        </>
      )}
    </>
  );
};

export default BranchDetail;
