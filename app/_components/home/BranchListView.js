import { nullSafety } from "@/app/_utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "antd";
import { useCallback } from "react";
import { usePurchaseStore } from "@/app/_store/purchase";

const BranchListView = ({ list, cardType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  const setPurchaseBody = usePurchaseStore((state) => state.setBody);

  const onSelect = ({ id }) => {
    if (path === "/home/profile/plan/change") {
      return router.push(`${path}?${createQueryString("studioId", id)}`);
    }
    if (!cardType) {
      router.push(`/home/branch/${id}`);
    }
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      {list?.length ? (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <section className="tw-flex tw-justify-start tw-items-center tw-gap-1">
            <span className="tw-text-xxl tw-font-medium">
              {nullSafety(list[0].category_name)}
            </span>
            <span className="tw-text-secondary tw-text-lg tw-leading-7 tw-tracking-[0.16px]">
              {list.length}
            </span>
          </section>
          <section className="tw-flex tw-flex-col tw-gap-4">
            {list.map((branch) => {
              return (
                <div
                  onClick={() => onSelect(branch)}
                  key={branch.id}
                  className="tw-flex tw-flex-col tw-gap-2 tw-p-2 tw-rounded-lg tw-shadow tw-bg-white"
                >
                  <section className="tw-flex tw-justify-start tw-items-start tw-gap-2">
                    <section className="tw-self-stretch tw-rounded-lg tw-min-w-[30%] tw-max-w-[30%] tw-min-h-[155px] tw-max-h-[155px] tw-bg-gray-200 tw-overflow-hidden">
                      {branch.thumbnail_code ? (
                        <Image
                          priority
                          src={`https://${process.env.BASE_IMAGE_URL}${branch.thumbnail_code}`}
                          alt="thumbnail"
                          width={0}
                          height={0}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          unoptimized
                        />
                      ) : null}
                    </section>
                    <section className="tw-flex tw-flex-col">
                      <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                        {nullSafety(branch.name)}
                      </span>
                      <span className="tw-mt-2 tw-text-sm tw-tracking-[0.12px]">
                        {`${nullSafety(branch.address1)} ${nullSafety(
                          branch.address2
                        )} ${nullSafety(branch.address3)}`}
                      </span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: nullSafety(branch.business_hours),
                        }}
                        className="tw-mt-1 tw-whitespace-pre-line tw-line-clamp-3"
                      ></p>
                    </section>
                  </section>
                  {cardType === "purchase" ? (
                    <section>
                      <Button
                        onClick={() => {
                          setPurchaseBody({ branch: branch });
                          setTimeout(() => {
                            router.push(`/home/profile/purchase/plan`);
                          });
                        }}
                        size="small"
                        className="tw-w-full"
                      >
                        選ぶ
                      </Button>
                    </section>
                  ) : null}
                </div>
              );
            })}
          </section>
        </div>
      ) : null}
    </>
  );
};

export default BranchListView;
