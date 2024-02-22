import { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";

const SignupStepThree = ({ onComplete }) => {
  const [form] = Form.useForm();
  const [showWarning, setShowWarning] = useState(false);

  const onFinish = ({ confirm }) => {
    if (!isValidPassword(confirm)) {
      return setShowWarning(true);
    }
    setShowWarning(false);
    onComplete(confirm);
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

  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {required && <span className="tw-ml-1 tw-text-required">*</span>}
    </>
  );

  return (
    <Form
      requiredMark={customizeRequiredMark}
      form={form}
      name="SignupStepThree"
      onFinish={onFinish}
    >
      <Form.Item
        name="password"
        label="パスワード "
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="半角英数8文字以上" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="パスワード（確認用）"
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
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="半角英数8文字以上" />
      </Form.Item>

      {showWarning && (
        <section className="tw-mt-[28px]">
          <div className="tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info">
            <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px]">
              ８文字以上の半角英数記号、大文字、記号、それ以外をそれぞれ一文字以上使用してください。
            </p>
          </div>
        </section>
      )}

      <section className="tw-mt-[130px] tw-flex tw-flex-col tw-gap-6">
        <Form.Item
          name="agreementFirst"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <Checkbox className="tw-text-xl">
            <span className="tw-text-lg">プロモーションメールを受け取る</span>
          </Checkbox>
        </Form.Item>
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-lg tw-text-secondary">
            下記規約に同意の上、【会員登録】ボタンを押してください。
          </p>
          <Form.Item
            name="agreementSecond"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Checkbox>
              <span className="tw-text-lg after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
                利用規約に同意する
              </span>
            </Checkbox>
          </Form.Item>
        </div>
      </section>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="tw-w-full">
          会員登録
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupStepThree;
