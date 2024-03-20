import Image from "next/image";
import { nullSafety } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { usePurchaseStore } from "@/app/_store/purchase";

const PurchaseBranchCard = ({ branch }) => {
  const router = useRouter();
  const setBranch = usePurchaseStore((state) => state.setBody);

  const onSelect = () => {
    setBranch({ branch: branch });
    router.push("/home/profile/purchase/plan");
  };

  return (
    <div className="tw-p-2 tw-rounded-[16px] tw-shadow tw-w-fit tw-bg-white">
      <div className="tw-flex tw-flex-col tw-gap-2 tw-h-full">
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
            <section>
              <a
                href={branch.gmap_url ? branch.gmap_url : "#"}
                target="_blank"
                rel="noreferrer"
                className="tw-flex tw-justify-start tw-items-center tw-gap-1 tw-text-current"
              >
                <Image
                  src="/assets/branch/location-icon.svg"
                  alt="location"
                  width={20}
                  height={20}
                />
                <span className="tw-tracking-[0.14px]">
                  {nullSafety(branch.prefecture)}
                </span>
              </a>
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
        <section className="tw-grow tw-flex tw-items-end">
          <Button size="small" className="tw-w-full" onClick={() => onSelect()}>
            選ぶ
          </Button>
        </section>
      </div>
    </div>
  );
};

export default PurchaseBranchCard;
