"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const NavigationBar = ({ setCollapsed, collapsed }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="tw-h-[84px] tw-w-full tw-bg-primary tw-relative">
      <div
        className={`tw-absolute tw-left-4 tw-right-4 tw-bottom-3 tw-flex tw-justify-between tw-items-center`}
      >
        {path !== "/home" ? (
          <Image
            src="/assets/back-arrow-white.svg"
            alt="back"
            width={0}
            height={0}
            onClick={() => router.back()}
            style={{
              cursor: "pointer",
              width: "auto",
              height: "auto",
            }}
          />
        ) : null}
        <Image
          priority
          src="/assets/logo-white.png"
          alt="logo"
          width={158}
          height={24}
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        />
        <Image
          src="/assets/navbar-menu-toggler.svg"
          alt="menu"
          width={0}
          height={0}
          style={{ cursor: "pointer", width: "auto", height: "auto" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
