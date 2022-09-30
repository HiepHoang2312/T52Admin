import { Button, Form, Input } from "antd";
import { AppDispatch } from "configStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStore } from "Slices/Store";
import Swal from "sweetalert2";

const AddStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onCreate = (data: any) => {
    const dataForm = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      idMap: data?.idMap,
      address: {
        name: data?.address,
        district: data?.district,
        province: data?.province,
      },
    };

    dispatch(addStore(dataForm))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Thêm thành công`,
          });
          navigate("/admin/store", { replace: true });
        } else {
          Swal.fire({
            title: `Thêm thất bại`,
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-center text-4xl text-red-500 ">Thêm Cửa Hàng</h1>
      <Form {...layout} form={form} onFinish={onCreate}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <Form.Item
            name={"name"}
            label="Tên cửa hàng"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              { required: true, message: "Không được bỏ trống mục này" },
              { type: "email", message: "Không đúng định dạng" },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="Số điện thoại"
            rules={[
              { required: true, message: "Không được bỏ trống mục này" },
              {
                pattern:
                  /^(0?)([1-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{8}$/,
                message: "Không đúng định dạng",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"address"}
            label="Địa chỉ"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"district"}
            label="Quận"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"province"}
            label="Tỉnh/Thành phố"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"idMap"}
            label="Link map"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStore;
