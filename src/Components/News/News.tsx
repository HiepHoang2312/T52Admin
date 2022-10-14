import { Button, Table, Form, Input, Modal, Row, Col } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewsList } from "Slices/News";

import JoditEditor from "jodit-react";

const { TextArea } = Input;

const { Search } = Input;

const News = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [q, setQ] = useState("");

  const [content, SetContent] = useState("");

  const config: any = {
    readonly: false,
  };

  const editor = useRef(null);

  const [editFormValue, SetEditFormValue] = useState<any>();

  const [open, setOpen] = useState(false);

  const fSearch = (rows: any[]) => {
    return rows?.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };

  useEffect(() => {
    dispatch(getNewsList());
  }, [dispatch]);

  const { newsList } = useSelector((state: RootState) => state.news);

  const columns: ColumnsType<any> = [
    {
      title: "Tiêu đề",
      dataIndex: "name",
    },

    {
      title: "Hình Ảnh",
      dataIndex: "avatar",
      width: 200,
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

    {
      title: "Người đăng",
      dataIndex: "personPost",
      render: (value, record, index) => <div>{value?.name}</div>,
    },

    { title: "Loại tin", dataIndex: "newsType" },

    {
      title: "ACTION",
      render: (value, record, index) => (
        <div>
          <Button
            block
            onClick={() => {
              setOpen(true);
              SetEditFormValue(record);
              SetContent(value.descript);
            }}
            className="mb-2"
          >
            Chi tiết
          </Button>
          <Button block danger>
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

  interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
  }

  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    if (editFormValue) {
      form.setFieldsValue({
        name: editFormValue?.name,
        descript: editFormValue?.descript,
        _id: editFormValue?._id,
        avatar: editFormValue?.avatar,
        personPost: editFormValue?.personPost?.name,
        newsType: editFormValue?.newsType,
      });
    }
    return (
      <Modal
        open={open}
        title="Chi tiết tin"
        okText="Sửa"
        cancelText="Đóng"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="name"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="descript" label="Nội dung">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(e) => SetContent(e)}
            />
          </Form.Item>
          <Form.Item name="personPost" label="Người đăng">
            <Input disabled />
          </Form.Item>
          <Form.Item name="newsType" label="Loại tin">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
    SetEditFormValue(undefined);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl text-red-500">
        Danh Sách Tin Tức
      </h1>
      <Row>
        <Col lg={{ span: 6 }} md={{ span: 8 }}>
          <Search
            className="mb-2 text-red"
            placeholder="Tìm theo tiêu đề"
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={fSearch(newsList)}
        onChange={onChange}
        scroll={{ x: 800 }}
        bordered
      />
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
          SetEditFormValue(undefined);
        }}
      />
    </div>
  );
};

export default News;
