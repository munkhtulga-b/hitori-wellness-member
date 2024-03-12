"use client";

import { Button, Form, Input } from "antd";
import dayjs from "dayjs";

const AddCreditCard = () => {
  const [form] = Form.useForm();

  const onFinish = (params) => {
    params.cardNumber = +params.cardNumber;
    params.cardCVV = +params.cardCVV;
    params.validUntil = dayjs(
      `${params.validUntil.split("/")[1]}-${
        params.validUntil.split("/")[0]
      }-01`,
      "YYYY-MM-DD"
    );
    console.log(params);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">カードの追加</span>
        </section>
        <section>
          <Form
            requiredMark={false}
            form={form}
            name="signupStepOne"
            onFinish={onFinish}
          >
            <Form.Item
              name="cardNumber"
              label="カード番号"
              rules={[
                {
                  required: true,
                  message: "姓（氏名）を入力してください。",
                },
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
                    formatted =
                      formatted.slice(0, 2) + "/" + formatted.slice(2);
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

            <section className="tw-flex tw-justify-end tw-gap-2">
              <Button size="large" className="tw-w-[80px]">
                戻る
              </Button>
              <Form.Item>
                <Button
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
