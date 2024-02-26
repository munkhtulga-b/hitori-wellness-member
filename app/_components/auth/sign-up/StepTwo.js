import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAddressFromPostalCode } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";
import { useSignupStore } from "@/app/_store/user-signup";

const SignupStepTwo = ({ onComplete }) => {
  const [form] = Form.useForm();
  const signupStore = useSignupStore((state) => state.getBody);
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
    if (fullPostalCode.toString().length === 7) {
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
    ];
    for (const [key, value] of Object.entries(signupStore())) {
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

  return (
    <Form
      requiredMark={customizeRequiredMark}
      form={form}
      name="SignupStepTwo"
      onFinish={onComplete}
    >
      <Form.Item
        name="tel"
        label="電話番号"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
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
                required: true,
                message: "Please input your post code!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="226" type="number" maxLength={3} />
          </Form.Item>
          <Form.Item
            name="zipCode2"
            rules={[
              {
                required: true,
                message: "Please input your post code!",
                whitespace: true,
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
        <Button type="primary" htmlType="submit" className="tw-w-full">
          次へ
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupStepTwo;
