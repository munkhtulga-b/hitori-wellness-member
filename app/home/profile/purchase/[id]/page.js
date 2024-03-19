"use client";

import { useState } from "react";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { Form, Button, Input, Radio, Checkbox, Modal } from "antd";
import Image from "next/image";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";
import { motion, AnimatePresence } from "framer-motion";

const subscription = {
  id: 1,
  name: "月会費プラン",
  description:
    "しっかり週2（月8回まで）「フィットネスエリア・ロッカールーム、シャワー、お風呂、サウナ」の施設がご利用いただけます。",
  price: 8000,
};

const SubscriptionDetail = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubscription = ({ coupon }) => {
    console.log(coupon);
    setStep(2);
  };

  const pageHeader = () => {
    let result = "見積書";
    if (step === 2 || step === 3) {
      result = "支払い";
    }
    if (step === "add") {
      result = "カードの追加";
    }
    return result;
  };

  const SelectedSubscription = () => {
    return (
      <>
        <motion.section
          variants={motionVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          key="subscription-select"
          className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow"
        >
          <div className="tw-flex tw-flex-col tw-gap-2">
            <span className="tw-text-lg">{nullSafety(subscription.name)}</span>
            <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
              {nullSafety(subscription.description)}
            </p>
            <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
              subscription.price
            )}（税込）／月～`}</span>
          </div>
        </motion.section>
        <section className="tw-grow">
          <Form
            form={form}
            name="PurchaseSubscription"
            onFinish={handleSubscription}
            style={{ height: "100%" }}
          >
            <div className="tw-flex tw-flex-col tw-justify-between tw-h-full">
              <section>
                <Form.Item
                  name="coupon"
                  label="クーポンを選択してください"
                  rules={[
                    {
                      required: false,
                      message: "電話番号をご記入ください。",
                      whitespace: false,
                    },
                  ]}
                >
                  <Input placeholder="クーポンコードを入力する" />
                </Form.Item>
              </section>
              <section className="tw-flex tw-flex-col tw-gap-4 tw-pt-4 tw-border-t tw-border-dividerLight">
                <div className="tw-flex tw-justify-between">
                  <span className="tw-text-lg">合計額</span>
                  <span className="tw-text-lg">8,000円 （税込）／月～</span>
                </div>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="tw-w-full"
                  >
                    次へ
                  </Button>
                </Form.Item>
              </section>
            </div>
          </Form>
        </section>
      </>
    );
  };

  const SelectCreditCard = () => {
    return (
      <>
        <motion.section
          variants={motionVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          key="card-select"
          className="tw-flex tw-flex-col tw-justify-between tw-h-full"
        >
          <ul className="tw-flex tw-flex-col tw-gap-4">
            <li className="tw-flex tw-justify-between tw-items-center tw-rounded-xl tw-bg-white tw-p-4 tw-shadow">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <Image
                  src="/assets/profile/purchase/credit-card-black.svg"
                  alt="credit-card"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="tw-text-lg">xxxx xxxx xxxx 8998</span>
              </div>
              <div className="tw-flex tw-justify-end tw-items-center tw-gap-2">
                <span className="tw-text-sm tw-tracking-[0.12px] tw-text-secondary">
                  VISA
                </span>
                <Radio />
              </div>
            </li>
            <li className="tw-flex tw-justify-between tw-items-center tw-rounded-xl tw-bg-white tw-p-4 tw-shadow">
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
          </ul>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            支払う
          </Button>
        </motion.section>

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
    return (
      <>
        <Form
          requiredMark={false}
          form={form}
          name="AddCreditCard"
          onFinish={(params) => console.log(params)}
        >
          <Form.Item
            name="cardNumber"
            label="カード番号"
            rules={[
              {
                required: true,
                message: "姓（氏名）を入力してください。",
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
            name="cardHolder"
            label="クレジットカード名義人氏名"
            rules={[
              {
                required: true,
                message: "名（氏名）を入力してください。",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <section className="tw-grid tw-grid-cols-2 tw-auto-rows-auto tw-gap-2">
            <Form.Item
              name="validUntil"
              label="有効期限"
              rules={[
                {
                  required: true,
                  message: "姓（氏名）を入力してください。",
                },
              ]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                let formatted = value.replace(/\D/g, "");
                if (formatted.length > 4) {
                  formatted = formatted.slice(0, 4);
                }
                if (formatted.length > 2) {
                  formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
                }
                return formatted;
              }}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item
              name="cardCVV"
              label="CVVコード"
              rules={[
                {
                  required: true,
                  message: "姓（氏名）を入力してください。",
                },
              ]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                let formatted = value.replace(/\D/g, "");
                if (formatted.length > 3) {
                  formatted = formatted.slice(0, 3);
                }
                return formatted;
              }}
            >
              <Input placeholder="999" />
            </Form.Item>
          </section>

          <Form.Item name="isCardSaved" valuePropName="checked">
            <Checkbox>カードを保存する</Checkbox>
          </Form.Item>

          <Form.Item>
            <div className="tw-flex tw-justify-end tw-gap-2">
              <Button size="large" className="tw-w-[80px]">
                戻る
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="tw-w-[80px]"
              >
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>

        <section className="tw-bg-white tw-rounded-xl tw-border tw-border-info tw-p-4">
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            ※
            月会費プランのご購入の場合は主要カードから毎月のｘ日に決済が発生します。
          </p>
        </section>
      </>
    );
  };

  const PurchaseSuccess = () => {
    return (
      <motion.section
        key="purchase-success"
        variants={motionVariants}
        initial="initial"
        animate="animate"
        exit="initial"
        className="tw-flex tw-flex-col tw-items-center tw-gap-6"
      >
        <section className="tw-mt-[100px]">
          <SuccessAnimation />
        </section>
        <section className="tw-bg-grayLight tw-p-4 tw-h-[80px] tw-rounded-[12px] tw-border tw-border-info tw-w-full tw-grid tw-place-items-center">
          <span className="tw-tracking-[0.14px] tw-leading-[26px]">
            支払いが完了しました。
          </span>
        </section>
        <section className="tw-w-full">
          <Button size="large" type="primary" className="tw-w-full">
            予約履歴を見る
          </Button>
        </section>
      </motion.section>
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
        <section>
          <span className="tw-text-xxl tw-font-medium">{pageHeader()}</span>
        </section>
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <SelectedSubscription />
          ) : step === 2 ? (
            <SelectCreditCard />
          ) : step === 3 ? (
            <PurchaseSuccess />
          ) : step === "add" ? (
            <RegisterCreditCard />
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SubscriptionDetail;
