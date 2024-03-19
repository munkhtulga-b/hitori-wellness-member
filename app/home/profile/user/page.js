"use client";

import dayjs from "dayjs";
import { Button, Form, Input, DatePicker, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAddressFromPostalCode } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";

const EditUserInfo = () => {
  const [form] = Form.useForm();
  const zipCode2 = Form.useWatch("zipCode2", form);
  const zipCode1 = Form.useWatch("zipCode1", form);
  const [isFetching, setIsFetching] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    console.log("edit");
  }, []);

  useEffect(() => {
    const fullPostalCode = `${zipCode1}${zipCode2}`;
    const fetchAddress = async () => {
      setIsFetching(true);
      const result = await getAddressFromPostalCode(fullPostalCode);
      if (result.length) {
        setAddress(result[0]);
      } else {
        setAddress(null);
      }
      setIsFetching(false);
    };
    if (!isNaN(+fullPostalCode) && fullPostalCode.toString().length === 7) {
      fetchAddress();
    }
  }, [zipCode2, zipCode1]);

  useEffect(() => {
    if (address) {
      form.setFieldsValue({
        address1: address?.city,
        address2: address?.town,
        prefecture: address?.pref,
      });
    } else {
      form.setFieldsValue({
        address1: "",
        address2: "",
        address3: "",
        prefecture: "",
      });
    }
  }, [address]);

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">ユーザー情報</span>
        </section>

        <Form
          requiredMark={customizeRequiredMark}
          form={form}
          name="UserInfo"
          onFinish={(params) => console.log(params)}
        >
          <Form.Item>
            <section className="tw-p-3 tw-rounded-lg tw-bg-bgForm tw-border tw-border-form">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <span className="tw-grow tw-leading-[26px] tw-tracking-[0.14px]">
                  Email
                </span>
                <Button className="tw-w-[127px]" size="small">
                  Change
                </Button>
              </div>
            </section>
          </Form.Item>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
              氏名
            </label>
            <div className="tw-grid tw-grid-cols-2 tw-auto-rows-min tw-gap-2">
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "姓（氏名）を入力してください。",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="姓" />
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "名（氏名）を入力してください。",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="名" />
              </Form.Item>
            </div>
          </section>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
              氏名（カナ）
            </label>
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
              <Form.Item
                name="lastKana"
                rules={[
                  {
                    required: true,
                    message: "姓（フリガナ）を入力してください。",
                    pattern: /^[\u30A1-\u30F6\s]+$/, // Katakana characters and spaces
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="姓" />
              </Form.Item>
              <Form.Item
                name="firstKana"
                rules={[
                  {
                    required: true,
                    message: "名（フリガナ）を入力してください。",
                    pattern: /^[\u30A1-\u30F6\s]+$/, // Katakana characters and spaces
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="名" />
              </Form.Item>
            </div>
          </section>

          <Form.Item
            name="birthday"
            label="生年月日"
            rules={[
              {
                type: "object",
                required: true,
                message: "誕生日をご選択ください。",
              },
            ]}
          >
            <DatePicker
              className="tw-w-full"
              placeholder="yyyy/mm/dd"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              format={"YYYY/MM/DD"}
            />
          </Form.Item>

          <Form.Item
            name="tel"
            label="電話番号"
            rules={[
              {
                required: true,
                message: "電話番号をご記入ください。",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="電話番号" type="number" />
          </Form.Item>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label>郵便番号</label>
            <div className="tw-grid tw-grid-cols-2 tw-auto-rows-min tw-gap-2">
              <Form.Item
                name="zipCode1"
                rules={[
                  {
                    required: false,
                    // message: "Please input your post code!",
                    whitespace: false,
                  },
                ]}
              >
                <Input placeholder="226" type="number" maxLength={3} />
              </Form.Item>
              <Form.Item
                name="zipCode2"
                rules={[
                  {
                    required: false,
                    // message: "Please input your post code!",
                    whitespace: false,
                  },
                ]}
              >
                <Input
                  placeholder="0027"
                  type="number"
                  maxLength={4}
                  suffix={
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{
                            fontSize: 14,
                            display: isFetching ? "block" : "none",
                          }}
                          spin
                        />
                      }
                    />
                  }
                />
              </Form.Item>
            </div>
          </section>

          <Form.Item
            name="prefecture"
            rules={[
              {
                required: false,
                message: "Please input your prefecture!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="市区町村" />
          </Form.Item>

          <Form.Item
            name="address1"
            rules={[
              {
                required: false,
                message: "Please input your city!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="都道府県" />
          </Form.Item>

          <Form.Item
            name="address2"
            rules={[
              {
                required: false,
                message: "Please input your town!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="町名・番地" />
          </Form.Item>

          <Form.Item
            name="address3"
            rules={[
              {
                required: false,
                message: "Please input your town!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="番号" />
          </Form.Item>

          <Form.Item
            label="緊急連絡先"
            rules={[
              {
                required: false,
                message: "Emergency contact required!",
                whitespace: false,
              },
            ]}
          >
            <Input placeholder="電話番号" type="number" />
          </Form.Item>

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
        </Form>
      </div>
    </>
  );
};

export default EditUserInfo;
