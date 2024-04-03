"use client";

import { useState, useEffect } from "react";
import { Button } from "antd";
import Image from "next/image";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import $api from "@/app/_api";
import { usePurchaseStore } from "@/app/_store/purchase";
import { useRouter } from "next/navigation";

const PurchaseSubscription = () => {
  const router = useRouter();
  const getPurchaseBody = usePurchaseStore((state) => state.getBody());
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState(null);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchTickets();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    const filters = {
      branch: getPurchaseBody?.branch?.id ?? null,
    };
    const { isOk, data } = await $api.member.plan.getMany(filters);
    if (isOk) {
      setPlans(data);
    }
    setIsLoading(false);
  };

  const fetchTickets = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.item.getMany({
      itemType: "ticket",
    });
    if (isOk) {
      setTickets(data);
    }
    setIsLoading(false);
  };

  const onSelect = (item, type) => {
    setPurchaseBody({
      [type]: item,
      [type === "plan" ? "item" : "plan"]: null,
    });
    router.push(`/home/profile/purchase/${item.id}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            プラン・チケットをお選びください
          </span>
        </section>
        {!isLoading ? (
          <>
            {plans?.length ? (
              <>
                {plans.map((plan) => {
                  return (
                    <section
                      key={plan.id}
                      className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow"
                    >
                      <div className="tw-flex tw-flex-col tw-gap-2">
                        <span className="tw-text-lg">
                          {nullSafety(plan.name)}
                        </span>
                        <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-wrap tw-line-clamp-3">
                          {nullSafety(plan.description)}
                        </p>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                          plan.monthly_price
                        )}（税込）／月`}</span>
                        <div className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
                          <Button
                            onClick={() =>
                              router.push(
                                `/home/profile/purchase/plan/${plan.id}`
                              )
                            }
                            size="small"
                            className="tw-w-full"
                          >
                            <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
                              <span>詳細</span>
                              <Image
                                src="/assets/program/arrow-right.svg"
                                alt="next"
                                width={0}
                                height={0}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </div>
                          </Button>
                          <Button
                            onClick={() => onSelect(plan, "plan")}
                            size="small"
                            className="tw-w-full"
                          >
                            選ぶ
                          </Button>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </>
            ) : (
              <NoData message={"No data"} />
            )}
            {tickets?.length ? (
              <>
                {tickets.map((ticket) => {
                  return (
                    <section
                      key={ticket.id}
                      className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow"
                    >
                      <div className="tw-flex tw-flex-col tw-gap-2">
                        <span className="tw-text-lg">
                          {nullSafety(ticket.name)}
                        </span>
                        <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-wrap tw-line-clamp-3">
                          {nullSafety(ticket.description)}
                        </p>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                          ticket.prices[0]?.price
                        )}（税込）／月`}</span>
                        <div className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
                          <Button
                            size="small"
                            className="tw-w-full"
                            onClick={() =>
                              router.push(
                                `/home/profile/purchase/ticket/${ticket.id}`
                              )
                            }
                          >
                            <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
                              <span>詳細</span>
                              <Image
                                src="/assets/program/arrow-right.svg"
                                alt="next"
                                width={0}
                                height={0}
                                style={{ width: "auto", height: "auto" }}
                              />
                            </div>
                          </Button>
                          <Button
                            size="small"
                            className="tw-w-full"
                            onClick={() => onSelect(ticket, "item")}
                          >
                            選ぶ
                          </Button>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </>
            ) : null}
          </>
        ) : (
          <FullScreenLoading isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default PurchaseSubscription;
