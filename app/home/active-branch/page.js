import $api from "@/app/_api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import HomeBranchDetailCard from "@/app/_components/home/HomeBranchDetailCard";

const HomeBranchDetailPage = async () => {
  const cookieStore = cookies();
  const { status, data: memberPlan } = await $api.member.memberPlan.getMany(
    cookieStore.get("token").value
  );
  const { data: reservations } = await $api.member.reservation.getMany(
    { sortBy: "start_at", sortType: "asc", limit: 1 },
    cookieStore.get("token").value
  );

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
      {memberPlan?.length ? (
        <>
          <HomeBranchDetailCard
            branch={memberPlan[0].studio}
            reservation={reservations?.length ? reservations[0] : null}
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
