import $api from "@/app/_api";
import ProgramDetailCard from "@/app/_components/home/program/ProgramDetailCard";
import { cookies } from "next/headers";

export const generateMetadata = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const { id } = params;
  const { data } = await $api.member.program.getOne(id, token);

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
