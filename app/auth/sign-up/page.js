"use client";

import { useRouter } from "next/navigation";
import { Button, Form, Input, DatePicker } from "antd";

const AuthSignup = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="tw-py-[28px] tw-px-5 tw-flex tw-flex-col tw-items-center">
      <section>
        <span className="tw-text-xl tw-font-medium">ログイン</span>
      </section>
      <section className="tw-mt-10 tw-w-full">
        <Form
          form={form}
          name="loginForm"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
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

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label>Full name</label>
            <div className="tw-grid tw-grid-cols-2 tw-auto-rows-min tw-gap-2">
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </section>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label>Kana Full name</label>
            <div className="tw-grid tw-grid-cols-2 tw-gap-2">
              <Form.Item
                name="lastNameKana"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="firstNameKana"
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </section>

          <Form.Item
            name="date-picker"
            label="DatePicker"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker className="tw-w-full" />
          </Form.Item>

          <section className="tw-flex tw-flex-col tw-gap-2">
            <label>Gender</label>
            <div className="tw-flex tw-justify-start tw-gap-2">
              <Form.Item>
                <button
                  type="button"
                  className="tw-inline-flex tw-py-[10px] tw-px-4 tw-rounded-[8px] tw-border tw-border-primary"
                >
                  Male
                </button>
              </Form.Item>
              <Form.Item>
                <button
                  type="button"
                  className="tw-inline-flex tw-py-[10px] tw-px-4 tw-rounded-[8px] tw-border tw-border-primary"
                >
                  Female
                </button>
              </Form.Item>
            </div>
          </section>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="tw-w-full">
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </section>
      <section className="tw-mt-6">
        <span
          onClick={() => router.push("/auth/reset")}
          className="tw-tracking-[0.14px] tw-cursor-pointer"
        >
          パスワードをお忘れの方はこちら
        </span>
      </section>
    </div>
  );
};

export default AuthSignup;
