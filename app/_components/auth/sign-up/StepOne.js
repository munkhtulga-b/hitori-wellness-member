import dayjs from "dayjs";
import { Button, Form, Input, Select } from "antd";
import { useSignupStore } from "@/app/_store/user-signup";
import { useEffect, useState } from "react";
import { getYears, getMonths, getDays } from "@/app/_utils/helpers";
import _ from "lodash";

const SignupStepOne = ({ onComplete }) => {
  const [form] = Form.useForm();
  const signupStore = useSignupStore((state) => state.getBody());
  const [genderValue, setGenderValue] = useState(null);
  const birthYear = Form.useWatch("birthYear", form);
  const birthMonth = Form.useWatch("birthMonth", form);

  useEffect(() => {
    assignFieldsValue();
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

  const assignFieldsValue = () => {
    const formFields = [
      "mailAddress",
      "lastName",
      "firstName",
      "lastKana",
      "firstKana",
      "birthday",
      "gender",
    ];
    for (const [key, value] of Object.entries(signupStore)) {
      if (formFields.includes(key)) {
        if (key === "gender") {
          setGenderValue(value);
        } else if (key === "birthday") {
          const birthYear = dayjs(value).format("YYYY");
          const birthMonth = dayjs(value).format("MM");
          const birthDay = dayjs(value).format("DD");
          form.setFieldValue("birthYear", birthYear);
          form.setFieldValue("birthMonth", birthMonth);
          form.setFieldValue("birthDay", birthDay);
        } else {
          form.setFieldValue(key, value);
        }
      }
    }
  };

  const onFinish = (params) => {
    const birthday = dayjs(
      `${params.birthYear}-${params.birthMonth}-${params.birthDay}`
    ).format("YYYY-MM-DD");
    delete params.birthYear;
    delete params.birthMonth;
    delete params.birthDay;
    params["birthday"] = birthday;
    params.mailAddress = params.mailAddress.toLowerCase();
    onComplete(params);
  };

  const handleGenderSelect = (value) => {
    setGenderValue(value);
    form.setFieldValue("gender", value);
    form.validateFields(["gender"]);
  };

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  return (
    <Form
      requiredMark={customizeRequiredMark}
      form={form}
      name="signupStepOne"
      onFinish={onFinish}
    >
      <Form.Item
        name="mailAddress"
        label="メールアドレス"
        rules={[
          {
            type: "email",
            message: "正しいメールアドレスを入力してください。",
          },
          {
            required: true,
            message: "メールアドレスを入力してください。",
          },
        ]}
      >
        <Input placeholder="メールアドレス" />
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
              style={{
                width: "100%",
              }}
              size="large"
              options={getYears()}
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

      <section className="tw-flex tw-flex-col tw-gap-2">
        <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
          性別
        </label>
        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "性別をご選択ください。",
            },
          ]}
          validateFirst
        >
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-4">
            <Button
              style={{
                borderColor: genderValue === 1 ? "#B7DDFF" : "",
                color: genderValue === 1 ? "#1890FF" : "",
              }}
              onClick={() => handleGenderSelect(1)}
            >
              男性
            </Button>
            <Button
              style={{
                borderColor: genderValue === 2 ? "#B7DDFF" : "",
                color: genderValue === 2 ? "#1890FF" : "",
              }}
              onClick={() => handleGenderSelect(2)}
            >
              女性
            </Button>
          </div>
        </Form.Item>
      </section>

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
  );
};

export default SignupStepOne;
