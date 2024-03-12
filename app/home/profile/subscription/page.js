import { Button } from "antd";

const ActiveSubscription = () => {
  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">
            加入中プラン・所持チケット
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
          <span className="tw-text-lg">月会費プラン</span>
          <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
            しっかり週2（月8回まで）
            「フィットネスエリア・ロッカールーム、シャワー、お風呂、サウナ」の施設がご利用いただけます。
          </p>
          <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
            <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
              料金: 8,000円 （税込）／月～
            </span>
            <Button className="tw-w-[100px]">解約</Button>
          </div>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-1 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
          <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
            パーソナルストレッチメニュー予約専用チケットです。こちらのチケットは都度利用専用となります。
          </p>
        </section>
      </div>
    </>
  );
};

export default ActiveSubscription;
