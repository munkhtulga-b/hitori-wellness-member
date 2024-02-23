import { Button, Form, Input } from "antd";
import { getAddressFromPostalCode } from "@/app/_utils/helpers";
import { useEffect, useState } from "react";

const SignupStepTwo = ({ onComplete }) => {
  const [form] = Form.useForm();
  const zipCode2 = Form.useWatch("zipCode2", form);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const zipCode1 = form.getFieldValue("zipCode1");
    const fullPostalCode = `${zipCode1}${zipCode2}`;
    const fetchAddress = async () => {
      const result = await getAddressFromPostalCode(fullPostalCode);
      if (result.length) {
        setAddress(result[0]);
      }
    };
    if (fullPostalCode.toString().length === 7) {
      fetchAddress();
    }
  }, [zipCode2]);

  useEffect(() => {
    if (address) {
      form.setFieldValue("address1", address?.city);
      form.setFieldValue("address2", address?.pref);
      form.setFieldValue("address3", address?.town);
    }
  }, [address]);

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
            <Input placeholder="0027" type="number" maxLength={4} />
          </Form.Item>
        </div>
      </section>

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
