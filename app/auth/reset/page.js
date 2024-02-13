"use client";

import PageTransition from "@/app/_components/transitions/PageTransition";
import { Button, Form, Input } from "antd";

const AuthLogin = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <PageTransition>
      <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-gap-y-[29px] tw-items-center">
        <section>
          <span className="tw-text-xl tw-font-medium">パスワード再設定</span>
        </section>
        <section className="tw-w-[290px]">
          <p className="tw-text-secondary tw-leading-[26px] tw-tracking-[0.14px] tw-text-center">
            パスワードをお忘れの場合でも、登録したメールアドレスの確認を以下から行うことで、再設定ができます。
          </p>
        </section>
        <section className="tw-w-full">
          <Form form={form} name="resetPasswordForm" onFinish={onFinish}>
            <Form.Item
              required={false}
              name="email"
              label="ご登録済みのメールアドレス"
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
            <Form.Item>
              <Button type="primary" htmlType="submit" className="tw-w-full">
                送信
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </PageTransition>
  );
};

export default AuthLogin;
