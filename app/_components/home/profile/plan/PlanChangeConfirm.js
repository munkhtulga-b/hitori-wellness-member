import { Button } from "antd";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";

const PlanChangeConfirm = ({ plan, onConfirm, isRequesting }) => {
  return (
    <>
      <div className="tw-h-full tw-flex tw-flex-col tw-justify-between">
        <div className="tw-flex tw-flex-col">
          <section className="tw-p-3 tw-rounded-xl tw-bg-white tw-shadow">
            <div className="tw-flex tw-flex-col tw-gap-2">
              <span className="tw-text-lg">
                {nullSafety(plan?.change?.name)}
              </span>
              {plan?.description ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: nullSafety(plan?.change?.description),
                  }}
                  className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line"
                ></p>
              ) : null}
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">{`料金: ${thousandSeparator(
                plan?.change?.monthly_price
              )}（税込）／月`}</span>
            </div>
          </section>
          <section className="tw-bg-white tw-p-3 tw-rounded-xl tw-border-2 tw-border-info tw-mt-4">
            <p className="tw-leading-[22px] tw-tracking-[0.14px]">
              ※ 当決済は主要カードで行います。
              <br /> ※
              新プランが現プランより値段が高い場合申請直後に適用になります。
              <br /> ※
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
                    <span className="tw-text-lg tw-font-semibold">合計額</span>
                    <div className="tw-flex tw-justify-start tw-gap-2">
                      <span
                        className={`tw-leading-[22px] tw-tracking-[0.14px] tw-font-semibold`}
                      >
                        ￥{thousandSeparator(plan?.price)}
                      </span>
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
