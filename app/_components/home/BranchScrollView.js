import BranchCard from "./BranchCard";
import PurchaseBranchCard from "./profile/plan/BranchCard";
import { nullSafety } from "@/app/_utils/helpers";

const BranchScroller = ({ list, setActiveFilterId, filterId, cardType }) => {
  return (
    <>
      {list?.length ? (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <section className="tw-flex tw-justify-between tw-items-end">
            <span className="tw-text-xxl tw-font-medium">
              {nullSafety(list[0].category_name)}
            </span>
            <span
              onClick={() => setActiveFilterId(filterId)}
              className="tw-text-sm tw-text-support tw-font-medium tw-tracking-[0.12px] tw-underline tw-underline-offset-2"
            >
              全て
            </span>
          </section>
          <section className="tw-flex tw-justify-start tw-items-stretch tw-gap-4 tw-overflow-x-auto tw-pb-1">
            {list.map((item) => {
              return cardType === "purchase" ? (
                <PurchaseBranchCard key={item.id} branch={item} />
              ) : (
                <BranchCard key={item.id} branch={item} />
              );
            })}
          </section>
        </div>
      ) : null}
    </>
  );
};

export default BranchScroller;
