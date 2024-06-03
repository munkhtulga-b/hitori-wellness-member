"use client";

import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";
import $api from "@/app/_api";
import { useSearchParams, useRouter } from "next/navigation";
import { isValidPassword } from "@/app/_utils/helpers";
import PasswordCretaria from "@/app/_components/custom/PasswordCretaria";

const NewPassword = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const newPassword = Form.useWatch("password", form);

  const onFinish = (params) => {
    if (
      !isValidPassword(params.confirm)?.cretariasMet < 2 &&
      !isValidPassword(params.confirm)?.isLongEnough
    ) {
      return messageApi.error(
        "半角英大文字、半角英小文字、数字、記号の中から2種類を含む8文字以上を指定してください。"
      );
    }
    resetPassword(params.confirm);
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
        {contextHolder}
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
              label="新しいパスワード"
              rules={[
                {
                  required: true,
                  message: "新しいパスワードを入力してください。",
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
                  message: "新しいパスワード（確認用）を入力してください。",
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
            <section className="tw-my-[28px]">
              <PasswordCretaria password={newPassword} />
            </section>

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
