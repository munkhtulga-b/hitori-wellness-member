import { Button, Form, Input, Checkbox, message } from "antd";
import { isValidPassword } from "@/app/_utils/helpers";
import PasswordCretaria from "../../custom/PasswordCretaria";

const SignupStepThree = ({ onComplete, isLoading }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const newPassword = Form.useWatch("password", form);

  const onFinish = (params) => {
    if (
      !isValidPassword(params.confirm)?.cretariasMet < 2 ||
      !isValidPassword(params.confirm)?.isLongEnough
    ) {
      return messageApi.error(
        "半角英大文字、半角英小文字、数字、記号の中から2種類を含む8文字以上を指定してください。"
      );
    }
    delete params.confirm;
    delete params.termsAndConditions;
    onComplete(params);
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
              message: "パスワードを入力してください。",
            },
          ]}
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
              message: "パスワード（確認用）を入力してください。",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("パスワードが一致しません。"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="半角英数8文字以上" />
        </Form.Item>

        <PasswordCretaria password={newPassword} />

        <section className="tw-mt-[28px] tw-flex tw-flex-col tw-gap-6">
          <Form.Item
            name="isAcceptMail"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox className="tw-text-xl">
              <span className="tw-text-lg">
                キャンペーン・お知らせ等の情報をメールで受け取る
              </span>
            </Checkbox>
          </Form.Item>
          <div className="tw-flex tw-flex-col tw-gap-2">
            <p className="tw-text-lg tw-text-secondary">
              下記規約に同意の上、【会員登録】ボタンを押してください。
            </p>
            <Form.Item
              name="termsAndConditions"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "会員登録には利用規約に同意する必要があります。"
                          )
                        ),
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <Checkbox>
                <span className="tw-text-lg after:tw-content-['*'] after:tw-text-required after:tw-ml-1">
                  <a
                    href="https://lp.hitoriwellness.jp/tos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-text-current tw-underline tw-underline-offset-4 tw-deco"
                  >
                    利用規約
                  </a>
                  に同意する
                </span>
              </Checkbox>
            </Form.Item>
          </div>
        </section>

        <Form.Item>
          <Button
            size="large"
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="tw-w-full"
          >
            会員登録
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupStepThree;
