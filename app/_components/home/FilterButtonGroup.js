import { Button } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";

const FilterButtonGroup = ({
  activeFilterId,
  setActiveFilterId,
  filterName,
  options,
}) => {
  const handleFilterClick = (value) => {
    if (activeFilterId === value) {
      return setActiveFilterId(null);
    }
    setActiveFilterId(value);
  };

  return (
    <>
      <div className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-2">
        <Button
          size="small"
          onClick={() => handleFilterClick(null)}
          style={{
            borderColor: activeFilterId === null && "#B7DDFF",
            color: activeFilterId === null && "#1890FF",
          }}
        >
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <span>全て</span>
            {!activeFilterId === null ? (
              <Image
                src="/assets/branch/close-icon-blue.svg"
                alt="remove"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            ) : null}
          </div>
        </Button>
        {options.map((filter, idx) => {
          return (
            <Button
              size="small"
              key={idx}
              onClick={() => handleFilterClick(idx)}
              style={{
                borderColor: activeFilterId === idx && "#B7DDFF",
                color: activeFilterId === idx && "#1890FF",
              }}
            >
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <span>{nullSafety(filter[0][filterName])}</span>
                {activeFilterId === idx ? (
                  <Image
                    src="/assets/branch/close-icon-blue.svg"
                    alt="remove"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : null}
              </div>
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default FilterButtonGroup;
