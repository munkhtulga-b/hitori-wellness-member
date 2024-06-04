import { Input } from "antd";
import { getYears, getMonths, getDays } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";
import { useClickOutside } from "@/app/_utils/hooks";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";

const MobileDOBSelector = ({ data, onChange }) => {
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState("YYYY");
  const [selectedMonth, setSelectedMonth] = useState("MM");
  const [selectedDay, setSelectedDay] = useState("DD");

  const [searchedYear, setSearchedYear] = useState("");
  const [searchedMonth, setSearchedMonth] = useState("");
  const [searchedDay, setSearchedDay] = useState("");

  const minAge = 15;
  const maxAge = 100;

  useEffect(() => {
    if (data) {
      setSelectedYear(dayjs(data).format("YYYY"));
      setSelectedMonth(dayjs(data).format("MM"));
      setSelectedDay(dayjs(data).format("DD"));
    }
  }, [data]);

  useEffect(() => {
    if (
      !isNaN(Number(selectedYear)) &&
      !isNaN(Number(selectedMonth)) &&
      !isNaN(Number(selectedDay))
    ) {
      onChange(
        dayjs(`${selectedYear}-${selectedMonth}-${selectedDay}`).format(
          "YYYY-MM-DD"
        )
      );
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const filteredYears = () => {
    let result = [];
    if (searchedYear?.length) {
      result = getYears(minAge, maxAge).filter((item) => {
        return item.value.toString().includes(searchedYear);
      });
    } else {
      result = getYears(minAge, maxAge);
    }
    return result;
  };

  const filteredMonths = () => {
    let result = [];
    if (searchedMonth?.length) {
      result = getMonths().filter((item) => {
        return item.value.toString().includes(searchedMonth);
      });
    } else {
      result = getMonths();
    }
    return result;
  };

  const filteredDays = () => {
    let result = [];
    if (searchedDay?.length) {
      result = getDays(selectedYear, selectedMonth).filter((item) => {
        return item.value.toString().includes(searchedDay);
      });
    } else {
      result = getDays(selectedYear, selectedMonth);
    }
    return result;
  };

  return (
    <>
      <div className="tw-w-full tw-relative">
        <Input
          placeholder="YYYY/MM/DD"
          value={`${selectedYear}/${selectedMonth}/${selectedDay}`}
          className="dropdown-triggerer tw-w-full"
          onClick={() => setIsOpen(!isOpen)}
          readOnly
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              ref={dropdownRef}
              className="tw-absolute tw-top-16 tw-left-0 tw-right-0 tw-p-2 tw-rounded-xl tw-bg-white tw-shadow tw-z-[99] tw-overflow-clip"
            >
              <div className="tw-flex tw-justify-start tw-gap-2">
                <section className="tw-flex-1 tw-flex tw-flex-col tw-gap-2 tw-max-h-[150px]">
                  <Input
                    placeholder="YYYY"
                    size="small"
                    onChange={(e) => {
                      const value = e.target.value;
                      const formatted = value?.replace(/\D/g, "");
                      setSearchedYear(formatted);
                    }}
                    value={searchedYear}
                  />
                  <ul className="tw-flex tw-flex-col tw-gap-1 tw-overflow-y-auto tw-overflow-x-hidden">
                    {filteredYears().map((item) => (
                      <li
                        key={item.value}
                        className={`tw-leading-[22px] tw-tracking-[0.14px] tw-px-2 tw-py-[0.5px] tw-rounded ${
                          selectedYear === item.value ? "tw-bg-black/10" : ""
                        }`}
                        onClick={() => setSelectedYear(item.value)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="tw-flex-1 tw-flex tw-flex-col tw-gap-2 tw-max-h-[150px]">
                  <Input
                    placeholder="MM"
                    size="small"
                    onChange={(e) => {
                      const value = e.target.value;
                      const formatted = value?.replace(/\D/g, "");
                      setSearchedMonth(formatted);
                    }}
                  />
                  <ul className="tw-flex tw-flex-col tw-gap-1 tw-overflow-y-auto tw-overflow-x-hidden">
                    {filteredMonths().map((item) => (
                      <li
                        key={item.value}
                        className={`tw-leading-[22px] tw-tracking-[0.14px] tw-px-2 tw-py-[0.5px] tw-rounded ${
                          selectedMonth === item.value ? "tw-bg-black/10" : ""
                        }`}
                        onClick={() => setSelectedMonth(item.value)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="tw-flex-1 tw-flex tw-flex-col tw-gap-2 tw-max-h-[150px]">
                  <Input
                    placeholder="DD"
                    size="small"
                    onChange={(e) => {
                      const value = e.target.value;
                      const formatted = value?.replace(/\D/g, "");
                      setSearchedDay(formatted);
                    }}
                  />
                  <ul className="tw-flex tw-flex-col tw-gap-1 tw-overflow-y-auto tw-overflow-x-hidden">
                    {filteredDays().map((item) => (
                      <li
                        key={item.value}
                        className={`tw-leading-[22px] tw-tracking-[0.14px] tw-px-2 tw-py-[0.5px] tw-rounded ${
                          selectedDay === item.value ? "tw-bg-black/10" : ""
                        }`}
                        onClick={() => setSelectedDay(item.value)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MobileDOBSelector;
