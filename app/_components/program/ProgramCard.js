import { Button } from "antd";
import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";

const ProgramCard = ({ program }) => {
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-3 tw-p-3 tw-rounded-xl tw-shadow tw-min-w-[285px] tw-max-w-[285px]">
        <section className="tw-flex tw-justify-start tw-items-center tw-gap-3">
          <div className="tw-rounded-lg tw-bg-gray-200 tw-min-w-[80px] tw-max-w-[80px] tw-max-h-[80px] tw-min-h-[80px]"></div>
          <p className="tw-leading-[22px] tw-tracking-[0.14px]">
            {nullSafety(program.name)}
          </p>
        </section>
        <section className="tw-flex tw-flex-col tw-justify-between tw-gap-2 tw-h-full">
          <p className="tw-text-sm tw-tracking-[0.12px] tw-line-clamp-3">
            {nullSafety(program.description)}
          </p>
          <div className="tw-grid tw-grid-cols-2 tw-auto-rows-min tw-gap-2">
            <Button
              onClick={() => router.push(`/home/program/${program.id}`)}
              size="small"
            >
              <div className="tw-flex tw-justify-center tw-items-center tw-gap-2">
                <span>詳細</span>
                <Image
                  src="/assets/program/arrow-right.svg"
                  alt="next"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </Button>
            <Button size="small">選ぶ</Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProgramCard;