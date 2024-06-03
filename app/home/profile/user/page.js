"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Select, Checkbox, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { nullSafety, getYears, getMonths, getDays } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/_store/user";
import $api from "@/app/_api";
import _ from "lodash";

const EditUserInfo = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const getUser = useUserStore((state) => state.getUser());
  const birthYear = Form.useWatch("birthYear", form);
  const birthMonth = Form.useWatch("birthMonth", form);
  const [isFetching, setIsFetching] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [user, setUser] = useState(null);

  const minAge = 15;
  const maxAge = 100;

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      birthMonth: null,
      birthDay: null,
    });
  }, [birthYear]);

  useEffect(() => {
    form.setFieldValue("birthDay", null);
  }, [birthMonth]);

  useEffect(() => {
    const fields = [
      { camel: "status", snake: "status" },
      { camel: "firstName", snake: "first_name" },
      { camel: "lastName", snake: "last_name" },
      { camel: "firstKana", snake: "first_kana" },
      { camel: "lastKana", snake: "last_kana" },
      { camel: "gender", snake: "gender" },
      { camel: "birthday", snake: "birthday" },
      { camel: "zipCode1", snake: "zip_code1" },
      { camel: "zipCode2", snake: "zip_code2" },
      { camel: "prefecture", snake: "prefecture" },
      { camel: "address1", snake: "address1" },
      { camel: "address2", snake: "address2" },
      { camel: "address3", snake: "address3" },
      { camel: "tel", snake: "tel" },
      { camel: "emergencyTel", snake: "emergency_tel" },
      { camel: "isAcceptMail", snake: "is_accept_mail" },
    ];
    if (user) {
      for (const { camel, snake } of fields) {
        if (snake === "birthday") {
          form.setFieldValue("birthYear", dayjs(user[snake]).format("YYYY"));
          setTimeout(() => {
            form.setFieldValue("birthMonth", dayjs(user[snake]).format("MM"));
          }, 200);
          setTimeout(() => {
            form.setFieldValue("birthDay", dayjs(user[snake]).format("DD"));
          }, 400);
        } else {
          form.setFieldsValue({
            [camel]: user[snake],
          });
        }
      }
    }
  }, [user]);

  const fetchUserDetails = async () => {
    if (!getUser) return;
    setIsFetching(true);
    const { isOk, data } = await $api.member.user.getOne(getUser.id);
    if (isOk) {
      setUser(data);
    }
    setIsFetching(false);
  };

  const updateUserDetails = async (body) => {
    setIsRequesting(true);
    const { isOk } = await $api.member.user.update(getUser.id, body);
    if (isOk) {
      messageApi.success("更新されました。");
    }
    setIsRequesting(false);
  };

  const beforeComplete = (params) => {
    params.tel = params.tel?.replace(/-/g, "");
    params.emergencyTel = params.emergencyTel?.replace(/-/g, "");
    const birthday = `${params.birthYear}-${params.birthMonth}-${params.birthDay}`;
    delete params.birthYear;
    delete params.birthMonth;
    delete params.birthDay;
    const body = { ...params, birthday };
    updateUserDetails(body);
  };

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  return (
    <>
      {contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">ユーザー情報</span>
        </section>

        <Form
          requiredMark={customizeRequiredMark}
          form={form}
          name="UserInfo"
          onFinish={(params) => beforeComplete(params)}
        >
          <Form.Item>
            <section className="tw-p-3 tw-rounded-lg tw-bg-bgForm tw-border tw-border-form">
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                <span className="tw-grow tw-leading-[26px] tw-tracking-[0.14px]">
                  {nullSafety(user?.mail_address)}
                </span>
                <Button
                  className="tw-w-[127px]"
                  size="small"
                  onClick={() => router.push("/home/profile/user/change-email")}
                >
                  変更
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
                    message: "姓（カナ）を入力してください。",
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
                    message: "名（カナ）を入力してください。",
                    pattern: /^[\u30A1-\u30F6\s]+$/, // Katakana characters and spaces
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
              生年月日
            </label>
            <div className="tw-grid tw-grid-cols-3 tw-gap-2">
              <Form.Item
                name="birthYear"
                rules={[
                  {
                    required: true,
                    message: "ご選択ください。",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label?.toString() ?? "")
                      .toLowerCase()
                      .includes(input.toString().toLowerCase())
                  }
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  options={getYears(minAge, maxAge)}
                  placeholder="1990"
                />
              </Form.Item>
              <Form.Item
                name="birthMonth"
                rules={[
                  {
                    required: true,
                    message: "ご選択ください。",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label?.toString() ?? "")
                      .toLowerCase()
                      .includes(input.toString().toLowerCase())
                  }
                  disabled={!birthYear}
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  options={getMonths()}
                  placeholder="01"
                />
              </Form.Item>
              <Form.Item
                name="birthDay"
                rules={[
                  {
                    required: true,
                    message: "ご選択ください。",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label?.toString() ?? "")
                      .toLowerCase()
                      .includes(input.toString().toLowerCase())
                  }
                  disabled={!birthYear || !birthMonth}
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  options={_.map(getDays(birthYear, birthMonth), (day) => ({
                    value: day,
                    label: day,
                  }))}
                  placeholder="01"
                />
              </Form.Item>
            </div>
          </section>

          <Form.Item
            name="tel"
            label="電話番号"
            rules={[
              {
                validator: (_, value) => {
                  const pattern = /^(?!-)(?!.*-$)[0-9-]+$/;
                  const minLength = 10 + (value?.split("-")?.length - 1 || 0);
                  const maxLength = 11 + (value?.split("-")?.length - 1 || 0);

                  if (!value) {
                    return Promise.reject(
                      new Error("電話番号を入力してください。")
                    );
                  }

                  if (!pattern.test(value)) {
                    return Promise.reject(
                      new Error("電話番号を入力してください。")
                    );
                  }

                  if (value.length < minLength || value.length > maxLength) {
                    return Promise.reject(
                      new Error(`電話番号を入力してください。`)
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              return value.replace(/[^0-9-]/g, "");
            }}
          >
            <Input placeholder="電話番号" />
          </Form.Item>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
              郵便番号
            </label>
            <div className="tw-grid tw-grid-cols-2 tw-auto-rows-min tw-gap-2">
              <Form.Item
                name="zipCode1"
                rules={[
                  {
                    required: true,
                    message: "を入力してください。",
                    whitespace: false,
                  },
                ]}
                getValueFromEvent={(e) => {
                  const value = e.target.value;
                  const numberString = value.replace(/\D/g, "").slice(0, 3);
                  return numberString;
                }}
              >
                <Input placeholder="000" />
              </Form.Item>
              <Form.Item
                name="zipCode2"
                rules={[
                  {
                    required: true,
                    message: "を入力してください。",
                    whitespace: false,
                  },
                ]}
                getValueFromEvent={(e) => {
                  const value = e.target.value;
                  const numberString = value.replace(/\D/g, "").slice(0, 4);
                  return numberString;
                }}
              >
                <Input
                  placeholder="0000"
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
                required: true,
                message: "都道府県を入力してください。",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="都道府県" />
          </Form.Item>

          <Form.Item
            name="address1"
            rules={[
              {
                required: true,
                message: "市区町村を入力してください。",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="市区町村" />
          </Form.Item>

          <Form.Item
            name="address2"
            rules={[
              {
                required: true,
                message: "町名・番地を入力してください。",
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
                message: "ビル・マンション名を入力してください。",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="番号" />
          </Form.Item>

          <Form.Item
            name="emergencyTel"
            label="緊急連絡先"
            rules={[
              {
                validator: (_, value) => {
                  const pattern = /^(?!-)(?!.*-$)[0-9-]+$/;
                  const minLength = 10 + (value?.split("-")?.length - 1 || 0);
                  const maxLength = 11 + (value?.split("-")?.length - 1 || 0);

                  if (!value) {
                    return Promise.reject(
                      new Error("電話番号を入力してください。")
                    );
                  }

                  if (!pattern.test(value)) {
                    return Promise.reject(
                      new Error("電話番号を入力してください。")
                    );
                  }

                  if (value.length < minLength || value.length > maxLength) {
                    return Promise.reject(
                      new Error(`電話番号を入力してください。`)
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              return value.replace(/[^0-9-]/g, "");
            }}
          >
            <Input placeholder="電話番号" />
          </Form.Item>

          <Form.Item
            name="isAcceptMail"
            valuePropName="checked"
            style={{ marginBottom: 16 }}
          >
            <Checkbox className="tw-text-xl">
              <span className="tw-text-lg">
                キャンペーン・お知らせ等の情報をメールで受け取る
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <section className="tw-flex tw-justify-end tw-gap-2">
              <Button size="large" onClick={() => router.back()}>
                戻る
              </Button>
              <Button
                loading={isRequesting}
                size="large"
                type="primary"
                htmlType="submit"
              >
                保存
              </Button>
            </section>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditUserInfo;
