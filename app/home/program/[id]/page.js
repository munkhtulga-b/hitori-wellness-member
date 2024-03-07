import $api from "@/app/_api";
import ProgramDetailCard from "@/app/_components/program/ProgramDetailCard";

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
        <>Empty</>
      )}
    </>
  );
};

export default ProgramDetail;
