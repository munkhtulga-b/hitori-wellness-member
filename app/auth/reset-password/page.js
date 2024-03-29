"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";
import $api from "@/app/_api";
import { useSearchParams, useRouter } from "next/navigation";

const NewPassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onFinish = (params) => {
    if (!isValidPassword(params.confirm)) {
      return setShowWarning(true);
    }
    setShowWarning(false);
    resetPassword(params.confirm);
  };

  const isValidPassword = (value) => {
    // Regular expressions to check for symbol, uppercase character, and number
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    // Check if the string contains at least one of each
    const containsSymbol = symbolRegex.test(value);
    const containsUppercase = uppercaseRegex.test(value);
    const containsNumber = numberRegex.test(value);

    return (
      value.length >= 8 && containsSymbol && containsUppercase && containsNumber
    );
  };

  const resetPassword = async (password) => {
    setIsLoading(true);
    const token = searchParams.get("token");
    const { isOk } = await $api.auth.resetPassword.resetPassword(token, {
      password,
    });
    if (isOk) {
      setIsSuccess(true);
    }
    setIsLoading(false);
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
          <Button
            onClick={() => router.push("/")}
            type="primary"
            className="tw-w-full"
          >
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
                  message: "新しいパスワードをご記入ください。",
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
                  message: "新しいパスワード（確認用）をご記入ください。",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("パスワードが一致しません。")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="半角英数8文字以上" />
            </Form.Item>

            {showWarning && (
              <section className="tw-my-[28px]">
                <div className="tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info">
                  <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px]">
                    ８文字以上の半角英数記号、大文字、記号、それ以外をそれぞれ一文字以上使用してください。
                  </p>
                </div>
              </section>
            )}

            <Form.Item>
              <Button
                size="large"
                loading={isLoading}
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
