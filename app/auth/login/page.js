"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import $api from "@/app/_api";
import { useUserStore } from "@/app/_store/user";
import Cookies from "js-cookie";

const AuthLogin = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const userLogin = async (params) => {
    setIsLoading(true);
    const { isOk, data } = await $api.auth.login(params);
    if (isOk) {
      Cookies.set("token", data.tokens);
      setUser(data.user);
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      <section>
        <span className="tw-text-xl tw-font-medium">ログイン</span>
      </section>
      <section className="tw-mt-10 tw-w-full">
        <Form form={form} name="loginForm" onFinish={userLogin}>
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
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="tw-w-full"
            >
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </section>
      <section className="tw-mt-[31px]">
        <span
          onClick={() => router.push("/auth/forgot-password")}
          className="tw-tracking-[0.14px] tw-cursor-pointer"
        >
          パスワードをお忘れの方は<u>こちら</u>
        </span>
      </section>
      <div className="tw-bg-dividerLight tw-w-full tw-h-[1px] tw-mt-[36px]"></div>
      <section className="tw-mt-[38px]">
        <span
          onClick={() => router.push("/auth/sign-up")}
          className="tw-text-lg tw-tracking-[0.16px] tw-cursor-pointer"
        >
          新規会員登録
        </span>
      </section>
    </div>
  );
};

export default AuthLogin;
