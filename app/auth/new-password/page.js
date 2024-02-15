"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

const NewPassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      <section>
        <span className="tw-text-xl tw-font-medium">パスワードリセット</span>
      </section>
      <section className="tw-mt-10 tw-w-full">
        <Form form={form} name="loginForm" onFinish={onFinish}>
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

          <Form.Item
            name="confirm"
            label="新しいパスワード（確認用）"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="半角英数8文字以上" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="tw-w-full">
              確定
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default NewPassword;
