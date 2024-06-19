"use client";

import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import $api from "@/app/_api";
import { useRouter } from "next/navigation";
import CreditCardExpirySelector from "@/app/_components/custom/CreditCardExpirySelector";

const AddCreditCard = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (params) => {
    params.cardNumber = +params.cardNumber;

    const body = {
      cardName: params.cardName,
      cardNumber: params.cardNumber,
      cvc: params.cvc,
      expireYear: params?.expiry?.year,
      expireMonth: params?.expiry?.month,
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
              label="カード名義"
              rules={[
                {
                  required: true,
                  message: "カード名義人氏名を入力してください。",
                  whitespace: true,
                },
              ]}
              getValueFromEvent={(e) => {
                const value = e.target.value;
                const alphabetString = value
                  .replace(/[^a-zA-Z\s]/g, "")
                  .replace(/\s\s+/g, " ");
                return alphabetString;
              }}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="expiry"
              label="有効期限"
              rules={[
                {
                  required: true,
                  message: "有効期限を入力してください。",
                },
              ]}
            >
              <CreditCardExpirySelector
                onChange={(value) => form.setFieldValue("expiry", value)}
              />
            </Form.Item>

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
        </section>

        <section className="tw-bg-white tw-rounded-xl tw-border tw-border-info tw-p-4">
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            ※
            月会費プランのご購入の場合は主要カードから毎月の20日に決済が発生します。
          </p>
        </section>
      </div>
    </>
  );
};

export default AddCreditCard;
