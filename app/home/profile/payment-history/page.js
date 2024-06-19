"use client";

// import Image from "next/image";
import $api from "@/app/_api";
import dayjs from "dayjs";
import { nullSafety } from "@/app/_utils/helpers";
import NoData from "@/app/_components/custom/NoData";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const PaymentHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    size: 10,
    total: 0,
  });

  useEffect(() => {
    fetchPayments({
      page: pagination.current - 1,
      limit: pagination.size,
    });
  }, []);

  const fetchPayments = async (queries) => {
    setIsLoading(true);
    const { isOk, data, range } = await $api.member.purchase.getMany(queries);
    if (isOk) {
      setPayments(data);
      if (range) {
        setPagination((prev) => ({
          ...prev,
          total: Number(range?.split("/")[1]),
        }));
      }
    }
    setIsLoading(false);
  };

  const onPaginationChange = (page, size) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      size: size,
    }));
    fetchPayments({
      page: page - 1,
      limit: size,
    });
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">支払い履歴</span>
        </section>
        <>
          {!isLoading ? (
            <>
              {payments?.length ? (
                <div className="tw-h-full tw-flex tw-flex-col tw-justify-start tw-gap-6">
                  {payments.map((payment) => (
                    <section
                      key={payment.id}
                      className="tw-flex tw-flex-col tw-gap-4 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow"
                    >
                      <ul className="tw-flex tw-flex-col tw-gap-4">
                        <li className="tw-flex tw-justify-start">
                          <section className="tw-w-[30%]">
                            <span className="tw-text-sm tw-tracking-[0.12px]">
                              注文番号
                            </span>
                          </section>
                          <section className="tw-grow">
                            <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                              {nullSafety(payment.id)}
                            </span>
                          </section>
                        </li>
                        <li className="tw-flex tw-justify-start">
                          <section className="tw-w-[30%]">
                            <span className="tw-text-sm tw-tracking-[0.12px]">
                              店舗
                            </span>
                          </section>
                          <section className="tw-grow">
                            <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                              {nullSafety(payment.studio?.name)}
                            </span>
                          </section>
                        </li>
                        <li className="tw-flex tw-justify-start">
                          <section className="tw-w-[30%]">
                            <span className="tw-text-sm tw-tracking-[0.12px]">
                              購入日時
                            </span>
                          </section>
                          <section className="tw-grow">
                            <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                              {dayjs
                                .utc(payment.created_at)
                                .format("YYYY-MM-DD HH:mm")}
                            </span>
                          </section>
                        </li>
                        <li className="tw-flex tw-justify-start">
                          <section className="tw-w-[30%]">
                            <span className="tw-text-sm tw-tracking-[0.12px]">
                              決済カード
                            </span>
                          </section>
                          <section className="tw-grow">
                            <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                              {` xxxx xxxx xxxx ${nullSafety(
                                payment.payment_card_details?.card_last4
                              )}`}
                            </span>
                          </section>
                        </li>
                      </ul>
                      <div className="tw-bg-dividerLight tw-h-[1px] tw-w-full"></div>
                      <div className="tw-flex tw-justify-start tw-items-center tw-gap-4">
                        <section className="tw-grow tw-flex tw-flex-col tw-gap-2">
                          <span className="tw-text-sm tw-tracking-[0.12px]">
                            購入商品
                          </span>
                          <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                            {nullSafety(payment.description)}
                          </p>
                        </section>
                        {/* <Image
                    src="/assets/profile/arrow-right.svg"
                    alt="go"
                    width={0}
                    height={0}
                    style={{ width: "auto", height: "auto" }}
                  /> */}
                      </div>
                    </section>
                  ))}
                  <section className="tw-flex tw-justify-center">
                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.size}
                      total={pagination.total}
                      onChange={(page, size) => onPaginationChange(page, size)}
                    />
                  </section>
                </div>
              ) : (
                <NoData message={"履歴がありません。"} />
              )}
            </>
          ) : (
            <FullScreenLoading isLoading={isLoading} />
          )}
        </>
      </div>
    </>
  );
};

export default PaymentHistory;
