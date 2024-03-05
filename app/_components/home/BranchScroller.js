import BranchCard from "./BranchCard";
const BranchScroller = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <section className="tw-flex tw-justify-between tw-items-end">
          <span className="tw-text-xxl tw-font-medium">関東</span>
          <span className="tw-text-sm tw-text-support tw-font-medium tw-tracking-[0.12px] tw-underline tw-underline-offset-2">
            全て
          </span>
        </section>
        <section className="tw-flex tw-justify-start tw-items-start tw-gap-4 tw-overflow-x-auto tw-snap-x tw-pb-1">
          {[1, 2, 3].map((item) => {
            return <BranchCard key={item} />;
          })}
        </section>
      </div>
    </>
  );
};

export default BranchScroller;
