"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import $api from "@/app/_api";

const AuthLogin = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const userLogin = async (params) => {
    const { status, data } = await $api.auth.login(params);
    if (status === 200) {
      // Success response
      console.log(data);
    }
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
            <Button type="primary" htmlType="submit" className="tw-w-full">
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </section>
      <section className="tw-mt-[31px]">
        <span
          onClick={() => router.push("/auth/reset")}
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
