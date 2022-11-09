import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SubMenu from "antd/lib/menu/SubMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../redux/actions/UserActions";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function AdminLayout() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="logo p-2">
              <img
                src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                alt="..."
              />
            </div>
            <div className="logo" />
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />}>
                Users
              </Menu.Item>

              <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                <Menu.Item
                  key="2"
                  icon={<FileOutlined />}
                  onClick={() => {
                    navigate("/admin/list-films");
                  }}
                >
                  Films
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<FileOutlined />}
                  onClick={() => {
                    navigate("add-film");
                  }}
                >
                  Add new
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="4"
                icon={<LogoutIcon />}
                onClick={() => {
                  dispatch(UserActions.logout());
                  navigate("/home");
                }}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout !bg-gray-200">
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                  backgroundColor: "white",
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
