import { Button } from "antd";
import { useReservationStore } from "@/app/_store/reservation";

const CoachSelect = () => {
  const setCoach = useReservationStore((state) => state.setBody);

  const onSelectCoach = (coach) => {
    setCoach({ coach: coach ? coach : null });
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">スタッフ</span>
        </section>
        <section className="tw-bg-white tw-p-3 tw-flex tw-justify-between tw-items-center tw-shadow tw-rounded-xl">
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            スタッフ不要
          </span>
          <Button className="tw-w-[127px]" onClick={() => onSelectCoach(null)}>
            選ぶ
          </Button>
        </section>

        <section className="tw-bg-white tw-p-3 tw-flex tw-flex-col tw-gap-3 tw-shadow tw-rounded-xl">
          <div className="tw-flex tw-justify-start tw-items-start tw-gap-3">
            <section className="tw-bg-gray-200 tw-rounded-full tw-min-w-[60px] tw-max-w-[60px] tw-max-h-[60px] tw-min-h-[60px]"></section>
            <span className="tw-grow tw-leading-[22px] tw-tracking-[0.14px]">
              齋藤航平
            </span>
            <Button
              className="tw-w-[127px]"
              onClick={() => onSelectCoach(null)}
            >
              選ぶ
            </Button>
          </div>
          <div>
            <p className="tw-text-sm tw-tracking-[0.12px] tw-text-secondary">
              運動初心者の方、大歓迎！骨格矯正しながら、美姿勢、美ボディを目指しましょう！
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default CoachSelect;
