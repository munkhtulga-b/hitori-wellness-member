import $api from "@/app/_api";
import { cookies } from "next/headers";
import { nullSafety, thousandSeparator } from "@/app/_utils/helpers";
import { Button } from "antd";
import NoData from "@/app/_components/custom/NoData";

const ActiveSubscription = async () => {
  const cookieStore = cookies();
  const { data: memberPlan } = await $api.member.memberPlan.getMany(
    cookieStore.get("token").value
  );
  const { data: memberTickets } = await $api.member.memberTicket.getMany(
    cookieStore.get("token").value
  );

  console.log(memberPlan);

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-mt-4">
          <span className="tw-text-xxl tw-font-medium">
            加入中プラン・所持チケット
          </span>
        </section>
        {memberPlan?.length ? (
          <>
            <section className="tw-flex tw-flex-col tw-gap-2 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow">
              <span className="tw-text-lg">
                {nullSafety(memberPlan[0]?.plan?.name)}
              </span>
              <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-line">
                {nullSafety(memberPlan[0]?.plan?.description)}
              </p>
              <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
                <span className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary">
                  {`料金: ${thousandSeparator(
                    memberPlan[0]?.plan?.monthly_item?.prices[0]?.price
                  )}円 （税込）／月～`}
                </span>
                <Button className="tw-w-[100px]">解約</Button>
              </div>
            </section>
          </>
        ) : (
          <NoData message={"No plan found"} />
        )}
        {memberTickets?.length ? (
          <>
            {/* TODO: Integrate tickets */}
            {memberTickets?.map((ticket) => (
              <section
                key={ticket.id}
                className="tw-flex tw-flex-col tw-gap-1 tw-bg-white tw-p-4 tw-rounded-xl tw-shadow"
              >
                <span className="tw-text-lg">
                  {nullSafety(ticket.ticket?.name)}
                  {`(${nullSafety(ticket.num)}回券)`}
                </span>
                <p className="tw-leading-[22px] tw-tracking-[0.14px] tw-text-secondary tw-whitespace-pre-wrap">
                  {nullSafety(ticket.description)}
                </p>
              </section>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default ActiveSubscription;
