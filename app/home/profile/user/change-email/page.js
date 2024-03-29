"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import $api from "@/app/_api";
import SuccessAnimation from "@/app/_components/animation/StatusAnimation";
import Cookies from "js-cookie";

const UserChangeEmail = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState(null);

  const changeEmail = async (params) => {
    setIsLoading(true);
    const { isOk } = await $api.auth.changeEmail(params);
    if (isOk) {
      setSentEmail(params.mailAddress);
      setIsEmailSent(true);
      Cookies.remove("token");
    }
    setIsLoading(false);
  };

  const RequestSuccess = () => {
    return (
      <>
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-[68px]">
          <SuccessAnimation />
          <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info">
            <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
              会員登録が成功しました。
            </p>
          </section>
          <section>
            <p className="tw-leading-[26px] tw-tracking-[0.14px] tw-text-center">
              {`登録されたメールアドレス（${
                sentEmail ?? "mailaddress"
              }）に確認メールを送信しました。メールを確認して本文内のリンクから確認ページにアクセスしてください。`}
            </p>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      {!isEmailSent ? (
        <div className="tw-flex tw-flex-col tw-gap-4">
          <section>
            <span className="tw-text-xl tw-font-medium">ログイン</span>
          </section>
          <section>
            <Form
              form={form}
              name="NewEmailForm"
              onFinish={(params) => changeEmail(params)}
            >
              <Form.Item
                required={false}
                name="mailAddress"
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
                  <Button size="large" onClick={() => router.back()}>
                    戻る
                  </Button>
                  <Button
                    loading={isLoading}
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    送信
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </section>
        </div>
      ) : (
        <RequestSuccess />
      )}
    </>
  );
};

export default UserChangeEmail;
