import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSignupStore } from "@/app/_store/user-signup";
import $api from "@/app/_api";

const SignupStepTwo = ({ onComplete }) => {
  const [form] = Form.useForm();
  const signupStore = useSignupStore((state) => state.getBody());
  const zipCode2 = Form.useWatch("zipCode2", form);
  const zipCode1 = Form.useWatch("zipCode1", form);
  const [isFetching, setIsFetching] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    assignFieldsValue();
  }, []);

  useEffect(() => {
    const fullPostalCode = `${zipCode1}${zipCode2}`;
    const fetchAddress = async () => {
      setIsFetching(true);
      const { isOk, data } = await $api.member.post.getOne(fullPostalCode);
      if (isOk) {
        setAddress(data);
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
        address3: signupStore?.address3,
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

  const assignFieldsValue = () => {
    const formFields = [
      "tel",
      "zipCode1",
      "zipCode2",
      "address1",
      "address2",
      "address3",
      "prefecture",
      "emergencyTel",
    ];
    for (const [key, value] of Object.entries(signupStore)) {
      if (formFields.includes(key)) {
        form.setFieldValue(key, value);
      }
    }
  };

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  const beforeComplete = (params) => {
    params.tel = formatPhoneNumber(params.tel);
    params.emergencyTel = formatPhoneNumber(params.emergencyTel);
    onComplete(params);
  };

  const formatPhoneNumber = (value) => {
    let result = "";
    if (value) {
      result = value.toString().replace(/-/g, "");
    }
    return result;
  };

  return (
    <Form
      requiredMark={customizeRequiredMark}
      form={form}
      name="SignupStepTwo"
      onFinish={beforeComplete}
    >
      <Form.Item
        name="tel"
        label="電話番号"
        rules={[
          {
            validator: (_, value) => {
              // Allow only digits and hyphens, with at most one hyphen between digits
              const pattern = /^(?!.*--)(?!-)(?!.*-$)(\d+-?)*\d+$/;

              // Count the number of hyphens to adjust the length check
              const hyphenCount = value?.split("-")?.length - 1 || 0;
              const minLength = 10 + hyphenCount;
              const maxLength = 11 + hyphenCount;

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
                  new Error("電話番号を入力してください。")
                );
              }

              return Promise.resolve();
            },
          },
        ]}
        getValueFromEvent={(e) => {
          const value = e.target.value;
          // Remove any character that is not a digit or hyphen
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

      <section className="tw-flex tw-flex-col tw-gap-2">
        <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
          住所
        </label>
        <div>
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
        </div>
      </section>

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

export default SignupStepTwo;
