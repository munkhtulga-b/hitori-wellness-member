"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { isValidPassword } from "@/app/_utils/helpers";
import $api from "@/app/_api";

const ChangePassword = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onFinish = (params) => {
    if (!isValidPassword(params.newConfirm)) {
      return setShowWarning(true);
    }
    setShowWarning(false);
    changePassword(params);
  };

  const changePassword = async ({ currentPassword, newConfirm }) => {
    setIsLoading(true);
    const { isOk } = await $api.auth.resetPassword.resetCurrentPassword({
      oldPassword: currentPassword,
      newPassword: newConfirm,
    });
    if (isOk) {
      form.resetFields();
      messageApi.success("Password changed successfully");
    }
    setIsLoading(false);
  };

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  return (
    <>
      {contextHolder}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            パスワードを変更する
          </span>
        </section>
        <Form
          requiredMark={customizeRequiredMark}
          form={form}
          name="SignupStepThree"
          onFinish={onFinish}
        >
          <Form.Item
            name="currentPassword"
            label="現在のパスワード"
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
            name="newPassword"
            label="新しいパスワード"
            rules={[
              {
                required: true,
                message: "パスワードをご記入ください。",
              },
            ]}
            style={{ marginTop: 24 }}
          >
            <Input.Password placeholder="半角英数8文字以上" />
          </Form.Item>
          <Form.Item
            name="newConfirm"
            label="新しいパスワード（確認用）"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "パスワード（確認用）をご記入ください。",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
          <div className="tw-flex tw-justify-end tw-gap-2">
            <Button
              size="large"
              className="tw-w-[80px]"
              onClick={() => router.back()}
            >
              戻る
            </Button>
            <Form.Item>
              <Button
                size="large"
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="tw-w-[80px]"
              >
                保存
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
