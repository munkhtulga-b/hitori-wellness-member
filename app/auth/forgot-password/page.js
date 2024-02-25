"use client";

import { Button, Form, Input } from "antd";
import $api from "@/app/_api";
import { useState } from "react";

const AuthPasswordReset = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onFinish = async (params) => {
    setIsLoading(true);
    const { isOk } = await $api.auth.sendVerification(params);
    if (isOk) {
      setIsSent(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      <section>
        <span className="tw-text-xl tw-font-medium">パスワード再設定</span>
      </section>
      <section className="tw-mt-[28px] tw-w-[290px]">
        <p className="tw-text-secondary tw-leading-[26px] tw-tracking-[0.14px] tw-text-center">
          パスワードをお忘れの場合でも、登録したメールアドレスの確認を以下から行うことで、再設定ができます。
        </p>
      </section>
      <section className="tw-mt-[30px] tw-w-full">
        <Form form={form} name="resetPasswordForm" onFinish={onFinish}>
          <Form.Item
            required={false}
            name="email"
            label="ご登録済みのメールアドレス"
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
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="tw-w-full"
            >
              送信
            </Button>
          </Form.Item>
        </Form>
      </section>
      {isSent && (
        <section className="tw-mt-6 tw-p-4 tw-border tw-border-info tw-rounded-xl">
          <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px]">
            登録されたメールアドレス（mailaddress）に　パスワードリセットメールを送信しました。
            メールを確認して本文内のリンクからパスワードリセットページにアクセスしてください。
          </p>
        </section>
      )}
    </div>
  );
};

export default AuthPasswordReset;
