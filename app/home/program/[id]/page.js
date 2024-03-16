import $api from "@/app/_api";
import NoData from "@/app/_components/custom/NoData";
import ProgramDetailCard from "@/app/_components/home/program/ProgramDetailCard";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data } = await $api.member.program.getOne(id);

  return {
    title: data?.name ?? process.env.BASE_META_TITLE,
  };
};

const ProgramDetail = async ({ params }) => {
  const { id } = params;
  const { data: program } = await $api.member.program.getOne(id);

  return (
    <>
      {program ? (
        <>
          <ProgramDetailCard program={program} />
        </>
      ) : (
        <>
          <NoData message={"No program found"} />
        </>
      )}
    </>
  );
};

export default ProgramDetail;
