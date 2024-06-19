import { useSearchParams } from "next/navigation";
import StatusAnimation from "../../animation/StatusAnimation";
import $api from "@/app/_api";
import { toast } from "react-toastify";

const SignupStepFour = ({ registeredEmail }) => {
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email");

  const sendVerificationEmail = async () => {
    if (!registeredEmail) return;
    const { isOk } = await $api.auth.sendVerification({
      email: registeredEmail,
    });
    if (isOk) {
      toast.success("再度送信されました。");
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-6 tw-mt-[68px]">
      <StatusAnimation />
      <section className="tw-self-stretch tw-bg-grayLight tw-p-4 tw-rounded-xl tw-border tw-border-info">
        <p className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
          ご登録ありがとうございました。
        </p>
      </section>
      <section className="tw-flex tw-flex-col">
        <p className="tw-leading-[26px] tw-tracking-[0.14px] tw-text-center">
          {`登録されたメールアドレス（${
            registeredEmail ?? queryEmail ?? "mailaddress"
          }）に確認メールを送信しました。メールの本文内のリンクから確認ページにアクセスして登録を完了してください。`}
        </p>
        <span
          onClick={() => sendVerificationEmail()}
          className="tw-self-center tw-text-support tw-underline tw-underline-offset-2 tw-cursor-pointer"
        >
          確認メールを再送信する
        </span>
      </section>
    </div>
  );
};

export default SignupStepFour;
