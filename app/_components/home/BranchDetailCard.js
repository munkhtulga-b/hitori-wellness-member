"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useReservationStore } from "@/app/_store/reservation";
import { useLayoutEffect, useState } from "react";
import { usePurchaseStore } from "@/app/_store/purchase";

const BranchDetailCard = ({
  branch,
  memberPlan,
  permittedBranches,
  reservations,
}) => {
  const router = useRouter();
  const getReservationBody = useReservationStore((state) => state.getBody());
  const setReservationBody = useReservationStore((state) => state.setBody);
  const resetReservationBody = useReservationStore((state) => state.resetBody);
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const resetPurchaseBody = usePurchaseStore((state) => state.resetBody);
  const [isMounted, setIsMounted] = useState(false);
  // const [isHomeBranch, setIsHomeBranch] = useState(false);
  const [reserveText, setReserveText] = useState("プランで予約する");

  useLayoutEffect(() => {
    checkMemberTickets().then(() => {
      setIsMounted(true);
    });
  }, [permittedBranches]);

  const checkMemberTickets = async () => {
    if (
      !permittedBranches.plan?.includes(branch.id) &&
      (permittedBranches.ticket?.includes(branch.id) ||
        permittedBranches.ticket?.length === 0)
    ) {
      resetReservationBody();
      setReservationBody({ branch: branch });
      setReserveText("チケットで予約する");
    }
  };

  const handleMakeReservation = () => {
    if (reserveText === "チケットで予約する") {
      return router.push(`/home/tickets/${branch.id}`);
    }
    resetReservationBody();
    setReservationBody({ branch: branch });
    router.push("/home/reservation");
  };

  const onPurchaseWithoutMemberPlan = () => {
    resetPurchaseBody();
    setPurchaseBody({ branch: branch });
    router.push("/home/profile/purchase/plan");
  };

  const isReachedMaxReservation = () => {
    let result = false;
    if (
      reservations?.length >=
        memberPlan[0]?.plan?.max_cc_reservable_num_by_plan &&
      !getReservationBody.id
    ) {
      result = true;
    }
    return result;
  };

  const isBranchPermitted = () => {
    let result = {
      plan: false,
      ticket: false,
    };
    if (permittedBranches) {
      if (
        permittedBranches.plan?.includes(branch.id) ||
        permittedBranches.plan?.length === 0
      ) {
        result.plan = true;
      }
      if (
        permittedBranches.ticket?.includes(branch.id) ||
        permittedBranches.ticket?.length === 0
      ) {
        result.ticket = true;
      }
    }
    return result;
  };

  const isReserveDisabled = () => {
    let result = false;
    if (isBranchPermitted().ticket) {
      result = false;
    } else {
      if (!isBranchPermitted().plan || isReachedMaxReservation()) {
        result = true;
      }
    }
    return result;
  };

  return (
    <>
      {isMounted ? (
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
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                  unoptimized
                />
              ) : null}
            </div>
            <span className="tw-text-xxl tw-font-medium">
              {nullSafety(branch.name)}
            </span>
          </section>
          <section className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <section className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src="/assets/branch/schedule-icon.svg"
                  alt="schedule"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-text-lg">
                  営業時間{" "}
                  {`(${nullSafety(
                    branch?.timeperiod_details?.[0]?.start_hour
                  )} - ${nullSafety(
                    branch?.timeperiod_details?.[0]?.end_hour
                  )})`}
                </span>
              </section>
              <p
                dangerouslySetInnerHTML={{
                  __html: branch.business_hours,
                }}
                className="tw-whitespace-pre-wrap"
              ></p>
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
          {isReachedMaxReservation() && (
            <section className="tw-w-full tw-rounded-xl tw-border tw-border-info tw-p-4">
              <p className="tw-leading-[22px] tw-tracking-[0.14px]">
                一日あたりの同時予約上限数に達しています。
              </p>
            </section>
          )}
          {!memberPlan?.length ? (
            <section className="tw-w-full tw-rounded-xl tw-border tw-border-info tw-p-4 tw-flex tw-justify-between tw-items-center tw-gap-2">
              <Image
                src="/assets/branch/warning-icon.svg"
                alt="warning"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
              <span className="tw-grow tw-text-sm tw-tracking-[0.12px]">
                予約するにはプランへの加入・チケットが必要です。
              </span>
              <Button
                size="small"
                onClick={() => onPurchaseWithoutMemberPlan()}
              >
                買う
              </Button>
            </section>
          ) : null}
          {/* <section className="tw-py-6">
          <Checkbox
            checked={isHomeBranch}
            onChange={(e) => setIsHomeBranch(e.target.checked)}
          >
            所属店舗にする。
          </Checkbox>
        </section> */}
          <section className="tw-mt-1">
            <Button
              disabled={isReserveDisabled()}
              onClick={handleMakeReservation}
              size="large"
              type="primary"
              className="tw-w-full"
            >
              {reserveText}
            </Button>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default BranchDetailCard;
