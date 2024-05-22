import { useRouter } from "next/navigation";
import { nullSafety } from "@/app/_utils/helpers";
import Image from "next/image";

const ProgramListView = ({ list }) => {
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <section>
          <span className="tw-text-lg tw-leading-[26px]">
            {`${nullSafety(list[0].service_minutes)}分`}
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-4">
          {list.map((program) => {
            return (
              <div
                onClick={() => router.push(`/home/program/${program.id}`)}
                key={program.id}
                className="tw-bg-white tw-flex tw-justify-start tw-items-start tw-gap-2 tw-p-2 tw-rounded-lg tw-shadow"
              >
                <section className="tw-self-stretch tw-rounded-lg tw-min-w-[30%] tw-max-w-[30%] tw-min-h-[155px] tw-max-h-[155px] tw-bg-gray-200 tw-overflow-hidden">
                  {program.thumbnail_code ? (
                    <Image
                      priority
                      src={`https://${process.env.BASE_IMAGE_URL}${program.thumbnail_code}`}
                      alt="thumbnail"
                      width={0}
                      height={0}
                      style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "100%",
                      }}
                      unoptimized
                    />
                  ) : null}
                </section>
                <section className="tw-flex tw-flex-col">
                  <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                    {nullSafety(program.name)}
                  </span>
                  <p
                    dangerouslySetInnerHTML={{ __html: program.description }}
                    className="tw-mt-2 tw-text-sm tw-tracking-[0.12px] tw-line-clamp-5 tw-whitespace-pre-wrap"
                  ></p>
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default ProgramListView;
