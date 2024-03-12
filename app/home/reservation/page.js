"use client";

import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import FilterButtonGroup from "@/app/_components/custom/FilterButtonGroup";
import SwitchSlider from "@/app/_components/custom/SwitchSlider";
import _ from "lodash";
import $api from "@/app/_api";
import ProgramListView from "@/app/_components/program/ProgramListView";
import ProgramScrollView from "@/app/_components/program/ProgramScrollView";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ReservationEnum from "@/app/_enums/EEnumReservation";
import TimeSlotSelect from "@/app/_components/time-slot/TimeSlotSelect";
import CoachSelect from "@/app/_components/coach/CoachSelect";

const sliderOptions = [
  {
    id: 1,
    text: "プログラム",
    dataIndex: "program",
    route: "",
  },
  // {
  //   id: 2,
  //   text: "スタッフ",
  //   dataIndex: "coach",
  //   route: "",
  // },
  {
    id: 3,
    text: "日時",
    dataIndex: "time",
    route: "",
  },
];

const ProgramsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState({
    isFetching: false,
    isRequesting: false,
  });
  const [programList, setProgramList] = useState(null);
  const [coachList, setCoachList] = useState(null);
  const [timeslotList, setTimeslotList] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);

  useLayoutEffect(() => {
    const query = searchParams.get("select");
    if (query === ReservationEnum.COACH.queryString) {
      return setActiveStepId(ReservationEnum.COACH.value);
    }
    if (query === ReservationEnum.TIMESLOT.queryString) {
      return setActiveStepId(ReservationEnum.TIMESLOT.value);
    }
    setActiveStepId(ReservationEnum.PROGRAM.value);
  }, [searchParams]);

  useEffect(() => {
    if (activeStepId === 1) {
      fetchPrograms();
    }
    if (activeStepId === 2) {
      fetchCoaches();
    }
    if (activeStepId === 3) {
      fetchTimeslots();
    }
    const matched = _.find(ReservationEnum, {
      value: activeStepId,
    });
    if (matched) {
      router.push(
        pathname + "?" + createQueryString("select", matched.queryString)
      );
    }
  }, [activeStepId]);

  const fetchPrograms = async () => {
    setIsLoading((prev) => ({ ...prev, isFetching: true }));
    const { isOk, data } = await $api.member.program.getMany();
    if (isOk) {
      const grouped = _.groupBy(data, "service_minutes");
      if (Object.values(grouped).length) {
        setProgramList(Object.values(grouped));
      }
    }
    setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const fetchCoaches = async () => {
    setCoachList([""]);
    // setIsLoading((prev) => ({ ...prev, isFetching: true }));
    // const { isOk, data } = await $api.member.coach.getMany();
    // if (isOk) {
    //   setCoachList(data);
    // }
    // setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const fetchTimeslots = async () => {
    setTimeslotList([""]);
    // setIsLoading((prev) => ({ ...prev, isFetching: true }));
    // const { isOk, data } = await $api.member.coach.getMany();
    // if (isOk) {
    //   setCoachList(data);
    // }
    // setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <SwitchSlider
          options={sliderOptions}
          activeStepId={activeStepId}
          setActiveStepId={setActiveStepId}
        />
        {!isLoading.isFetching ? (
          <>
            {activeStepId === 1 && (
              <>
                {programList?.length ? (
                  <>
                    <FilterButtonGroup
                      options={programList}
                      activeFilterId={activeFilterId}
                      setActiveFilterId={setActiveFilterId}
                      filterName={"service_minutes"}
                      filterNameSuffix={"分"}
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
              </>
            )}
            {activeStepId === 2 && (
              <>
                {coachList?.length ? (
                  <>
                    <CoachSelect />
                  </>
                ) : (
                  <>No data</>
                )}
              </>
            )}
            {activeStepId === 3 && (
              <>
                {timeslotList?.length ? (
                  <>
                    <TimeSlotSelect />
                  </>
                ) : (
                  <>No data</>
                )}
              </>
            )}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
};

export default ProgramsPage;
