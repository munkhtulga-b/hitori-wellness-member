import $api from "@/app/_api";
import PlanDetailCard from "@/app/_components/home/profile/plan/PlanDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.plan.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const PlanDetail = () => {
  return (
    <>
      <PlanDetailCard />
    </>
  );
};

export default PlanDetail;
