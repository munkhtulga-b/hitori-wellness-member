"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import $api from "@/app/_api";
import { useUserStore } from "@/app/_store/user";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const AuthLogin = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (loginErrorMessage !== null) {
      setTimeout(() => {
        setLoginErrorMessage(null);
      }, 5000);
    }
  }, [loginErrorMessage]);

  const userLogin = async (params) => {
    setIsLoading(true);
    params.email = params.email.toLowerCase().trim();
    const { isOk, data } = await $api.auth.login(params);
    if (isOk) {
      if (process.env.NODE_ENV === "development") {
        Cookies.set("access_token", data?.tokens?.access_token);
      }
      Cookies.set("session", true);
      setUser({ ...data?.user });
      router.push("/home");
    } else {
      setLoginErrorMessage(data.error.message ?? "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      layout
      className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center"
    >
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
                message: "正しいメールアドレスを入力してください。",
              },
              {
                required: true,
                message: "メールアドレスを入力してください。",
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
                message: "パスワードを入力してください。",
              },
            ]}
          >
            <Input.Password placeholder="半角英数8文字以上" />
          </Form.Item>
          <AnimatePresence>
            {loginErrorMessage !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="tw-text-right"
              >
                <span className="tw-text-sm tw-text-required">
                  {loginErrorMessage}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <Form.Item>
            <Button
              size="large"
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
      <section className="tw-mt-[38px] tw-w-full">
        <Button
          size="large"
          type="default"
          style={{
            width: "100%",
            border: "0px",
            background: "#F4F5F6",
          }}
        >
          <span
            onClick={() => router.push("/auth/sign-up")}
            className="tw-text-lg tw-tracking-[0.16px] tw-cursor-pointer"
          >
            新規会員登録
          </span>
        </Button>
      </section>
    </motion.div>
  );
};

export default AuthLogin;
