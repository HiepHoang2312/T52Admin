import { Button, Col, Input, Row, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addStoreDetail, deleteStore, getStoreList } from "Slices/Store";
import Swal from "sweetalert2";

const { Search } = Input;

const StoreList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getStoreList());
  }, [dispatch]);

  const { stores } = useSelector((state: RootState) => state.storeSlice);

  const getDetail = (detailStore: any) => {
    dispatch(addStoreDetail(detailStore));
  };

  const onDelete = (id: string) => {
    dispatch(deleteStore(id))
      .unwrap()
      .then((result) => {
        if (result) {
          Swal.fire({
            title: `Xóa thành công`,
          });
          dispatch(getStoreList());
        } else {
          Swal.fire({
            title: `Xóa thất bại`,
          });
        }
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Tên Cửa Hàng",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 200,
      render: (value) => <div>0{value}</div>,
    },
    {
      title: "Địa Chỉ",
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
    {
      title: "ACTION",
      render: (value, record, index) => (
        <div>
          <Button block className="mb-2" onClick={() => getDetail(record)}>
            <NavLink to="storeDetail">Chi tiết</NavLink>
          </Button>
          <Button
            block
            danger
            onClick={() => {
              Swal.fire({
                title: `Bạn muốn xóa cửa hàng`,
                text: value.name,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  onDelete(value._id);
                }
              });
            }}
          >
            Xóa
          </Button>
        </div>
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

  const fSearch = (rows: any[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl text-red-500">
        Danh Sách Cửa Hàng
      </h1>
      <Row>
        <Col lg={{ span: 6 }} md={{ span: 8 }} className="mb-2">
          <div className="flex-row md:flex">
            <Search
              className="mb-2 mr-2"
              placeholder="Tìm theo tên cửa hàng"
              onChange={handleSearch}
            />
            <Button>
              <NavLink to={"addStore"}>Thêm</NavLink>
            </Button>
          </div>
        </Col>
      </Row>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={fSearch(stores)}
        onChange={onChange}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
};

export default StoreList;
