import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoreList } from "Slices/Store";

const StoreList = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  const { stores } = useSelector((state: RootState) => state.storeSlice);

  const columns: ColumnsType<any> = [
    {
      title: "name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "phone",
      dataIndex: "phone",
      width: 200,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (value, record, index) => {
        return <div>{value.name}</div>;
      },
    },
    {
      title: "Tỉnh",
      dataIndex: "address",
      render: (value, record, index) => {
        return <div>{value.district}</div>;
      },
    },
    {
      title: "Tp",
      dataIndex: "address",
      render: (value, record, index) => {
        return <div>{value.province}</div>;
      },
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
      dataSource={fSearch(stores)}
      onChange={onChange}
      scroll={{ x: 800 }}
      bordered
    />
  );
};

export default StoreList;
