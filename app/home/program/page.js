"use client";

import { useState, useEffect } from "react";
import FilterButtonGroup from "@/app/_components/home/FilterButtonGroup";
import SwitchSlider from "@/app/_components/custom/SwitchSlider";
import _ from "lodash";
import $api from "@/app/_api";
import ProgramListView from "@/app/_components/program/ProgramListView";
import ProgramScrollView from "@/app/_components/program/ProgramScrollView";

const sliderOptions = [
  {
    id: 1,
    text: "プログラム",
    route: "",
  },
  {
    id: 2,
    text: "スタッフ",
    route: "",
  },
  {
    id: 3,
    text: "日時",
    route: "",
  },
];

const ProgramsPage = () => {
  const [programList, setProgramList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeStepId, setActiveStepId] = useState(1);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.program.getMany();
    if (isOk) {
      const grouped = _.groupBy(data, "service_minutes");
      if (Object.values(grouped).length) {
        setProgramList(Object.values(grouped));
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <div className="tw-flex tw-flex-col tw-gap-4">
          <SwitchSlider
            options={sliderOptions}
            setActiveStepId={setActiveStepId}
          />
          {programList?.length ? (
            <>
              <FilterButtonGroup
                options={programList}
                activeFilterId={activeFilterId}
                setActiveFilterId={setActiveFilterId}
                filterName={"service_minutes"}
              />
              {activeFilterId === null ? (
                <>
                  {programList.map((programs) => {
                    return (
                      <ProgramScrollView
                        key={programs[0].service_minutes}
                        list={programs}
                      />
                    );
                  })}
                </>
              ) : (
                <ProgramListView list={programList[activeFilterId]} />
              )}
            </>
          ) : (
            <>No data</>
          )}
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default ProgramsPage;
