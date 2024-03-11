"use client";

import ProfileMenus from "@/app/_resources/user-profile-menu.json";
import Image from "next/image";
import { useUserStore } from "@/app/_store/user";
import { getFullName } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">プロフィール</span>
        </section>
        {user ? (
          <section className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow">
            <div className="tw-flex tw-justify-start tw-items-center tw-gap-3">
              <section className="tw-bg-gray-200 tw-rounded-full tw-min-w-[60px] tw-max-w-[60px] tw-max-h-[60px] tw-min-h-[60px]"></section>
              <section className="tw-grow tw-flex tw-flex-col tw-gap-1">
                <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                  {getFullName(user.last_name, user.first_name)}
                </span>
                <span className="tw-text-secondary tw-leading-[26px] tw-tracking-[0.16px]">
                  {user?.mail_address?.toLowerCase()}
                </span>
              </section>
              <section>
                <Image
                  src="/assets/profile/arrow-right.svg"
                  alt="go"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </section>
            </div>
          </section>
        ) : null}
        {ProfileMenus ? (
          <>
            {Object.values(ProfileMenus).map((item, idx) => {
              return (
                <section
                  key={idx}
                  className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow"
                >
                  <ul className="tw-flex tw-flex-col tw-gap-[25px]">
                    {item.map((menu) => {
                      return (
                        <li
                          key={menu.text}
                          className="tw-flex tw-justify-start tw-items-center tw-gap-2"
                          onClick={() => router.push(menu.route)}
                        >
                          <Image
                            src={menu.icon}
                            alt={menu.alt}
                            width={0}
                            height={0}
                            style={{ width: "auto", height: "auto" }}
                          />
                          <span className="tw-grow tw-leading-[22px] tw-tracking-[0.14px]">
                            {menu.text}
                          </span>
                          <Image
                            src="/assets/profile/arrow-right.svg"
                            alt="go"
                            width={0}
                            height={0}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserProfile;
