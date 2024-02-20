import { Button, Form, Input } from "antd";

const SignupStepTwo = ({ onComplete }) => {
  const [form] = Form.useForm();

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
            message: "Please input your nickname!",
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
            name="zipCode"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="226" type="number" />
          </Form.Item>
          <Form.Item
            name="postCode"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="0027" type="number" />
          </Form.Item>
        </div>
      </section>

      <Form.Item
        name="street"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="都道府県" />
      </Form.Item>

      <Form.Item
        name="building"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="市区町村" />
      </Form.Item>

      <Form.Item
        name="district"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="町名・番地" />
      </Form.Item>

      <Form.Item
        label="緊急連絡先"
        name="emergency"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
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
