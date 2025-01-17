"use client";

import { useState, useEffect, useCallback } from "react";
import FilterButtonGroup from "@/app/_components/custom/FilterButtonGroup";
import SwitchSlider from "@/app/_components/custom/SwitchSlider";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import _ from "lodash";
import $api from "@/app/_api";
import dayjs from "dayjs";
import ProgramListView from "@/app/_components/home/program/ProgramListView";
import ProgramScrollView from "@/app/_components/home/program/ProgramScrollView";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ReservationEnum from "@/app/_enums/EEnumReservation";
import TimeSlotSelect from "@/app/_components/home/time-slot/TimeSlotSelect";
import CoachSelect from "@/app/_components/coach/CoachSelect";
import NoData from "@/app/_components/custom/NoData";
import { useReservationStore } from "@/app/_store/reservation";
import { toast } from "react-toastify";
import TimeSlotSelectNoProgram from "@/app/_components/home/time-slot/TimeSlotSelectNoProgram";

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
  const [isMounted, setIsMounted] = useState(false);

  const reservationBody = useReservationStore((state) => state.getBody());
  const [isFetching, setIsFetching] = useState({
    programs: false,
    coaches: false,
    timeslots: false,
  });

  const [programList, setProgramList] = useState(null);
  const [coachList, setCoachList] = useState(null);
  const [timeslotList, setTimeslotList] = useState(null);
  const [memberPlan, setMemberPlan] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);

  useEffect(() => {
    if (activeStepId) {
      setIsMounted(true);
    }
  }, [activeStepId]);

  useEffect(() => {
    if (!reservationBody.branch) {
      toast.info("Please select a branch", {
        position: "bottom-center",
      });
      return router.push("/home/");
    }
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
    fetchMemberPlan();
  }, []);

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
    let queries = {};
    setIsFetching((prev) => ({ ...prev, programs: true }));
    if (reservationBody.ticket) {
      if (reservationBody.time) {
        queries = {
          ticketId:
            reservationBody.ticket?.ticket_id ||
            reservationBody.ticket?.m_ticket?.id,
          startAt: `${dayjs(reservationBody.time[0]).format(
            "YYYY-MM-DD"
          )}T${dayjs(reservationBody.time[0]).format("HH:mm:ss")}`,
          studioId: reservationBody.branch.id,
        };
      } else {
        queries = {
          ticketId: reservationBody.ticket?.ticket_id,
        };
      }
    }
    if (!reservationBody.ticket && reservationBody.time) {
      queries = {
        startAt: `${dayjs(reservationBody.time[0]).format(
          "YYYY-MM-DD"
        )}T${dayjs(reservationBody.time[0]).format("HH:mm:ss")}`,
        studioId: reservationBody.branch.id,
      };
    }
    const { isOk, data } = await $api.member.program.getMany(queries);
    if (isOk) {
      const grouped = _.groupBy(data, "service_minutes");
      if (Object.values(grouped).length) {
        setProgramList(Object.values(grouped));
      } else {
        setProgramList(data);
      }
    }
    setIsFetching((prev) => ({ ...prev, programs: false }));
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

  const fetchTimeslots = async (startDate) => {
    setIsFetching((prev) => ({ ...prev, timeslots: true }));
    const branchId = reservationBody.branch?.id;
    const { isOk, data } = await $api.member.reservation.getTimeSlot(
      { startAt: startDate ?? dayjs().format("YYYY-MM-DD") },
      branchId
    );
    if (isOk) {
      setTimeslotList(data);
    }
    setIsFetching((prev) => ({ ...prev, timeslots: false }));
  };

  const fetchMemberPlan = async () => {
    const { isOk, data } = await $api.member.memberPlan.getMany();
    if (isOk) {
      setMemberPlan(data);
    }
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
      {isMounted ? (
        <div className="tw-flex tw-flex-col tw-gap-4">
          <SwitchSlider
            options={sliderOptions}
            activeStepId={activeStepId}
            setActiveStepId={setActiveStepId}
          />
          {activeStepId === 1 && (
            <>
              {!isFetching.programs ? (
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
                    <NoData
                      message={
                        "選択した時間帯に予約可能なプログラムがありません。"
                      }
                    />
                  )}
                </>
              ) : (
                <FullScreenLoading isLoading={isFetching.programs} />
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
                <NoData />
              )}
            </>
          )}
          {activeStepId === 3 && (
            <>
              {reservationBody.program ? (
                <TimeSlotSelect
                  maxDailyReservation={
                    memberPlan?.length
                      ? memberPlan[0]?.plan?.max_reservable_num_at_day_by_plan
                      : 0
                  }
                  isFetching={isFetching.timeslots}
                  timeSlotList={timeslotList}
                  fetchTimeslots={fetchTimeslots}
                />
              ) : (
                <TimeSlotSelectNoProgram
                  maxDailyReservation={
                    memberPlan?.length
                      ? memberPlan[0]?.plan?.max_reservable_num_at_day_by_plan
                      : 0
                  }
                  isFetching={isFetching.timeslots}
                  timeSlotList={timeslotList}
                  fetchTimeslots={fetchTimeslots}
                />
              )}
            </>
          )}
        </div>
      ) : (
        <FullScreenLoading isLoading={!isMounted} />
      )}
    </>
  );
};

export default ProgramsPage;
