import Menus from "@/app/_resources/sidebar-menu.json";
import Image from "next/image";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SideBar = ({ setCollapsed, onLogOut }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleMenuClick = ({ route }) => {
    router.push(route);
    setCollapsed(true);
  };

  const handleLogOut = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onLogOut();
    }, 1000);
  };

  return (
    <>
      <div className="tw-h-full tw-flex tw-flex-col relative">
        <section className="tw-h-[124px] tw-relative">
          <Image
            src="/assets/sidebar/close-icon.svg"
            alt="close"
            width={0}
            height={0}
            style={{
              cursor: "pointer",
              height: "auto",
              width: "auto",
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => setCollapsed(true)}
          />
        </section>
        <section className="tw-grow tw-px-4 tw-flex tw-flex-col tw-justify-between">
          <ul className="tw-flex tw-flex-col tw-gap-5">
            {Menus.main.map((menu) => {
              return (
                <li
                  key={menu.text}
                  className="tw-py-2 tw-flex tw-justify-start tw-items-center tw-gap-4"
                  onClick={() => handleMenuClick(menu)}
                >
                  <Image
                    src={menu.icon}
                    alt={menu.alt}
                    width={0}
                    height={0}
                    style={{ height: "auto", width: "auto" }}
                  />
                  <span className="tw-grow tw-text-lg">{menu.text}</span>
                </li>
              );
            })}
          </ul>
          <Button
            size="large"
            type="primary"
            onClick={handleLogOut}
            className="tw-mb-20"
          >
            <div className="tw-flex tw-justify-between tw-items-center">
              <span className="tw-text-white tw-tracking-[0.14px]">
                ログアウト
              </span>
              {!isLoggingOut ? (
                <Image
                  src="/assets/sidebar/logout-icon.svg"
                  alt="logout"
                  width={0}
                  height={0}
                  style={{ height: "auto", width: "auto" }}
                />
              ) : (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 16,
                        color: "white",
                      }}
                      spin
                    />
                  }
                />
              )}
            </div>
          </Button>
        </section>
      </div>
    </>
  );
};

export default SideBar;
