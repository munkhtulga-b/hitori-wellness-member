import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import Image from "next/image";
import { useReservationStore } from "@/app/_store/reservation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const TimeSlotSelect = ({ timeSlotList }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const slotInterval = 30;
  const slotCapacityPercentage = 60;
  const reservationDateLimit = dayjs().add(1, "month").endOf("month");
  const getReservation = useReservationStore((state) => state.getBody());
  const setReservation = useReservationStore((state) => state.setBody);
  const [selectedWeek, setSelectedWeek] = useState({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [selectedSlots, setSelectedSlots] = useState(null);

  useEffect(() => {
    if (getReservation.time) {
      setSelectedSlots(getReservation.time);
    }
  }, []);

  const onSlotSelect = ({ day, timeSlots }, dateIdx, timeIdx) => {
    if (!getReservation.program) {
      return messageApi.open({
        type: "warning",
        content: "プログラムをご選択ください。",
      });
    }
    const slotsToCheck = getReservation.program.service_minutes / slotInterval;
    const shallowSlots = [];
    for (let i = 0; i <= slotsToCheck; i++) {
      if (timeIdx + i > timeSlots.length - 1) {
        const slotsLength = timeSlots.length;
        const currentIdx = timeIdx + i;
        const nextDayIndex = currentIdx - slotsLength;
        if (!getDaysOfWeek()[dateIdx + 1].timeSlots[nextDayIndex].isAvailable) {
          return messageApi.open({
            type: "warning",
            content: "選択不可能な時間です。別の開始時間をご選択ください。",
          });
        }
        shallowSlots.push(
          `${dayjs(day).add(1, "day").format("YYYY-MM-DD")} ${
            getDaysOfWeek()[dateIdx + 1].timeSlots[nextDayIndex].time
          }`
        );
      } else {
        if (!timeSlots[timeIdx + i].isAvailable) {
          return messageApi.open({
            type: "warning",
            content: "選択不可能な時間です。別の開始時間をご選択ください。",
          });
        }
        shallowSlots.push(
          `${day.format("YYYY-MM-DD")} ${timeSlots[timeIdx + i].time}`
        );
      }
    }

    setSelectedSlots(shallowSlots);
  };

  const onWeekChange = (type) => {
    setSelectedSlots(null);
    setSelectedWeek({
      start: selectedWeek.start[type](1, "week"),
      end: selectedWeek.end[type](1, "week"),
    });
  };

  const getDaysOfWeek = () => {
    const daysOfWeek = [];
    let currentDate = dayjs(selectedWeek.start);

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: currentDate,
        timeSlots: getAllAvailableTimes("07:00", currentDate),
      });
      currentDate = currentDate.add(1, "day");
    }

    if (timeSlotList) {
      timeSlotList.forEach((item) => {
        if (
          item.reserved?.length &&
          dayjs(item.reserved[0].start_at).format("YYYY-MM-DD") ===
            dayjs(daysOfWeek[item.week_day].day).format("YYYY-MM-DD")
        ) {
          item.reserved.forEach((slot) => {
            const duration = dayjs(slot.end_at).diff(slot.start_at, "minute");
            const interval = duration / slotInterval;
            const startIndex = daysOfWeek[item.week_day].timeSlots.findIndex(
              (time) => time.time === dayjs.utc(slot.start_at).format("HH:mm")
            );
            if (startIndex !== -1) {
              for (let i = 0; i < interval; i++) {
                daysOfWeek[item.week_day].timeSlots[
                  startIndex + i
                ].currentCapacity = slot.current_capacity;
                if (slot.current_capacity >= item.max_capacity) {
                  daysOfWeek[item.week_day].timeSlots[
                    startIndex + i
                  ].isAvailable = false;
                }
              }
            }
          });
        }
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
          )
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
    if (selectedSlots) {
      result = selectedSlots.includes(`${day.format("YYYY-MM-DD")} ${time}`);
    }
    return result;
  };

  const isReachingMaxCapacity = ({ currentCapacity }) => {
    let result = false;
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

  return (
    <>
      {contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-[150px]">
        <section>
          <span className="tw-text-xxl tw-font-medium">日時</span>
        </section>
        {timeSlotList ? (
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
                  setSelectedSlots(null);
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
              {getDaysOfWeek().map((date, dateIdx) => {
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
                    {date.timeSlots.map((slot, timeIdx) => {
                      return (
                        <button
                          key={slot.time}
                          disabled={!slot.isAvailable}
                          className={`${
                            isSlotSelected(date.day, slot.time)
                              ? "tw-bg-aquaLight tw-ring-[2px] tw-ring-available"
                              : "tw-bg-white tw-ring-[1px] tw-ring-available"
                          } tw-w-full tw-h-[38px] tw-px-1 tw-py-2 tw-rounded-lg tw-text-center disabled:tw-bg-dividerMedium disabled:tw-text-disabled disabled:tw-ring-transparent tw-relative tw-transition-all tw-duration-300`}
                          onClick={() => onSlotSelect(date, dateIdx, timeIdx)}
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
        ) : null}
      </div>

      <AnimatePresence>
        {selectedSlots !== null && (
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
                <span className="tw-text-lg">{`${
                  getReservation?.program?.service_minutes ?? 0
                }分`}</span>
              </section>
              <section>
                <p className="tw-tracking-[0.14px]">
                  {`${dayjs(selectedSlots[0]).format("YYYY/MM/DD")}(${dayjs(
                    selectedSlots[0]
                  ).format("ddd")}) ${dayjs(selectedSlots[0]).format(
                    "HH:mm"
                  )}-${dayjs(selectedSlots[selectedSlots?.length - 1]).format(
                    "HH:mm"
                  )}`}
                </p>
              </section>
              <section>
                <Button
                  size="large"
                  type="primary"
                  className="tw-w-full"
                  onClick={() => {
                    setReservation({
                      time: selectedSlots,
                    });
                    router.push("/home/reservation/confirm");
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

export default TimeSlotSelect;
