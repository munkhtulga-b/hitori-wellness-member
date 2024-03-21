"use client";

import $api from "@/app/_api";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { Button } from "antd";
import { useEffect, useState } from "react";
import NoData from "@/app/_components/custom/NoData";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const ActiveSubscription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [memberPlan, setMemberPlan] = useState(null);

  useEffect(() => {
    fetchMemberPlan();
  }, []);

  const fetchMemberPlan = async () => {
    setIsLoading(true);
    const { isOk, data } = await $api.member.memberPlan.getMany();
    if (isOk && data.length) {
      setMemberPlan(data[0]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">
            加入中プラン・所持チケット
          </span>
        </section>
        {!isLoading ? (
          <>
            {memberPlan ? (
              <>
                <section className="tw-flex tw-flex-col tw-gap-2 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
                  <span className="tw-text-lg">
                    {nullSafety(memberPlan?.plan?.name)}
                  </span>
                  <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                    {nullSafety(memberPlan?.plan?.description)}
                  </p>
                  <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
                    <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                      {`料金: ${thousandSeparator(
                        memberPlan?.plan?.monthly_item?.prices[0]?.price
                      )}円 （税込）／月～`}
                    </span>
                    <Button className="tw-w-[100px]">解約</Button>
                  </div>
                </section>
                {/* TODO: Integrate tickets */}
                {/* <section className="tw-flex tw-flex-col tw-gap-1 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
              <span className="tw-text-lg">ストレッチチケット (1回券)</span>
              <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                パーソナルストレッチメニュー予約専用チケットです。こちらのチケットは都度利用専用となります。
              </p>
            </section> */}
              </>
            ) : (
              <NoData message={"No plan found"} />
            )}
          </>
        ) : (
          <FullScreenLoading />
        )}
      </div>
    </>
  );
};

export default ActiveSubscription;
