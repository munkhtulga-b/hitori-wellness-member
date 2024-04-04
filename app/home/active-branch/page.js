import $api from "@/app/_api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import HomeBranchDetailCard from "@/app/_components/home/HomeBranchDetailCard";
import ReservationStatusEnum from "@/app/_enums/EEnumReservationStatus";

const HomeBranchDetailPage = async () => {
  const cookieStore = cookies();
  const { status, data: memberPlan } = await $api.member.memberPlan.getMany(
    cookieStore.get("token").value
  );
  const { data: reservations } = await $api.member.reservation.getMany(
    {
      sortBy: "start_at",
      sortType: "asc",
      status: ReservationStatusEnum.ACTIVE,
    },
    cookieStore.get("token").value
  );

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
      {memberPlan?.length && reservations ? (
        <>
          <HomeBranchDetailCard
            branch={memberPlan[0].studio}
            nearestReservation={reservations?.length ? reservations[0] : null}
            reservations={reservations}
            maxReservation={memberPlan[0]?.plan?.max_cc_reservable_num_by_plan}
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

export default HomeBranchDetailPage;
