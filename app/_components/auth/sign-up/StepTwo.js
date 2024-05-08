import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAddressFromPostalCode } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";
import { useSignupStore } from "@/app/_store/user-signup";

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
      result = value.toString().replace("-", "");
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
            required: true,
            message: "電話番号を入力してください。",
            whitespace: false,
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
                message: "郵便番号１を入力してください。",
                whitespace: false,
              },
            ]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              const numberString = value.replace(/^\D*(\d{3})\D*$/, "$1");
              return numberString;
            }}
          >
            <Input placeholder="000" maxLength={3} />
          </Form.Item>
          <Form.Item
            name="zipCode2"
            rules={[
              {
                required: true,
                message: "郵便番号２を入力してください。",
                whitespace: false,
              },
            ]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              const numberString = value.replace(/^\D*(\d{4})\D*$/, "$1");
              return numberString;
            }}
          >
            <Input
              placeholder="0000"
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
            required: true,
            message: "緊急連絡先電話番号を入力してください。",
            whitespace: false,
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
