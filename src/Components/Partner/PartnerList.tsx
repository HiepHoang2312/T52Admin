import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerList } from "Slices/Partner";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Table } from "antd";
const PartnerList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPartnerList());
  }, [dispatch]);

  const { partners } = useSelector((state: RootState) => state.partner);

  console.log(partners);

  const columns: ColumnsType<any> = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "img",

      render: (value, record, index) => (
        <img
          className="mb-2"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "10px",
          }}
          src={value}
          alt={`hình ${index}`}
        />
      ),
    },
  ];

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    /* console.log("params", pagination, filters, sorter, extra); */
  };
  const [q, setQ] = useState("");
  const fSearch = (rows: any[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };
  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={fSearch(partners)}
      onChange={onChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};

export default PartnerList;
