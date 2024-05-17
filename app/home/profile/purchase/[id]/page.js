"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isNullOrUndefined,
  nullSafety,
  thousandSeparator,
} from "@/app/_utils/helpers";
import { Form, Button, Input, Radio, Select, Modal } from "antd";
import Image from "next/image";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";
import { motion, AnimatePresence } from "framer-motion";
import $api from "@/app/_api";
import dayjs from "dayjs";
import { usePurchaseStore } from "@/app/_store/purchase";
import { useReservationStore } from "@/app/_store/reservation";

const SubscriptionDetail = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const setPurchaseBody = usePurchaseStore((state) => state.setBody);
  const getPuchaseBody = usePurchaseStore((state) => state.getBody());
  const reserPurchaseBody = usePurchaseStore((state) => state.resetBody);
  const setReservationBody = useReservationStore((state) => state.setBody);
  const [step, setStep] = useState(1);
  const [cards, setCards] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [usedCouponCode, setUsedCouponCode] = useState(null);
  const [isLoading, setIsLoading] = useState({
    isFetching: true,
    isRequesting: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCreditCards();
  }, []);

  const fetchCreditCards = async () => {
    setIsLoading((prev) => ({ ...prev, isFetching: true }));
    const { isOk, data } = await $api.member.card.getMany();
    if (isOk) {
      setCards(data);
    }
    setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const addCard = async (body) => {
    setIsLoading((prev) => ({ ...prev, isRequesting: true }));
    const { isOk } = await $api.member.card.create(body);
    if (isOk) {
      await fetchCreditCards();
      setStep(2);
    }
    setIsLoading((prev) => ({ ...prev, isRequesting: false }));
  };

  const createPurchase = async (body) => {
    setIsLoading((prev) => ({ ...prev, isRequesting: true }));
    const { isOk } = await $api.member.purchase.create(body);
    if (isOk) {
      setStep(3);
    } else {
      setIsModalOpen(true);
    }
    setIsLoading((prev) => ({ ...prev, isRequesting: false }));
  };

  const onCouponConfirm = async ({ coupon }) => {
    setIsLoading((prev) => ({ ...prev, isRequesting: true }));
    let isSuccess = false;
    if (getPuchaseBody.plan) {
      const { isOk, data } = await $api.member.plan.getCoupon(
        getPuchaseBody.plan.id,
        { couponCode: coupon, studioId: getPuchaseBody.branch?.id }
      );
      if (isOk) {
        isSuccess = true;
        setPurchaseBody({ plan: data });
      }
    } else if (getPuchaseBody.item) {
      const { isOk, data } = await $api.member.item.getCoupon(
        getPuchaseBody.item.id,
        {
          couponCode: coupon,
          studioId: getPuchaseBody.branch?.id,
        }
      );
      if (isOk) {
        isSuccess = true;
        setPurchaseBody({ item: data });
      }
    }

    if (isSuccess) {
      setUsedCouponCode(coupon);
    }
    setIsLoading((prev) => ({ ...prev, isRequesting: false }));
  };

  const onPurchase = async () => {
    const body = {
      studioId: getPuchaseBody.branch?.id,
      [getPuchaseBody.item ? "itemId" : "planId"]: getPuchaseBody.item
        ? getPuchaseBody.item.id
        : getPuchaseBody.plan.id,
      cardId: selectedCard?.id,
    };
    if (usedCouponCode) {
      body["couponCode"] = usedCouponCode;
    }
    createPurchase(body);
  };

  const onContinueReservation = () => {
    setReservationBody({ branch: getPuchaseBody.branch });
    router.push(`/home/reservation`);
    reserPurchaseBody();
  };

  const onPlanConfirm = () => {
    setStep(2);
  };

  const pageHeader = () => {
    let result = "購入明細";
    if (step === 2) {
      result = "支払い方法をお選びください";
    }
    if (step === "add") {
      result = "カードの追加";
    }
    return result;
  };

  const SelectedPlan = () => {
    const itemType = getPuchaseBody.plan ? "plan" : "item";
    return getPuchaseBody[itemType] ? (
      <>
        <section className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow">
          <div className="tw-flex tw-flex-col tw-gap-2">
            <span className="tw-text-lg">
              {nullSafety(getPuchaseBody[itemType].name)}
            </span>
            <p
              dangerouslySetInnerHTML={{
                __html: nullSafety(getPuchaseBody[itemType].description),
              }}
              className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line"
            ></p>
            <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
              itemType === "plan"
                ? getPuchaseBody[itemType].monthly_price
                : getPuchaseBody[itemType].prices[0].price
            )}（税込）／月`}</span>
          </div>
        </section>
        <section className="tw-grow tw-mt-4">
          <Form
            form={form}
            name="PurchasePlan"
            onFinish={(params) => onCouponConfirm(params)}
            style={{ height: "100%" }}
            requiredMark={false}
          >
            <div className="tw-flex tw-flex-col tw-justify-between tw-h-full">
              <section className="tw-flex tw-flex-col tw-gap-2">
                <label>クーポンを選択してください</label>
                <section className="tw-flex tw-justify-start tw-items-start tw-gap-4">
                  <Form.Item
                    name="coupon"
                    rules={[
                      {
                        required: true,
                        message: "正しいクーポンコードを入力ください。",
                        whitespace: false,
                        min: 4,
                      },
                    ]}
                    validateTrigger="onSubmit"
                    className="tw-grow"
                  >
                    <Input placeholder="クーポンコードを入力する" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isLoading.isRequesting}
                      size="large"
                      htmlType="submit"
                      className="tw-w-full"
                    >
                      使用する
                    </Button>
                  </Form.Item>
                </section>
              </section>
              <section className="tw-flex tw-flex-col tw-gap-4 tw-pt-4 tw-border-t tw-border-dividerLight">
                <ul>
                  {itemType === "plan" ? (
                    <>
                      <li className="tw-flex tw-justify-between">
                        <span className="tw-text-lg tw-text-secondary">
                          項目
                        </span>
                        <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                          金額（税込）
                        </span>
                      </li>
                      <li className="tw-flex tw-justify-between">
                        <span className="tw-text-lg tw-font-light">{`初月（日割り ${nullSafety(
                          getPuchaseBody[itemType].remaininng_days
                        )} 日分）`}</span>
                        <div className="tw-flex tw-justify-start tw-gap-2">
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                              !isNullOrUndefined(
                                getPuchaseBody[itemType]
                                  .discounted_price_for_first_month
                              ) &&
                              getPuchaseBody[itemType].first_month_price !==
                                getPuchaseBody[itemType]
                                  .discounted_price_for_first_month
                                ? "tw-line-through"
                                : ""
                            }`}
                          >
                            ￥
                            {thousandSeparator(
                              getPuchaseBody[itemType].first_month_price
                            )}
                          </span>
                          {!isNullOrUndefined(
                            getPuchaseBody[itemType]
                              .discounted_price_for_first_month
                          ) &&
                            getPuchaseBody[itemType].first_month_price !==
                              getPuchaseBody[itemType]
                                .discounted_price_for_first_month && (
                              <span
                                className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                              >
                                ￥
                                {thousandSeparator(
                                  getPuchaseBody[itemType]
                                    .discounted_price_for_first_month
                                )}
                              </span>
                            )}
                        </div>
                      </li>
                      <li className="tw-flex tw-justify-between">
                        <span className="tw-text-lg tw-font-light">入会金</span>
                        <div className="tw-flex tw-justify-start tw-gap-2">
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                              !isNullOrUndefined(
                                getPuchaseBody[itemType]
                                  .discounted_price_for_admission_fee
                              ) &&
                              getPuchaseBody[itemType].admission_fee !==
                                getPuchaseBody[itemType]
                                  .discounted_price_for_admission_fee
                                ? "tw-line-through"
                                : ""
                            }`}
                          >
                            ￥
                            {thousandSeparator(
                              getPuchaseBody[itemType].admission_fee
                            )}
                          </span>
                          {!isNullOrUndefined(
                            getPuchaseBody[itemType]
                              .discounted_price_for_admission_fee
                          ) &&
                            getPuchaseBody[itemType].admission_fee !==
                              getPuchaseBody[itemType]
                                .discounted_price_for_admission_fee && (
                              <span
                                className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                              >
                                ￥
                                {thousandSeparator(
                                  getPuchaseBody[itemType]
                                    .discounted_price_for_admission_fee
                                )}
                              </span>
                            )}
                        </div>
                      </li>
                      <li className="tw-flex tw-justify-between">
                        <span className="tw-text-lg tw-font-light">翌月</span>
                        <div className="tw-flex tw-justify-start tw-gap-2">
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                              !isNullOrUndefined(
                                getPuchaseBody[itemType]
                                  .discounted_price_for_monthly_item
                              ) &&
                              getPuchaseBody[itemType].monthly_price !==
                                getPuchaseBody[itemType]
                                  .discounted_price_for_monthly_item
                                ? "tw-line-through"
                                : ""
                            }`}
                          >
                            ￥
                            {thousandSeparator(
                              getPuchaseBody[itemType].monthly_price
                            )}
                          </span>
                          {!isNullOrUndefined(
                            getPuchaseBody[itemType]
                              .discounted_price_for_monthly_item
                          ) &&
                            getPuchaseBody[itemType].monthly_price !==
                              getPuchaseBody[itemType]
                                .discounted_price_for_monthly_item && (
                              <span
                                className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                              >
                                ￥
                                {thousandSeparator(
                                  getPuchaseBody[itemType]
                                    .discounted_price_for_monthly_item
                                )}
                              </span>
                            )}
                        </div>
                      </li>
                    </>
                  ) : null}
                  <li className="tw-flex tw-justify-between">
                    <span className="tw-text-lg">合計額</span>
                    <div className="tw-flex tw-justify-start tw-gap-2">
                      <span
                        className={`tw-text-lg ${
                          !isNullOrUndefined(getPuchaseBody.item?.default_price)
                            ? "tw-line-through"
                            : ""
                        }`}
                      >
                        ￥
                        {thousandSeparator(
                          getPuchaseBody[itemType].total_price ??
                            (!isNullOrUndefined(
                              getPuchaseBody.item?.default_price
                            )
                              ? getPuchaseBody.item?.default_price
                              : getPuchaseBody[itemType].prices[0].price)
                        )}
                      </span>
                      {!isNullOrUndefined(
                        getPuchaseBody.item?.default_price
                      ) && (
                        <span className="tw-text-lg tw-w-[70px] tw-text-right">
                          ￥
                          {thousandSeparator(
                            getPuchaseBody.item?.prices[0].price
                          )}
                        </span>
                      )}
                    </div>
                  </li>
                </ul>
                <Button
                  size="large"
                  type="primary"
                  className="tw-w-full"
                  onClick={() => onPlanConfirm()}
                >
                  次へ
                </Button>
              </section>
            </div>
          </Form>
        </section>
      </>
    ) : null;
  };

  const SelectCreditCard = () => {
    return (
      <>
        <ul className="tw-flex tw-flex-col tw-gap-4">
          {cards?.length
            ? cards?.map((card) => (
                <li
                  key={card.id}
                  className="tw-flex tw-justify-between tw-items-center tw-rounded-xl tw-bg-white tw-p-4 tw-shadow"
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                    <Image
                      src="/assets/profile/purchase/credit-card-black.svg"
                      alt="credit-card"
                      width={0}
                      height={0}
                      style={{ width: "auto", height: "auto" }}
                    />
                    <span className="tw-text-lg">{`**** **** **** ${nullSafety(
                      card.card_last4
                    )}`}</span>
                  </div>
                  <div className="tw-flex tw-justify-end tw-items-center tw-gap-2">
                    <span className="tw-text-sm tw-tracking-[0.12px] tw-text-secondary">
                      {nullSafety(card.brand)}
                    </span>
                    <Radio
                      checked={card.id === selectedCard?.id}
                      value={card.id}
                    />
                  </div>
                </li>
              ))
            : null}
          {cards?.length < 2 && (
            <li
              onClick={() => setStep("add")}
              className="tw-flex tw-justify-between tw-items-center tw-rounded-xl tw-bg-white tw-p-4 tw-shadow"
            >
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src="/assets/profile/purchase/credit-card-black.svg"
                  alt="credit-card"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-text-lg">カードを追加する</span>
              </div>
              <Image
                src="/assets/profile/purchase/add-card-plus-icon.svg"
                alt="credit-card"
                width={0}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            </li>
          )}
        </ul>
        <Button
          disabled={!selectedCard}
          loading={isLoading.isRequesting}
          size="large"
          type="primary"
          htmlType="submit"
          className="tw-w-full"
          onClick={() => onPurchase()}
        >
          支払う
        </Button>

        <Modal
          title="カード決済に失敗しました。"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
        >
          <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-6">
            <section className="tw-rounded-xl tw-border-2 tw-border-warning tw-p-4">
              <p className="tw-leading-[26px] tw-tracking-[0.14px]">
                カードの内容を確認の上再度お試しください。
              </p>
            </section>
            <section className="tw-flex tw-justify-center">
              <Button
                onClick={() => setIsModalOpen(false)}
                type="primary"
                size="large"
                className="tw-w-[80px]"
              >
                戻る
              </Button>
            </section>
          </div>
        </Modal>
      </>
    );
  };

  const RegisterCreditCard = () => {
    const onFinish = (params) => {
      params.cardNumber = +params.cardNumber;
      params.cvc = +params.cvc;

      const body = {
        cardName: params.cardName,
        cardNumber: params.cardNumber,
        cvc: params.cvc,
        expireYear: +dayjs()
          .set("year", `20${params.expireYear}`)
          .format("YYYY"),
        expireMonth: +dayjs(params.expireMonth, "MM").format("MM"),
      };

      addCard(body);
    };

    const generateYears = () => {
      const numbers = [];
      for (let i = 0; i < 100; i++) {
        numbers.push({
          label: i.toString().padStart(2, "0"),
          value: i.toString().padStart(2, "0"),
        });
      }
      return numbers;
    };

    const generateMonths = () => {
      const numbers = [];
      for (let i = 1; i <= 12; i++) {
        numbers.push({
          label: i.toString().padStart(2, "0"),
          value: i.toString().padStart(2, "0"),
        });
      }
      return numbers;
    };

    return (
      <>
        <Form
          requiredMark={false}
          form={form}
          name="AddCreditCard"
          onFinish={onFinish}
          validateTrigger="onSubmit"
        >
          <Form.Item
            name="cardNumber"
            label="カード番号"
            rules={[
              {
                required: true,
                message: "カード番号を入力してください。",
              },
              // () => ({
              //   validator(_, value) {
              //     console.log(value);
              //     if (value && value.replace(/\D/g, "").length !== 16) {
              //       return Promise.reject(
              //         "カード番号は16桁で入力してください。"
              //       );
              //     }
              //     return Promise.resolve();
              //   },
              // }),
            ]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              let formatted = value.replace(/\D/g, "");
              if (formatted.length > 16) {
                formatted = formatted.slice(0, 16);
              }
              return formatted;
            }}
          >
            <Input placeholder="4200 0000 0000 0000" />
          </Form.Item>

          <Form.Item
            name="cardName"
            label="カード名義"
            rules={[
              {
                required: true,
                message: "カード名義人氏名を入力してください。",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <section className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
            <label className="tw-col-span-full">有効期限</label>
            <Form.Item
              name="expireYear"
              rules={[
                {
                  required: true,
                  message: "年を選択してください。",
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="月"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={generateYears()}
              />
            </Form.Item>
            <Form.Item
              name="expireMonth"
              rules={[
                {
                  required: true,
                  message: "月を選択してください。",
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="年"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={generateMonths()}
              />
            </Form.Item>
          </section>

          <section className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
            <Form.Item
              name="cvc"
              label="セキュリティコード"
              rules={[
                {
                  required: true,
                  message: "カードのセキュリティコードを入力してください。",
                },
              ]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                let formatted = value.replace(/\D/g, "");
                if (formatted.length > 4) {
                  formatted = formatted.slice(0, 4);
                }
                return formatted;
              }}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="999" />
            </Form.Item>
            <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px]">
              支払いカードの裏面にある 3 桁の番号
            </p>
          </section>

          <section className="tw-flex tw-justify-end tw-gap-2">
            <Button
              size="large"
              className="tw-w-[80px]"
              onClick={() => router.back()}
            >
              戻る
            </Button>
            <Form.Item>
              <Button
                loading={isLoading}
                size="large"
                type="primary"
                htmlType="submit"
                className="tw-w-[80px]"
              >
                保存
              </Button>
            </Form.Item>
          </section>
        </Form>

        <section className="tw-bg-white tw-rounded-xl tw-border tw-border-info tw-p-4">
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            ※
            月会費プランのご購入の場合は主要カードから毎月の20日に決済が発生します。
          </p>
        </section>
      </>
    );
  };

  const PurchaseSuccess = () => {
    return (
      <section className="tw-flex tw-flex-col tw-items-center tw-gap-6">
        <section className="tw-mt-[100px]">
          <SuccessAnimation />
        </section>
        <section className="tw-bg-grayLight tw-p-4 tw-h-[80px] tw-rounded-[12px] tw-border tw-border-info tw-w-full tw-grid tw-place-items-center">
          <span className="tw-tracking-[0.14px] tw-leading-[26px]">
            支払いが完了しました。
          </span>
        </section>
        <section className="tw-w-full">
          <Button
            onClick={() => onContinueReservation()}
            size="large"
            type="primary"
            className="tw-w-full"
          >
            予約を続ける
          </Button>
        </section>
      </section>
    );
  };

  const motionVariants = {
    initial: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full">
        {step !== 3 && (
          <section>
            <span className="tw-text-xxl tw-font-medium">{pageHeader()}</span>
          </section>
        )}
        {!isLoading.isFetching ? (
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key={1}
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                className="tw-flex tw-flex-col tw-justify-between tw-h-full"
              >
                <SelectedPlan />
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key={2}
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="initial"
                className="tw-flex tw-flex-col tw-justify-between tw-h-full"
              >
                <SelectCreditCard />
              </motion.div>
            ) : step === 3 ? (
              <motion.div
                key={3}
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="initial"
              >
                <PurchaseSuccess />
              </motion.div>
            ) : step === "add" ? (
              <motion.div
                key={4}
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="initial"
              >
                <RegisterCreditCard />
              </motion.div>
            ) : null}
          </AnimatePresence>
        ) : (
          <FullScreenLoading />
        )}
      </div>
    </>
  );
};

export default SubscriptionDetail;
