import $api from "@/app/_api";
import NoData from "@/app/_components/custom/NoData";
import BranchDetailCard from "@/app/_components/home/BranchDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.branch.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const BranchDetail = async ({ params }) => {
  const { id } = params;
  const { data: branch } = await $api.member.branch.getOne(id); // Fetching branch detail on the server side

  return (
    <>
      {branch ? (
        <>
          <BranchDetailCard branch={branch} />
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
