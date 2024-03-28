"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useReservationStore } from "@/app/_store/reservation";
import ReservationCard from "./profile/reservation/ReservationCard";

const HomeBranchDetailCard = ({ branch, reservation }) => {
  const router = useRouter();
  const setBranch = useReservationStore((state) => state.setBody);
  // const [isHomeBranch, setIsHomeBranch] = useState(false);

  const handleMakeReservation = () => {
    setBranch({ branch: branch });
    router.push("/home/reservation");
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-flex tw-flex-col tw-gap-1">
          <div
            className={`tw-w-full ${
              !branch.thumbnail_code ? "tw-h-[285px]" : ""
            } tw-bg-gray-200 tw-rounded-xl tw-overflow-hidden`}
          >
            {branch.thumbnail_code ? (
              <Image
                priority
                src={`https://${process.env.BASE_IMAGE_URL}${branch.thumbnail_code}`}
                alt="thumbnail"
                width={0}
                height={0}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
                unoptimized
              />
            ) : null}
          </div>
          <span className="tw-text-xxl tw-font-medium">
            {nullSafety(branch.name)}
          </span>
        </section>
        {!reservation ? (
          <section className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src="/assets/branch/schedule-icon.svg"
                  alt="schedule"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-text-lg">営業時間</span>
              </div>
              <p className="tw-whitespace-pre-line">
                {nullSafety(branch.business_hours)}
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <a
                href={branch.gmap_url ? branch.gmap_url : "#"}
                target="_blank"
                rel="noreferrer"
                className="tw-flex tw-justify-start tw-items-center tw-gap-2 tw-text-current"
              >
                <Image
                  src="/assets/branch/location-icon.svg"
                  alt="location"
                  width={20}
                  height={20}
                />
                <span className="tw-tracking-[0.14px]">
                  {nullSafety(branch.prefecture)}
                </span>
              </a>
              <p className="tw-whitespace-normal">
                {`${nullSafety(branch.address1)} ${nullSafety(
                  branch.address2
                )} ${nullSafety(branch.address3)}`}
              </p>
            </div>
          </section>
        ) : (
          <>
            <ReservationCard reservation={reservation} activeFilterId={null} />
          </>
        )}
        <section className="tw-mt-1">
          <Button
            onClick={handleMakeReservation}
            size="large"
            type="primary"
            className="tw-w-full"
          >
            予約する
          </Button>
        </section>
      </div>
    </>
  );
};

export default HomeBranchDetailCard;
