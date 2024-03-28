import $api from "@/app/_api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NoData from "@/app/_components/custom/NoData";
import HomeBranchDetailCard from "@/app/_components/home/HomeBranchDetailCard";

const cookieStore = cookies();

export const generateMetadata = async () => {
  const { data } = await $api.member.memberPlan.getMany(
    cookieStore.get("token").value
  );

  return {
    title: data[0].studio?.name ?? process.env.BASE_META_TITLE,
  };
};

const BranchDetail = async () => {
  const { status, data: memberPlan } = await $api.member.memberPlan.getMany(
    cookieStore.get("token").value
  );

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
      {memberPlan?.length ? (
        <>
          <HomeBranchDetailCard branch={memberPlan[0].studio} />
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
