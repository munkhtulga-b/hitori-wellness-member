import $api from "@/app/_api";
import NoData from "@/app/_components/custom/NoData";
import PlanDetailCard from "@/app/_components/home/profile/plan/PlanDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.plan.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const PlanDetail = async ({ params }) => {
  const { id } = params;
  const { data: plan } = await $api.member.plan.getOne(id); // Fetching plan detail on the server side

  console.log(plan, "asdasd");

  return (
    <>
      {plan ? (
        <>
          <PlanDetailCard plan={plan} />
        </>
      ) : (
        <>
          <NoData
            message={" 現在、ご購入されたプラン・チケットはございません。"}
          />
        </>
      )}
    </>
  );
};

export default PlanDetail;
