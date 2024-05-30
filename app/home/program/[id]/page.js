import $api from "@/app/_api";
import ProgramDetailCard from "@/app/_components/home/program/ProgramDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.program.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const ProgramDetail = () => {
  return (
    <>
      <ProgramDetailCard />
    </>
  );
};

export default ProgramDetail;
