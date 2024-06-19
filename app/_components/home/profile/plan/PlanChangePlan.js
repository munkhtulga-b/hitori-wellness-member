"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "antd";
import Image from "next/image";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import $api from "@/app/_api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";
import MemberPlanCard from "./PlanCard";

const PlanChangePlan = ({ currentPlan }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    const filters = {
      studioId: searchParams.get("studioId") ?? null,
    };
    const { isOk, data } = await $api.member.plan.getMany(filters);
    if (isOk) {
      setPlans(data);
    }
    setIsLoading(false);
  };

  const onSelect = (plan) => {
    router.push(`${path}?${createQueryString("planId", plan.id)}`);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

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
        {!isLoading ? (
          <>
            {currentPlan ? (
              <div className="tw-flex tw-flex-col tw-gap-4">
                <span className="tw-text-xxl tw-font-medium">加入中プラン</span>
                <MemberPlanCard memberPlan={currentPlan} isChanging={true} />
              </div>
            ) : null}
            {plans?.length ? (
              <>
                <section>
                  <span className="tw-text-xxl tw-font-medium">
                    新しいプランを選択してください
                  </span>
                </section>
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
                            onClick={() => onSelect(plan)}
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
              <NoData />
            )}
          </>
        ) : (
          <FullScreenLoading isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default PlanChangePlan;
