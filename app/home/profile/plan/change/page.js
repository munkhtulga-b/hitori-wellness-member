"use client";

import $api from "@/app/_api";
import PlanChangeConfirm from "@/app/_components/home/profile/plan/PlanChangeConfirm";
import PlanChangePlan from "@/app/_components/home/profile/plan/PlanChangePlan";
import PlanChangeStudio from "@/app/_components/home/profile/plan/PlanChangeStudio";
import PlanChangeSuccess from "@/app/_components/home/profile/plan/PlanChangeSuccess";
import { usePlanChangeStorage } from "@/app/_store/plan-change";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChangePlanPage = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  const getPlanChangeStorage = usePlanChangeStorage((state) => state.getBody());
  const setPlanChangeStorage = usePlanChangeStorage((state) => state.setBody);

  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  useEffect(() => {
    const studioId = searchParams.get("studioId");
    const planId = searchParams.get("planId");
    if (!studioId && !planId) {
      setCurrentStep(1);
      setPlanChangeStorage({
        changed: null,
      });
    }
    if (studioId && !planId) {
      setCurrentStep(2);
      setPlanChangeStorage({
        changed: null,
      });
    }
    if (studioId && planId) {
      setCurrentStep(3);
      if (!getPlanChangeStorage?.changed) {
        fetchChangedPlan(planId, studioId);
      }
    }
  }, [searchParams]);

  const changePlan = async () => {
    setIsRequesting(true);
    const { isOk } = await $api.member.memberPlan.change({
      changePlanId: Number(searchParams.get("planId")),
      studioId: Number(searchParams.get("studioId")),
    });
    if (isOk) {
      setCurrentStep(4);
    }
    setIsRequesting(false);
  };

  const fetchCurrentPlan = async () => {
    const { isOk, data } = await $api.member.memberPlan.getMany();
    if (isOk) {
      setPlanChangeStorage({
        current: data[0],
      });
    }
  };

  const fetchChangedPlan = async (changedPlan, studioId) => {
    const { isOk, data } = await $api.member.plan.getOne(
      getPlanChangeStorage?.current?.plan_id,
      {
        studioId,
        changedPlan,
      }
    );
    if (isOk) {
      setPlanChangeStorage({
        changed: data,
      });
    }
  };

  return (
    <>
      {currentStep === 1 ? <PlanChangeStudio /> : null}
      {currentStep === 2 ? (
        <PlanChangePlan currentPlan={getPlanChangeStorage?.current} />
      ) : null}
      {currentStep === 3 ? (
        <PlanChangeConfirm
          plan={getPlanChangeStorage?.changed}
          onConfirm={changePlan}
          isRequesting={isRequesting}
        />
      ) : null}
      {currentStep === 4 ? <PlanChangeSuccess /> : null}
    </>
  );
};

export default ChangePlanPage;
