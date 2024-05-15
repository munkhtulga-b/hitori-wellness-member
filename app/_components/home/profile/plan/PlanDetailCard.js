"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "antd";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { usePurchaseStore } from "@/app/_store/purchase";
import { useEffect, useState } from "react";
import $api from "@/app/_api";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";

const PlanDetailCard = () => {
  const router = useRouter();
  const { id } = useParams();
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.plan.getOne(id);
    if (isOk) {
      setPlan(data);
    }
    setIsLoading(false);
  };

  const onselect = () => {
    setPurchaseBody({ plan: plan, item: null });
    router.push(`/home/profile/purchase/${plan.id}`);
  };

  return (
    <>
      {!isLoading ? (
        <>
          {plan ? (
            <div className="tw-flex tw-flex-col tw-gap-4">
              <section>
                <span className="tw-text-xxl tw-font-medium">
                  {nullSafety(plan.name)}
                </span>
              </section>
              <section className="tw-bg-white tw-rounded-xl tw-p-4 tw-shadow tw-flex tw-flex-col tw-gap-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: nullSafety(plan.description),
                  }}
                  className="tw-leading-[22px] tw-tracking-[0.14px] tw-whitespace-pre-line"
                ></p>
                <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                  plan.monthly_price
                )}（税込）／月`}</span>
              </section>
              <section className="tw-mt-1">
                <Button
                  size="large"
                  type="primary"
                  className="tw-w-full"
                  onClick={() => onselect()}
                >
                  選ぶ
                </Button>
              </section>
            </div>
          ) : (
            <NoData message="No plan was found" />
          )}
        </>
      ) : (
        <FullScreenLoading isLoading={isLoading} />
      )}
    </>
  );
};

export default PlanDetailCard;
