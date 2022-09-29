import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Layout, Menu, Row } from "antd";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const { Header, Sider, Content } = Layout;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem("Store", "sub1", <UserOutlined />, [
    getItem("StoreList", "1", <NavLink to="store"></NavLink>),
  ]),
  getItem("Partner", "sub2", <i className="fa fa-map-marker-alt"></i>, [
    getItem("PartnerList", "3", <NavLink to="Partner"></NavLink>),
  ]),
  getItem("News", "sub3", <i className="fa fa-hotel"></i>, [
    getItem("NewsList", "5", <NavLink to="NewsList"></NavLink>),
    getItem("AddNews", "6", <NavLink to="AddNews"></NavLink>),
  ]),
];

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        /* style={{ background: "white" }} */
      >
        <div className="logo ease-ease-linear "></div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          theme="dark"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background "
          style={{ padding: 0 /* margin: " 5px 5px 18px" */ }}
        >
          <Row justify="space-between">
            <Col>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                },
              )}
            </Col>

            <Col className="mr-4"> </Col>
          </Row>
        </Header>
        <Outlet></Outlet>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
