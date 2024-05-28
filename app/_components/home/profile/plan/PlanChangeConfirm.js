import { Button } from "antd";
import {
  isNullOrUndefined,
  nullSafety,
  thousandSeparator,
} from "@/app/_utils/helpers";

const PlanChangeConfirm = ({ plan, onConfirm, isRequesting }) => {
  return (
    <>
      <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <section className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow">
            <div className="tw-flex tw-flex-col tw-gap-2">
              <span className="tw-text-lg">{nullSafety(plan?.name)}</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: nullSafety(plan?.description),
                }}
                className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line"
              ></p>
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                plan?.monthly_price
              )}（税込）／月`}</span>
            </div>
          </section>
          <section className="tw-bg-white tw-p-3 tw-rounded-xl tw-border-2 tw-border-info tw-mt-4">
            <p className="tw-leading-[22px] tw-tracking-[0.14px]">
              ※ 当決済は主要カードで行います。 ※
              新プランが現プランより値段が高い場合申請直後に適用になります。 ※
              新プランが現プランより値段が低い場合現プランの有効期限が切れた後から適用されます。
            </p>
          </section>
        </div>
        <section>
          <div className="tw-flex tw-flex-col tw-justify-between tw-h-full">
            <section className="tw-flex tw-flex-col tw-gap-4 tw-pt-4 tw-border-t tw-border-dividerLight">
              <ul>
                <>
                  <li className="tw-flex tw-justify-between">
                    <span className="tw-text-lg tw-text-secondary">項目</span>
                    <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                      金額（税込）
                    </span>
                  </li>
                  <li className="tw-flex tw-justify-between">
                    <span className="tw-text-lg tw-font-light">{`初月（日割り ${nullSafety(
                      plan?.remaininng_days
                    )} 日分）`}</span>
                    <div className="tw-flex tw-justify-start tw-gap-2">
                      <span
                        className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                          !isNullOrUndefined(
                            plan?.discounted_price_for_first_month
                          ) &&
                          plan?.first_month_price !==
                            plan?.discounted_price_for_first_month
                            ? "tw-line-through"
                            : ""
                        }`}
                      >
                        ￥{thousandSeparator(plan?.first_month_price)}
                      </span>
                      {!isNullOrUndefined(
                        plan?.discounted_price_for_first_month
                      ) &&
                        plan?.first_month_price !==
                          plan?.discounted_price_for_first_month && (
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                          >
                            ￥
                            {thousandSeparator(
                              plan?.discounted_price_for_first_month
                            )}
                          </span>
                        )}
                    </div>
                  </li>
                  <li className="tw-flex tw-justify-between">
                    <span className="tw-text-lg tw-font-light">入会金</span>
                    <div className="tw-flex tw-justify-start tw-gap-2">
                      <span
                        className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                          !isNullOrUndefined(
                            plan?.discounted_price_for_admission_fee
                          ) &&
                          plan?.admission_fee !==
                            plan?.discounted_price_for_admission_fee
                            ? "tw-line-through"
                            : ""
                        }`}
                      >
                        ￥{thousandSeparator(plan?.admission_fee)}
                      </span>
                      {!isNullOrUndefined(
                        plan?.discounted_price_for_admission_fee
                      ) &&
                        plan?.admission_fee !==
                          plan?.discounted_price_for_admission_fee && (
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                          >
                            ￥
                            {thousandSeparator(
                              plan?.discounted_price_for_admission_fee
                            )}
                          </span>
                        )}
                    </div>
                  </li>
                  <li className="tw-flex tw-justify-between">
                    <span className="tw-text-lg tw-font-light">翌月</span>
                    <div className="tw-flex tw-justify-start tw-gap-2">
                      <span
                        className={`tw-leading-[22px] tw-tracking-[0.14px] ${
                          !isNullOrUndefined(
                            plan?.discounted_price_for_monthly_item
                          ) &&
                          plan?.monthly_price !==
                            plan?.discounted_price_for_monthly_item
                            ? "tw-line-through"
                            : ""
                        }`}
                      >
                        ￥{thousandSeparator(plan?.monthly_price)}
                      </span>
                      {!isNullOrUndefined(
                        plan?.discounted_price_for_monthly_item
                      ) &&
                        plan?.monthly_price !==
                          plan?.discounted_price_for_monthly_item && (
                          <span
                            className={`tw-leading-[22px] tw-tracking-[0.14px] tw-w-[70px] tw-text-right`}
                          >
                            ￥
                            {thousandSeparator(
                              plan?.discounted_price_for_monthly_item
                            )}
                          </span>
                        )}
                    </div>
                  </li>
                </>
              </ul>
              <Button
                loading={isRequesting}
                size="large"
                type="primary"
                className="tw-w-full"
                onClick={() => onConfirm()}
              >
                次へ
              </Button>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlanChangeConfirm;
