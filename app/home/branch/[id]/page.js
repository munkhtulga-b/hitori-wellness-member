import $api from "@/app/_api";
import BranchDetailCard from "@/app/_components/home/BranchDetailCard";

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
        <>Empty</>
      )}
    </>
  );
};

export default BranchDetail;
