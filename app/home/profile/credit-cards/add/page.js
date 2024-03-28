"use client";

import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import $api from "@/app/_api";
import { useRouter } from "next/navigation";

const AddCreditCard = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (params) => {
    params.cardNumber = +params.cardNumber;
    params.cvc = +params.cvc;

    const body = {
      cardName: params.cardName,
      cardNumber: params.cardNumber,
      cvc: params.cvc,
      expireYear: +dayjs()
        .set("year", `20${params.expiry.split("/")[1]}`)
        .format("YYYY"),
      expireMonth: +dayjs(params.expiry.split("/")[0]).format("MM"),
    };

    addCard(body);
  };

  const addCard = async (body) => {
    setIsLoading(true);
    const { isOk } = await $api.member.card.create(body);
    if (isOk) {
      messageApi.success("カードが追加されました。");
      router.push("/home/profile/credit-cards");
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">カードの追加</span>
        </section>
        <section>
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
              label="クレジットカード名義人氏名"
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
              <Form.Item
                name="expiry"
                label="有効期限"
                rules={[
                  {
                    required: true,
                    message: "カードの有効期限を入力してください。",
                  },
                ]}
                getValueFromEvent={(e) => {
                  const value = e.target.value;
                  let formatted = value.replace(/\D/g, "");
                  if (formatted.length > 4) {
                    formatted = formatted.slice(0, 4);
                  }
                  if (formatted.length > 2) {
                    formatted =
                      formatted.slice(0, 2) + "/" + formatted.slice(2);
                  }
                  return formatted;
                }}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
              <Form.Item
                name="cvc"
                label="CVVコード"
                rules={[
                  {
                    required: true,
                    message: "カードのCVVコードを入力してください。",
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

            <section className="tw-flex tw-justify-end tw-gap-2">
              <Button size="large" className="tw-w-[80px]">
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
        </section>

        <section className="tw-bg-white tw-rounded-xl tw-border tw-border-info tw-p-4">
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            ※
            月会費プランのご購入の場合は主要カードから毎月のｘ日に決済が発生します。
          </p>
        </section>
      </div>
    </>
  );
};

export default AddCreditCard;
