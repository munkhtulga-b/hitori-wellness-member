"use client";

import NoData from "@/app/_components/custom/NoData";
import BranchScrollView from "@/app/_components/home/BranchScrollView";
import BranchListView from "@/app/_components/home/BranchListView";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import FilterButtonGroup from "@/app/_components/custom/FilterButtonGroup";
import { useState, useEffect } from "react";
import $api from "@/app/_api";
import _ from "lodash";

const PlanChangeStudio = () => {
  const [branchList, setBranchList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.branch.getMany();
    if (isOk) {
      const grouped = _.groupBy(data, "category_name");
      if (Object.values(grouped).length) {
        setBranchList(Object.values(grouped));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-y-4">
      <section>
        <span className="tw-text-xxl tw-font-medium">
          対象の店舗をお選びください
        </span>
      </section>
      {!isLoading ? (
        <>
          {branchList?.length ? (
            <FilterButtonGroup
              options={branchList}
              activeFilterId={activeFilterId}
              setActiveFilterId={setActiveFilterId}
              filterName={"category_name"}
            />
          ) : null}

          {branchList?.length ? (
            <>
              {activeFilterId === null ? (
                <>
                  {branchList.map((branches, idx) => {
                    return (
                      <BranchScrollView
                        key={idx}
                        list={branches}
                        filterId={idx}
                        setActiveFilterId={setActiveFilterId}
                        cardType={`purchase`}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <BranchListView
                    list={branchList[activeFilterId]}
                    cardType={`purchase`}
                  />
                </>
              )}
            </>
          ) : (
            <NoData message={"No data found"} />
          )}
        </>
      ) : (
        <FullScreenLoading isLoading={isLoading} />
      )}
    </div>
  );
};

export default PlanChangeStudio;
