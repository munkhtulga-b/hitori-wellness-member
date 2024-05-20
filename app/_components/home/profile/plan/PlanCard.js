"use client";

import { Button, Modal } from "antd";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { useState } from "react";
import $api from "@/app/_api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import EEnumPlanStatus from "@/app/_enums/EEnumPlanStatus";

const MemberPlanCard = ({ memberPlan }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelMemberPlan = async () => {
    setIsLoading(true);
    const { isOk } = await $api.member.memberPlan.cancel(memberPlan.id);

    if (isOk) {
      toast.success("解約が完了しました。");
      setIsModalOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <>
      <section className="tw-flex tw-flex-col tw-gap-2 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
        <span className="tw-text-lg">{nullSafety(memberPlan?.plan?.name)}</span>
        <p
          dangerouslySetInnerHTML={{
            __html: nullSafety(memberPlan?.plan?.description),
          }}
          className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line"
        ></p>
        <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
          {`料金: ${thousandSeparator(
            memberPlan?.plan?.monthly_item?.prices[0]?.price
          )}円 （税込）／月`}
        </span>
        <div className="tw-flex tw-justify-end tw-items-center tw-gap-4 tw-mt-4">
          <Button
            disabled={!memberPlan?.plan?.is_enabled_withdraw}
            loading={isLoading}
            className="tw-w-[100px]"
            onClick={() => setIsModalOpen(true)}
          >
            解約
          </Button>
          <Button
            disabled={!memberPlan?.plan?.is_enabled_change_plan}
            className="tw-w-[100px]"
          >
            変更
          </Button>
        </div>
        {memberPlan?.status === EEnumPlanStatus.SCHEDULED_CANCEL && (
          <div>
            {`当プランは利用規約通り${dayjs(memberPlan?.cancel_date).format(
              "YYYY年MM月DD日"
            )}まで有効です。`}
          </div>
        )}
      </section>

      <Modal
        title="注意事項"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-6">
          <section className="tw-rounded-xl tw-border-2 tw-border-warning tw-p-4">
            <p className="tw-leading-[26px] tw-tracking-[0.14px]">
              ※当プランの解約時には前払いの返金はございません。本当に解約いたしますか？
            </p>
          </section>
          <section className="tw-flex tw-justify-end tw-items-center tw-gap-2">
            <Button
              onClick={() => setIsModalOpen(false)}
              size="large"
              className="tw-w-auto"
            >
              戻る
            </Button>
            <Button
              onClick={() => cancelMemberPlan()}
              loading={isLoading}
              type="primary"
              size="large"
              className="tw-w-auto"
            >
              解約
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default MemberPlanCard;
