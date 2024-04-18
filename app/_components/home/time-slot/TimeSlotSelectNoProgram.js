import dayjs from "dayjs";
import { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import Image from "next/image";
import { useReservationStore } from "@/app/_store/reservation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FullScreenLoading from "../../animation/FullScreenLoading";

const TimeSlotSelectNoProgram = ({
  timeSlotList,
  fetchTimeslots,
  isFetching,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const slotCapacityPercentage = 60;
  const reservationDateLimit = dayjs().add(1, "month").endOf("month");
  const getReservationEdit = useReservationStore((state) => state.getEdit());
  const getReservation = useReservationStore((state) => state.getBody());
  const setReservation = useReservationStore((state) => state.setBody);
  const [selectedWeek, setSelectedWeek] = useState({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (getReservation.time) {
      setSelectedSlot(getReservation.time);
    }
  }, []);

  const onSlotSelect = (date, time) => {
    setSelectedSlot(`${dayjs(date.day).format("YYYY-MM-DD")} ${time}`);
  };

  const onSlotConfirm = () => {
    setReservation({ time: [selectedSlot] });
    router.push(pathName + "?" + createQueryString("select", "program"));
  };

  const onWeekChange = (type) => {
    setSelectedSlot(null);
    setSelectedWeek({
      start: selectedWeek.start[type](1, "week"),
      end: selectedWeek.end[type](1, "week"),
    });
    fetchTimeslots(selectedWeek.start[type](1, "week").format("YYYY-MM-DD"));
  };

  const getDaysOfWeek = () => {
    const daysOfWeek = [];
    let currentDate = dayjs(selectedWeek.start);

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: currentDate,
        timeSlots: getAllAvailableTimes("00:00", currentDate),
      });
      currentDate = currentDate.add(1, "day");
    }

    if (timeSlotList) {
      timeSlotList.forEach((item) => {
        item.reserved.forEach((slot) => {
          const slotIndex = daysOfWeek[item.week_day].timeSlots.findIndex(
            (time) => time.time === slot.start
          );
          if (slotIndex !== -1) {
            daysOfWeek[item.week_day].timeSlots[slotIndex].currentCapacity =
              slot.current_capacity;
            if (
              slot.current_capacity >= item.max_capacity ||
              !slot.is_available
            ) {
              daysOfWeek[item.week_day].timeSlots[
                slotIndex
              ].isAvailable = false;
            }
          }
        });
      });
    }
    return daysOfWeek;
  };

  const getAllAvailableTimes = (startTime, currentDate) => {
    const start = dayjs(`01/01/2024 ${startTime}`);
    const end = start.add(1, "day");

    const times = [];

    let currentTime = start;

    while (currentTime.isBefore(end)) {
      const hours = currentTime.format("HH");
      const minutes = currentTime.format("mm");
      times.push({
        isAvailable:
          dayjs(dayjs(currentDate).format("YYYY-MM-DD")).isBefore(
            dayjs().format("YYYY-MM-DD")
          ) ||
          dayjs(currentDate.format("YYYY-MM-DD")).isAfter(
            dayjs().add(1, "month").endOf("month").format("YYYY-MM-DD")
          ) ||
          dayjs(
            `${currentDate.format("YYYY-MM-DD")} ${hours}:${minutes}`
          ).isBefore(dayjs().format("YYYY-MM-DD HH:mm")) ||
          isUserReservedForTheDay(currentDate)
            ? false
            : true,
        time: `${hours}:${minutes}`,
        currentCapacity: 0,
      });

      // Add 30 minutes
      currentTime = currentTime.add(30, "minute");
    }

    return times;
  };

  const isSlotSelected = (day, time) => {
    let result = false;
    if (selectedSlot) {
      result = selectedSlot === `${day.format("YYYY-MM-DD")} ${time}`;
    }
    return result;
  };

  const isReachingMaxCapacity = ({ currentCapacity, isAvailable }) => {
    let result = false;
    if (!isAvailable) return false;
    if (timeSlotList?.length && timeSlotList[0].max_capacity) {
      const percentage = Math.round(
        (timeSlotList[0].max_capacity * slotCapacityPercentage) / 100
      );
      result =
        currentCapacity >= percentage &&
        currentCapacity < timeSlotList[0].max_capacity;
    }
    return result;
  };

  const isUserReservedForTheDay = (currentDate) => {
    let result = false;
    if (timeSlotList?.length) {
      const matched = timeSlotList.find((item) => {
        return item.week_day === currentDate.day();
      });
      if (matched) {
        result = matched.user_reserved;
        if (matched.user_reserved === true && getReservationEdit.date) {
          if (
            dayjs(dayjs(currentDate).format("YYYY-MM-DD")).isSame(
              dayjs.utc(getReservationEdit.date).format("YYYY-MM-DD")
            )
          ) {
            return false;
          }
        }
      }
    }
    return result;
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
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-[150px]">
        <section>
          <span className="tw-text-xxl tw-font-medium">日時</span>
        </section>
        {timeSlotList && !isFetching ? (
          <>
            <section className="tw-flex tw-justify-start tw-items-center tw-gap-2">
              <div className="tw-grow tw-h-[48px] tw-bg-white tw-rounded-lg tw-border tw-border-form tw-flex tw-justify-center tw-items-center tw-relative">
                {dayjs().startOf("week").isBefore(selectedWeek.start) && (
                  <Image
                    src="/assets/time-slot/return-icon.svg"
                    alt="return"
                    width={0}
                    height={0}
                    style={{
                      width: "auto",
                      height: "auto",
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => onWeekChange("subtract")}
                  />
                )}
                <span className="tw-text-lg">{`${selectedWeek.start.format(
                  "MM/DD"
                )} - ${selectedWeek.end.format("MM/DD")}`}</span>
                {dayjs(selectedWeek.start)
                  .add(1, "week")
                  .isBefore(reservationDateLimit) && (
                  <Image
                    src="/assets/time-slot/proceed-icon.svg"
                    alt="proceed"
                    width={0}
                    height={0}
                    style={{
                      width: "auto",
                      height: "auto",
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => onWeekChange("add")}
                  />
                )}
              </div>
              <Button
                size="large"
                onClick={() => {
                  setSelectedSlot(null);
                  setSelectedWeek({
                    start: dayjs().startOf("week"),
                    end: dayjs().endOf("week"),
                  });
                }}
              >
                <div className="tw-flex tw-justify-center tw-items-center tw-gap-4">
                  <span className="tw-text-lg">今日に戻る</span>
                  <Image
                    src="/assets/time-slot/refresh-icon.svg"
                    alt="refresh"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </Button>
            </section>
            <section className="tw-grid tw-grid-cols-7 tw-auto-rows-auto tw-gap-[6px]">
              {getDaysOfWeek().map((date) => {
                return (
                  <div
                    key={dayjs(date.day).format("YYYY-MM-DD")}
                    className="tw-flex tw-flex-col tw-items-center tw-gap-[6px]"
                  >
                    <section className="tw-flex tw-flex-col tw-gap-1">
                      <span className="tw-text-lg">
                        {dayjs(date.day).format("DD")}
                      </span>
                      <span className="tw-text-lg">
                        {dayjs(date.day).format("ddd")}
                      </span>
                    </section>
                    {date.timeSlots.map((slot) => {
                      return (
                        <button
                          key={slot.time}
                          disabled={!slot.isAvailable}
                          className={`${
                            isSlotSelected(date.day, slot.time)
                              ? "tw-bg-aquaLight tw-ring-[2px] tw-ring-available"
                              : "tw-bg-white tw-ring-[1px] tw-ring-available"
                          } tw-w-full tw-h-[38px] tw-px-1 tw-py-2 tw-rounded-lg tw-text-center disabled:tw-bg-dividerMedium disabled:tw-text-disabled disabled:tw-ring-transparent tw-relative tw-transition-all tw-duration-300`}
                          onClick={() => onSlotSelect(date, slot.time)}
                        >
                          {isReachingMaxCapacity(slot) && (
                            <Image
                              src="/assets/time-slot/is-reaching-max-capacity.svg"
                              alt="capacity"
                              width={0}
                              height={0}
                              style={{
                                width: "auto",
                                height: "auto",
                                position: "absolute",
                                top: 0,
                                right: "50%",
                                transform: "translateX(50%)",
                              }}
                            />
                          )}
                          <span className="tw-tracking-[0.14px]">
                            {slot.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </section>
          </>
        ) : (
          <FullScreenLoading isLoading={isFetching} />
        )}
      </div>

      <AnimatePresence>
        {selectedSlot !== null && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
            className="tw-bg-white tw-fixed tw-bottom-4 tw-right-4 tw-left-4 tw-z-10 tw-p-4 tw-border-[2px] tw-border-subtle tw-rounded-xl tw-shadow"
          >
            <div className="tw-flex tw-flex-col tw-gap-2">
              <section className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src="/assets/time-slot/access-time-icon.svg"
                  alt="time"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-text-lg">{`${dayjs(selectedSlot).format(
                  "YYYY/MM/DD"
                )}(${dayjs(selectedSlot).format("ddd")}) ${dayjs(
                  selectedSlot
                ).format("HH:mm")}`}</span>
              </section>
              <section>
                <Button
                  size="large"
                  type="primary"
                  className="tw-w-full"
                  onClick={() => {
                    onSlotConfirm();
                  }}
                >
                  確認
                </Button>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimeSlotSelectNoProgram;
