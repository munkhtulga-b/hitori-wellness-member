"use client";

import NavigationBar from "../_components/home/NavigationBar";
import { useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Layout } from "antd";
import { useUserStore } from "../_store/user";
import SideBar from "../_components/home/SideBar";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const { Header, Content, Sider } = Layout;

const UserAuthenticatedLayout = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const clearUser = useUserStore((state) => state.logOut);

  const logOut = () => {
    Cookies.remove("session");
    clearUser();
    router.push("/auth/login");
  };

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="tw-flex tw-flex-col">
      <Layout
        style={{
          minHeight: "100svh",
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
              height: "auto",
              position: "sticky",
              top: 0,
              zIndex: 999,
            }}
          >
            <NavigationBar setCollapsed={setCollapsed} collapsed={collapsed} />
          </Header>
          <Content
            style={{
              padding: "16px",
              overflow: "hidden",
            }}
          >
            {!collapsed && (
              <div
                onClick={() => setCollapsed(true)}
                className="tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-bg-black/20 tw-z-[9999]"
              ></div>
            )}
            <motion.div
              key={pathName}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.5 }}
              className="tw-h-full"
            >
              <Suspense fallback={<></>}>{children}</Suspense>
            </motion.div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserAuthenticatedLayout;
