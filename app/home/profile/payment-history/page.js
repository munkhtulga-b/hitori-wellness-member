import Image from "next/image";
import $api from "@/app/_api";
import dayjs from "dayjs";
import { nullSafety } from "@/app/_utils/helpers";
import NoData from "@/app/_components/custom/NoData";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PaymentHistory = async () => {
  const cookieStore = cookies();
  const { status, data: payments } = await $api.member.purchase.getMany(
    cookieStore.get("token").value
  );

  if (status === 401) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">支払歴</span>
        </section>
        {payments?.length ? (
          payments.map((payment) => (
            <section
              key={payment.id}
              className="tw-flex tw-flex-col tw-gap-4 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow"
            >
              <ul className="tw-flex tw-flex-col tw-gap-4">
                <li className="tw-flex tw-justify-start">
                  <section className="tw-w-[30%]">
                    <span className="tw-text-sm tw-tracking-[0.12px]">
                      注文番号
                    </span>
                  </section>
                  <section className="tw-grow">
                    <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                      {nullSafety(payment.id)}
                    </span>
                  </section>
                </li>
                <li className="tw-flex tw-justify-start">
                  <section className="tw-w-[30%]">
                    <span className="tw-text-sm tw-tracking-[0.12px]">
                      店舗
                    </span>
                  </section>
                  <section className="tw-grow">
                    <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                      {nullSafety(payment.studio?.name)}
                    </span>
                  </section>
                </li>
                <li className="tw-flex tw-justify-start">
                  <section className="tw-w-[30%]">
                    <span className="tw-text-sm tw-tracking-[0.12px]">
                      購入日時
                    </span>
                  </section>
                  <section className="tw-grow">
                    <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                      {dayjs(payment.created_at).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </section>
                </li>
                <li className="tw-flex tw-justify-start">
                  <section className="tw-w-[30%]">
                    <span className="tw-text-sm tw-tracking-[0.12px]">
                      決済カード
                    </span>
                  </section>
                  <section className="tw-grow">
                    <span className="tw-text-sm tw-tracking-[0.12px] tw-text-grayLight">
                      {` xxxx xxxx xxxx ${nullSafety(
                        payment.payment_card_details?.card_last4
                      )}`}
                    </span>
                  </section>
                </li>
              </ul>
              <div className="tw-bg-dividerLight tw-h-[1px] tw-w-full"></div>
              <div className="tw-flex tw-justify-start tw-items-center tw-gap-4">
                <section className="tw-grow tw-flex tw-flex-col tw-gap-2">
                  <span className="tw-text-sm tw-tracking-[0.12px]">
                    購入詳細
                  </span>
                  <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                    {nullSafety(payment.description)}
                  </p>
                </section>
                <Image
                  src="/assets/profile/arrow-right.svg"
                  alt="go"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </section>
          ))
        ) : (
          <NoData message={"履歴が存在しません。"} />
        )}
      </div>
    </>
  );
};

export default PaymentHistory;
