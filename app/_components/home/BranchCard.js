import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";

const BranchCard = ({ branch }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/home/branch/${branch.id}`)}
      className="tw-p-2 tw-rounded-[16px] tw-shadow tw-w-fit tw-bg-white"
    >
      <div className="tw-flex tw-flex-col tw-gap-2">
        <section
          className={`tw-rounded-xl ${
            !branch.thumbnail_code ? "tw-min-h-[190px]" : ""
          } tw-max-h-[190px] tw-min-w-[220px] tw-max-w-[220px] tw-overflow-hidden tw-bg-gray-200`}
        >
          {branch.thumbnail_code ? (
            <Image
              priority
              src={`https://${process.env.BASE_IMAGE_URL}${branch.thumbnail_code}`}
              alt="thumbnail"
              width={0}
              height={0}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              unoptimized
            />
          ) : null}
        </section>
        <section className="tw-flex tw-flex-col tw-gap-1 tw-max-w-[220px]">
          <span className="tw-text-lg">{nullSafety(branch.name)}</span>
          <div className="tw-flex tw-flex-col tw-gap-[2px]">
            <section className="tw-flex tw-justify-start tw-items-center tw-gap-1">
              <Image
                src="/assets/branch/location-icon.svg"
                alt="location"
                width={20}
                height={20}
              />
              <span className="tw-tracking-[0.14px]">
                {nullSafety(branch.prefecture)}
              </span>
            </section>
            <section>
              <p className="tw-text-sm tw-tracking-[0.12px]">
                {`${nullSafety(branch.address1)} ${nullSafety(
                  branch.address2
                )} ${nullSafety(branch.address3)}`}
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BranchCard;
