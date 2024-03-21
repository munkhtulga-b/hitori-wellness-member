import dayjs from "dayjs";
import { useState } from "react";
import { Button, message } from "antd";
import Image from "next/image";
import { useReservationStore } from "@/app/_store/reservation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const TimeSlotSelect = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const slotInterval = 30;
  const reservationDateLimit = dayjs().add(1, "month").endOf("month");
  const getReservation = useReservationStore((state) => state.getBody());
  const setReservation = useReservationStore((state) => state.setBody);
  const [selectedWeek, setSelectedWeek] = useState({
    start: dayjs().startOf("week"),
    end: dayjs().endOf("week"),
  });
  const [selectedSlots, setSelectedSlots] = useState(null);

  const onSlotSelect = ({ day, timeSlots }, idx) => {
    if (!getReservation.program) {
      return messageApi.open({
        type: "warning",
        content: "Please select a program",
      });
    }
    const slotsToCheck = getReservation.program.service_minutes / slotInterval;
    const shallowSlots = [];
    for (let i = 0; i <= slotsToCheck; i++) {
      shallowSlots.push(timeSlots[idx + i]);
    }
    setSelectedSlots({ day: day, slots: shallowSlots });
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
        timeSlots: getAllAvailableTimes("07:00"),
      });
      currentDate = currentDate.add(1, "day");
    }
    return daysOfWeek;
  };

  const getAllAvailableTimes = (startTime) => {
    const start = new Date(`01/01/2024 ${startTime}`);
    const end = new Date(start);
    end.setHours(start.getHours() + 24);
    end.setMinutes(start.getMinutes());

    const times = [];

    let currentTime = new Date(start);

    while (currentTime < end) {
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);

      // Add 30 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return times;
  };

  return (
    <>
      {contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-[150px]">
        <section>
          <span className="tw-text-xxl tw-font-medium">日時</span>
        </section>
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
                {date.timeSlots.map((time, idx) => {
                  return (
                    <button
                      key={time}
                      className={`${
                        dayjs(selectedSlots?.day).isSame(date.day) &&
                        selectedSlots?.slots.includes(time)
                          ? "tw-bg-aquaLight tw-ring-[2px] tw-ring-available"
                          : "tw-bg-white tw-ring-[1px] tw-ring-available"
                      } tw-w-full tw-h-[38px] tw-px-1 tw-py-2 tw-rounded-lg tw-text-center tw-transition-all tw-duration-300`}
                      onClick={() => onSlotSelect(date, idx)}
                    >
                      <span className="tw-tracking-[0.14px]">{time}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </section>
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
                  {`${dayjs(selectedSlots?.day).format("YYYY/MM/DD")}(土) ${
                    selectedSlots?.slots[0]
                  }-${selectedSlots?.slots[selectedSlots?.slots.length - 1]}`}
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
