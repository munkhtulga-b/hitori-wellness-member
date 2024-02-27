"use client";

import Cookies from "js-cookie";
import NavigationBar from "../_components/home/NavigationBar";
import { useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Layout } from "antd";

const { Header, Content, Sider } = Layout;

const UserAuthenticatedLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      redirect("/auth/login");
    }
    setIsMounted(true);
  }, []);

  const [collapsed, setCollapsed] = useState(false);

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
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 1000,
              }}
            >
              Sidebar
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
