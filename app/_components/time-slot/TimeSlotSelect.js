import dayjs from "dayjs";
import { Button } from "antd";
import Image from "next/image";

const TimeSlotSelect = () => {
  const getDaysOfWeek = () => {
    const daysOfWeek = [];
    let currentDate = dayjs().startOf("week");

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        dayCharacter: currentDate.format("ddd"),
        dayNumber: currentDate.format("DD"),
        timeSlots: getAllAvailableTimes("07:00", "20:00"),
      });
      currentDate = currentDate.add(1, "day");
    }
    return daysOfWeek;
  };

  const getAllAvailableTimes = (startTime, endTime) => {
    const start = new Date(`01/01/2024 ${startTime}`);
    const end = new Date(`01/01/2024 ${endTime}`);
    const times = [];

    let currentTime = start;

    while (currentTime <= end) {
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      currentTime = new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes
    }

    return times;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-[150px]">
        <section>
          <span className="tw-text-xxl tw-font-medium">日時</span>
        </section>
        <section className="tw-flex tw-justify-start tw-items-center tw-gap-2">
          <Button className="tw-grow">
            <span>{`${dayjs().startOf("week").format("MM/DD")} - ${dayjs()
              .endOf("week")
              .format("MM/DD")}`}</span>
          </Button>
          <Button>
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
          {getDaysOfWeek().map((day) => {
            return (
              <div
                key={day.dayCharacter}
                className="tw-flex tw-flex-col tw-items-center tw-gap-[6px]"
              >
                <section className="tw-flex tw-flex-col tw-gap-1">
                  <span className="tw-text-lg">{day.dayNumber}</span>
                  <span className="tw-text-lg">{day.dayCharacter}</span>
                </section>
                {day.timeSlots.map((time) => {
                  return (
                    <section
                      key={time}
                      className={`tw-bg-white tw-w-full tw-h-[38px] tw-px-1 tw-py-2 tw-rounded-lg tw-border tw-border-available tw-text-center`}
                    >
                      <span className="tw-tracking-[0.14px]">{time}</span>
                    </section>
                  );
                })}
              </div>
            );
          })}
        </section>
      </div>

      <div className="tw-bg-white tw-fixed tw-bottom-4 tw-right-4 tw-left-4 tw-z-10 tw-p-4 tw-border-[2px] tw-border-subtle tw-rounded-xl">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <section className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src="/assets/time-slot/access-time-icon.svg"
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-text-lg">{`${120}分`}</span>
          </section>
          <section>
            <p className="tw-tracking-[0.14px]">2024/01/03(土) 07:00-09:30</p>
          </section>
          <section>
            <Button size="large" type="primary" className="tw-w-full">
              確認
            </Button>
          </section>
        </div>
      </div>
    </>
  );
};

export default TimeSlotSelect;
