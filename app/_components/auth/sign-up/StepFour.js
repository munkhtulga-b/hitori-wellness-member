import StatusAnimation from "../../animation/StatusAnimation";

const SignupStepFour = ({ registeredEmail }) => {
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-[68px]">
      <StatusAnimation />
      <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info">
        <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
          会員登録が成功しました。
        </p>
      </section>
      <section>
        <p className="tw-leading-[26px] tw-tracking-[0.14px] tw-text-center">
          {`登録されたメールアドレス（${
            registeredEmail ?? "mailaddress"
          }）に確認メールを送信しました。メールを確認して本文内のリンクから確認ページにアクセスしてください。`}
        </p>
      </section>
    </div>
  );
};

export default SignupStepFour;
