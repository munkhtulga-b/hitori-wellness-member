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
import _ from "lodash";
import PlanTicketFilter from "@/app/_components/home/profile/plan/PlanTicketFilter";

const filterOptions = [
  {
    value: "PLAN",
    label: "プラン",
  },
  {
    value: "TICKET",
    label: "チケット",
  },
];

const PurchaseSubscription = () => {
  const router = useRouter();
  const getPurchaseBody = usePurchaseStore((state) => state.getBody());
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);

  const [activeFilterId, setActiveFilterId] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchTickets();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    const filters = {
      studioId: getPurchaseBody?.branch?.id ?? null,
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
      studioId: getPurchaseBody?.branch?.id ?? null,
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
    router.push(
      `/home/profile/purchase/${type === "plan" ? item.id : item.m_ticket?.id}`,
      {
        scroll: false,
      }
    );
  };

  const onExpand = ({ id, name }) => {
    const shallow = [...expandedItems];
    const matched = _.find(shallow, (item) => {
      return item.id === id && item.name === name;
    });
    if (matched) {
      _.remove(shallow, (item) => {
        return item.id === id && item.name === name;
      });
    } else {
      shallow.push({ id, name });
    }
    setExpandedItems(shallow);
  };

  const isItemExpanded = ({ id, name }) => {
    const matched = _.find(expandedItems, (item) => {
      return item.id === id && item.name === name;
    });
    if (matched) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            プラン・チケットをお選びください
          </span>
        </section>
        <section>
          <PlanTicketFilter
            options={filterOptions}
            activeFilterId={activeFilterId}
            setActiveFilterId={setActiveFilterId}
          />
        </section>
        {!isLoading ? (
          <>
            {plans?.length && (activeFilterId === "PLAN" || !activeFilterId) ? (
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
                        <p
                          dangerouslySetInnerHTML={{ __html: plan.description }}
                          className={`tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line ${
                            isItemExpanded(plan) ? "" : "tw-line-clamp-3"
                          }`}
                        ></p>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                          plan.monthly_price
                        )}（税込）／月`}</span>
                        <div className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
                          <Button
                            onClick={() => onExpand(plan)}
                            size="small"
                            className="tw-w-full"
                          >
                            <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
                              <span>詳細</span>
                              <Image
                                src={`/assets/program/arrow-${
                                  isItemExpanded(plan) ? "up" : "down"
                                }.svg`}
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
            ) : null}
            {tickets?.length &&
            (activeFilterId === "TICKET" || !activeFilterId) ? (
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
                        <p
                          dangerouslySetInnerHTML={{
                            __html: ticket.description,
                          }}
                          className={`tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line ${
                            isItemExpanded(ticket) ? "" : "tw-line-clamp-3"
                          }`}
                        ></p>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                          ticket.prices[0]?.price
                        )}（税込）／回`}</span>
                        <div className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
                          <Button
                            size="small"
                            className="tw-w-full"
                            onClick={() => onExpand(ticket)}
                          >
                            <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
                              <span>詳細</span>
                              <Image
                                src={`/assets/program/arrow-${
                                  isItemExpanded(ticket) ? "up" : "down"
                                }.svg`}
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
            {!plans?.length && tickets?.length ? (
              <NoData message={"No data"} />
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
