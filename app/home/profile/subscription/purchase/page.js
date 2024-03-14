"use client";

import { useState, useEffect } from "react";
import { Button } from "antd";
import Image from "next/image";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import NoData from "@/app/_components/custom/NoData";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";

const PurchaseSubscription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    fetchSubsriptions();
  }, []);

  const fetchSubsriptions = async () => {
    setIsLoading(true);
    setSubscriptions([
      {
        id: 1,
        name: "月会費プラン",
        description:
          "しっかり週2（月8回まで）「フィットネスエリア・ロッカールーム、シャワー、お風呂、サウナ」の施設がご利用いただけます。",
        price: 8000,
      },
      {
        id: 2,
        name: "年会費プラン",
        description:
          "しっかり週2（月8回まで）「フィットネスエリア・ロッカールーム、シャワー、お風呂、サウナ」の施設がご利用い：",
        price: 8000,
      },
      {
        id: 3,
        name: "年会費プラン",
        description:
          "しっかり週2（月8回まで）「フィットネスエリア・ロッカールーム、シャワー、お風呂、サウナ」の施設がご利用い：",
        price: 8000,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">チケット購入</span>
        </section>
        {!isLoading ? (
          <>
            {subscriptions?.length ? (
              <>
                {subscriptions.map((subscription) => {
                  return (
                    <section
                      key={subscription.id}
                      className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow"
                    >
                      <div className="tw-flex tw-flex-col tw-gap-2">
                        <span className="tw-text-lg">
                          {nullSafety(subscription.name)}
                        </span>
                        <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                          {nullSafety(subscription.description)}
                        </p>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                          subscription.price
                        )}（税込）／月～`}</span>
                        <div className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
                          <Button size="small" className="tw-w-full">
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
                          <Button size="small" className="tw-w-full">
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
          </>
        ) : (
          <FullScreenLoading isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default PurchaseSubscription;
