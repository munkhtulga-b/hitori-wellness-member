"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MainHeader = () => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const onStepBack = () => {
    const step = searchParams.get("step");
    if (step && step > 1) {
      return router.push(path + "?" + createQueryString("step", step - 1));
    }
    router.push("/auth/login");
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
    <div className="tw-h-auto tw-w-full tw-bg-primary tw-relative">
      <div
        className={`tw-p-4 tw-flex ${
          path === "/auth/login" ? "tw-justify-center" : "tw-justify-between"
        } tw-items-center`}
      >
        {path !== "/auth/login" && searchParams.get("step") !== "complete" ? (
          <Image
            src="/assets/back-arrow-white.svg"
            alt="back"
            width={0}
            height={0}
            onClick={() => onStepBack()}
            style={{
              cursor: "pointer",
              width: "auto",
              height: "auto",
            }}
          />
        ) : null}
        <figure className="tw-w-[188px]">
          <Image
            priority
            src="/assets/logo-white.png"
            alt="logo"
            width={0}
            height={0}
            style={{
              cursor: "pointer",
              justifySelf: "center",
              height: "auto",
              width: "100%",
              objectFit: "contain",
            }}
            unoptimized
            onClick={() => router.push("/")}
          />
        </figure>
        {path !== "/auth/login" && (
          <span className="tw-w-[28px] tw-h-[28px]"></span>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
