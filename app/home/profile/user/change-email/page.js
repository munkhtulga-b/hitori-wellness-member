"use client";

import { Button, Form, Input } from "antd";

const UserChangeEmail = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xl tw-font-medium">ログイン</span>
        </section>
        <section>
          <Form
            form={form}
            name="NewEmailForm"
            onFinish={(params) => console.log(params)}
          >
            <Form.Item
              required={false}
              name="email"
              label="メールアドレス"
              validateTrigger="onBlur"
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

            <Form.Item
              required={false}
              name="password"
              label="パスワード "
              rules={[
                {
                  required: true,
                  message: "パスワードをご記入ください。",
                },
              ]}
            >
              <Input.Password placeholder="半角英数8文字以上" />
            </Form.Item>
            <Form.Item>
              <div className="tw-flex tw-justify-end tw-items-center tw-gap-2">
                <Button size="large">Back</Button>
                <Button size="large" type="primary" htmlType="submit">
                  Confirm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </section>
      </div>
    </>
  );
};

export default UserChangeEmail;
