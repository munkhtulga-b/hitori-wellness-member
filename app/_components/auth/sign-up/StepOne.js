import { Button, Form, Input, DatePicker } from "antd";

const SignupStepOne = ({ onComplete }) => {
  const [form] = Form.useForm();

  const handleGenderSelect = (value) => {
    form.setFieldValue("gender", value);
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
      onFinish={onComplete}
    >
      <Form.Item
        name="mailAddress"
        label="メールアドレス"
        rules={[
          {
            type: "email",
            message: "正しいメールアドレスをご記入ください。",
          },
          {
            required: true,
            message: "メールアドレスをご記入ください。",
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
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="氏" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
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
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="氏" />
          </Form.Item>
          <Form.Item
            name="firstKana"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
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
            message: "Please select time!",
          },
        ]}
      >
        <DatePicker className="tw-w-full" placeholder="yyyy/mm/dd" />
      </Form.Item>

      <section className="tw-flex tw-flex-col tw-gap-2">
        <label className="after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
          性別
        </label>
        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Select your gender!",
            },
          ]}
        >
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-4">
            <Button onClick={() => handleGenderSelect(1)}>男性</Button>
            <Button onClick={() => handleGenderSelect(2)}>女性</Button>
          </div>
        </Form.Item>
      </section>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="tw-w-full">
          次へ
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupStepOne;
