"use client";

import { Button, Modal } from "antd";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { useState } from "react";
import $api from "@/app/_api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MemberPlanCard = ({ memberPlan }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cancelMemberPlan = async () => {
    setIsLoading(true);
    const { isOk } = await $api.member.memberPlan.cancel(memberPlan.id);

    if (isOk) {
      toast.success("Your member plan has been cancelled");
      setIsModalOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    }
    setIsLoading(false);
  };

  console.log(memberPlan);

  return (
    <>
      <section className="tw-flex tw-flex-col tw-gap-2 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
        <span className="tw-text-lg">{nullSafety(memberPlan?.plan?.name)}</span>
        <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line">
          {nullSafety(memberPlan?.plan?.description)}
        </p>
        <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
          <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
            {`料金: ${thousandSeparator(
              memberPlan?.plan?.monthly_item?.prices?.price
            )}円 （税込）／月`}
          </span>
          <Button
            loading={isLoading}
            className="tw-w-[100px]"
            onClick={() => setIsModalOpen(true)}
          >
            解約
          </Button>
        </div>
      </section>

      <Modal
        title="Cancel plan"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <div className="tw-flex tw-flex-col tw-gap-6 tw-mt-6">
          <section className="tw-rounded-xl tw-border-2 tw-border-warning tw-p-4">
            <p className="tw-leading-[26px] tw-tracking-[0.14px]">
              Are you sure you want to cancel this plan?
            </p>
          </section>
          <section className="tw-flex tw-justify-center">
            <Button
              onClick={() => cancelMemberPlan()}
              loading={isLoading}
              type="primary"
              size="large"
              className="tw-w-auto"
            >
              キャンセル
            </Button>
          </section>
        </div>
      </Modal>
    </>
  );
};

export default MemberPlanCard;