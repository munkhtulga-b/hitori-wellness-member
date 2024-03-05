"use client";

import Cookies from "js-cookie";
import NavigationBar from "../_components/home/NavigationBar";
import { useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Layout } from "antd";
import { useUserStore } from "../_store/user";
import SideBar from "../_components/home/SideBar";

const { Header, Content, Sider } = Layout;

const UserAuthenticatedLayout = ({ children }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const clearUser = useUserStore((state) => state.logOut);

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      redirect("/auth/login");
    }
    setIsMounted(true);
  }, []);

  const logOut = () => {
    clearUser();
    router.push("/auth/login");
  };

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="tw-flex tw-flex-col">
      {isMounted ? (
        <>
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              collapsedWidth={0}
              trigger={null}
              width={275}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                right: 0,
                zIndex: 10000,
                backgroundColor: "#FFF",
              }}
            >
              <SideBar setCollapsed={setCollapsed} onLogOut={logOut} />
            </Sider>
            <Layout>
              <Header
                style={{
                  padding: 0,
                  height: 84,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 999,
                }}
              >
                <NavigationBar
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                />
              </Header>
              <Content style={{ padding: "16px", marginTop: "84px" }}>
                {!collapsed && (
                  <div
                    onClick={() => setCollapsed(true)}
                    className="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-black/20 tw-z-[9999]"
                  ></div>
                )}
                {children}
              </Content>
            </Layout>
          </Layout>
        </>
      ) : null}
    </div>
  );
};

export default UserAuthenticatedLayout;
