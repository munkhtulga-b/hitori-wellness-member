import $api from "@/app/_api";
import { useUserStore } from "@/app/_store/user";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VerificationReminder = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.getUser());

  const sendVerificationEmail = async () => {
    const { isOk } = await $api.auth.sendVerification({
      email: user?.mail_address,
    });
    if (isOk) {
      Cookies.remove("session");
      router.push(`/auth/sign-up?step=complete&email=${user?.mail_address}`);
    }
  };
  return (
    <>
      {!user?.is_verified ? (
        <div className="tw-p-4 tw-rounded-xl tw-border tw-border-warning">
          <section className="tw-flex tw-justify-start tw-items-center tw-gap-1">
            <Image
              src="/assets/branch/warning-icon.svg"
              alt="warning"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="tw-grow tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-text-center">
              メールアドレス確認を完了させてください。
              <br />{" "}
              <span
                onClick={() => sendVerificationEmail()}
                className="tw-text-support tw-underline tw-underline-offset-2 tw-cursor-pointer"
              >
                確認メール再送信する
              </span>
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default VerificationReminder;
