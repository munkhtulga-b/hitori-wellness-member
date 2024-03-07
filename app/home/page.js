"use client";

import { Empty } from "antd";
import BranchScrollView from "../_components/home/BranchScrollView";
import BranchListView from "../_components/home/BranchListView";
import FilterButtonGroup from "../_components/home/FilterButtonGroup";
import { useState, useEffect } from "react";
import $api from "../_api";
import _ from "lodash";

const HomePage = () => {
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
      {!isLoading ? (
        <>
          <FilterButtonGroup
            options={branchList}
            activeFilterId={activeFilterId}
            setActiveFilterId={setActiveFilterId}
            filterName={"category_name"}
          />

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
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <BranchListView list={branchList[activeFilterId]} />
                </>
              )}
            </>
          ) : (
            <div className="tw-text-center tw-py-20">
              <Empty description="No Branch" />
            </div>
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default HomePage;
