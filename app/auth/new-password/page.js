"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import SuccessAnimation from "@/app/_components/animation/SuccessAnimation";

const NewPassword = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const SuccessMessage = () => {
    return (
      <>
        <section className="tw-mt-[45px]">
          <SuccessAnimation />
        </section>
        <section className="tw-bg-grayLight tw-mt-6 tw-p-4 tw-h-[80px] tw-rounded-[12px] tw-border tw-border-info tw-w-full tw-grid tw-place-items-center">
          <span className="tw-tracking-[0.14px] tw-leading-[26px]">
            パスワードのリセットが完了しました。
          </span>
        </section>
        <section className="tw-mt-6 tw-w-full">
          <Button type="primary" className="tw-w-full">
            ログインページへ戻る
          </Button>
        </section>
      </>
    );
  };

  const SetNewPasswordForm = () => {
    return (
      <>
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
              required={false}
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
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="半角英数8文字以上" />
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => setIsSuccess(false)}
                type="primary"
                htmlType="submit"
                className="tw-w-full"
              >
                確定
              </Button>
            </Form.Item>
          </Form>
        </section>
      </>
    );
  };

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      {isSuccess ? SuccessMessage() : SetNewPasswordForm()}
    </div>
  );
};

export default NewPassword;
