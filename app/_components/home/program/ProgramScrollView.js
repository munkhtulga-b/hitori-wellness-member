import ProgramCard from "./ProgramCard";
import { nullSafety } from "@/app/_utils/helpers";

const ProgramScrollView = ({ list }) => {
  return (
    <>
      {list?.length ? (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <section>
            <span className="tw-text-xl">{`${nullSafety(
              list[0].service_minutes
            )}分`}</span>
          </section>
          <section className="tw-flex tw-justify-start tw-items-stretch tw-gap-4 tw-overflow-x-auto tw-pb-1">
            {list.map((program) => {
              return <ProgramCard key={program.id} program={program} />;
            })}
          </section>
        </div>
      ) : null}
    </>
  );
};

export default ProgramScrollView;
