import { Button } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";

const PlanTicketFilter = ({ activeFilterId, setActiveFilterId, options }) => {
  const handleFilterClick = (value) => {
    if (activeFilterId === value) {
      const el = document.getElementById(`filter-${value}`);
      el?.blur();
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
        {options.map((option) => {
          return (
            <Button
              id={`filter-${option.value}`}
              size="small"
              key={option.value}
              onClick={() => handleFilterClick(option.value)}
              style={{
                borderColor: activeFilterId === option.value && "#B7DDFF",
                color: activeFilterId === option.value && "#1890FF",
              }}
            >
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <span>{`${nullSafety(option.label)}`}</span>
                {activeFilterId === option.value ? (
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

export default PlanTicketFilter;
