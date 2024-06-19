"use client";

import NoData from "../_components/custom/NoData";
import BranchScrollView from "../_components/home/BranchScrollView";
import BranchListView from "../_components/home/BranchListView";
import FullScreenLoading from "../_components/animation/FullScreenLoading";
import FilterButtonGroup from "../_components/custom/FilterButtonGroup";
import { useState, useEffect } from "react";
import $api from "../_api";
import _ from "lodash";
import BranchCard from "../_components/home/BranchCard";
import VerificationReminder from "../_components/home/VerificationReminder";
import EEnumDataBaseStatus from "../_enums/EEnumDataBaseStatus";
import { useUserStore } from "../_store/user";

const HomePage = () => {
  const user = useUserStore((state) => state.getUser());
  const [branchList, setBranchList] = useState(null);
  const [homeBranch, setHomeBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState(null);

  useEffect(() => {
    if (user?.is_verified) {
      fetchBranches();
      fetchHomeBranch();
    }
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

  const fetchHomeBranch = async () => {
    const { isOk, data } = await $api.member.memberPlan.getMany();
    if (isOk && data?.length) {
      if (data[0]?.studio?.status === EEnumDataBaseStatus.ACTIVE) {
        setHomeBranch(data[0].studio);
      }
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-y-4">
      {!isLoading ? (
        <>
          <VerificationReminder />
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
                  {homeBranch ? (
                    <>
                      <div className="tw-flex tw-flex-col tw-gap-3">
                        <span className="tw-text-xxl tw-font-medium">
                          登録店舗
                        </span>
                        <BranchCard branch={homeBranch} isHomeBranch={true} />
                      </div>
                    </>
                  ) : null}
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
            <NoData message={"データがありません。"} />
          )}
        </>
      ) : (
        <FullScreenLoading isLoading={isLoading} />
      )}
    </div>
  );
};

export default HomePage;
