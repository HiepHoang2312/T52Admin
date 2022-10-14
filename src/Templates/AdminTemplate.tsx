import React, { useState } from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShopOutlined,
  AliwangwangOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Col, Layout, Menu, Row } from "antd";
import type { MenuProps } from "antd";

import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import logo from "Assets/image/T52Logo.png";

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
  getItem("Store", "sub1", <ShopOutlined />, [
    getItem(
      "StoreList",
      "1",
      <div>
        <NavLink to="store"></NavLink>
      </div>,
    ),
  ]),
  getItem("Client", "sub2", <UserOutlined />, [
    getItem(
      "ClientList",
      "2",
      <div>
        <NavLink to="client" />
      </div>,
    ),
  ]),
  getItem("Partner", "sub3", <ApartmentOutlined />, [
    getItem(
      "PartnerList",
      "3",
      <div>
        <NavLink to="Partner"></NavLink>
      </div>,
    ),
  ]),
  getItem("News", "sub4", <AliwangwangOutlined />, [
    getItem(
      "NewsList",
      "5",
      <div>
        <NavLink to="NewsList"></NavLink>
      </div>,
    ),
    getItem(
      "AddNews",
      "6",
      <div>
        <NavLink to="NewsList/addNews"></NavLink>
      </div>,
    ),
  ]),
];

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="flex justify-center bg-red-500 rounded-sm shadow-lg  ">
          <img src={logo} alt="logo" className="w-16 h-16  " />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          theme="light"
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
