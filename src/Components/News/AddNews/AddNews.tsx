import { useRef, useState } from "react";

import JoditEditor from "jodit-react";
import { Button, Form, Input, Select } from "antd";
import { AppDispatch } from "configStore";
import { useDispatch } from "react-redux";
import { addNews } from "Slices/News";

const { Option } = Select;

const AddNews = () => {
  const dispatch = useDispatch<AppDispatch>();

  const editor = useRef(null);

  const [content, SetContent] = useState("");

  const onCreate = (data: any) => {
    const newsData = {
      ...data,
      descript: content,
      content: content,
    };
    console.log(newsData, "ass");
    dispatch(addNews(newsData));
  };

  const config: any = {
    readonly: false,
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: "http://localhost:8080/upload-images", //your upload api url
      // insertImageAsBase64URI: false,
      // imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      // withCredentials: false,
      // pathVariableName: "path",
      // format: "json",
      // method: "POST",
      // processFileName: (key: any, file: any, name: any) => {
      //   console.log(key, file, name, "");
      //   return [key, file, "some-prefix_" + name];
      // },

      // defaultHandlerSuccess: function (data: any, resp: any) {
      //   console.log(data, resp, 5);
      //   // var i,
      //   //   field = "files";
      //   // if (data[field] && data[field].length) {
      //   //   for (i = 0; i < data[field].length; i += 1) {
      //   //     this.s.insertImage(data.baseurl + data[field][i]);
      //   //   }
      //   // }
      // },
      // filesVariableName: function (t: any) {
      //   console.log(t, "33");
      //   return "img";
      // }, //"files",
      // process: function (resp: any) {
      //   console.log(resp?.files, "22");
      //   return {
      //     files: resp?.files || [],
      //     path: resp?.path,
      //     baseurl: resp?.baseurl,
      //     error: resp?.error,
      //     msg: resp?.msg,
      //   };
      // },

      // isSuccess: function (resp: any) {
      //   console.log(resp, "isSuccess");
      //   return !resp?.error;
      // },
      // getMessage: function (resp: any) {
      //   console.log(resp, "getMessage");
      //   return resp?.msg;
      // },
      // prepareData: function (data: any) {
      //   console.log(data, "prepareData");
      //   data.append("id", 24); //
      // },
      // buildData: function (data: any) {
      //   console.log(data, "buildData");
      //   return { some: "data" };
      // },
      // // data: {
      // //     csrf: document
      // //         .querySelector('meta[name="csrf-token"]')
      // //         .getAttribute('content')
      // // },
      // isSuccess: function (resp: any) {
      //   return !resp.error;
      // },
      // getMessage: function (resp: any) {
      //   return resp.msg;
      // },
      // process: function (resp: any) {
      //   return {
      //     files: resp?.files || [],
      //     path: resp?.path,
      //     baseurl: resp?.baseurl,
      //     error: resp?.error,
      //     msg: resp?.msg,
      //   };
      // },
      // defaultHandlerSuccess: function (data: any, resp: any) {
      //   console.log(data, "defaultHandlerSuccess");
      //   console.log(resp, "defaultHandlerSuccess");
      //   // var i,
      //   //     field = 'files';
      //   // if (data[field] && data[field].length) {
      //   //     for (i = 0; i < data[field].length; i += 1) {
      //   //         this.s.insertImage(data.baseurl + data[field][i]);
      //   //     }
      //   // }
      // },
      // error: function (e: any) {
      //   console.log(e, "error");
      //   // this.e.fire('errorMessage', [e.getMessage(), 'error', 4000]);
      // },
    },
  };

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <h1 className="text-center text-4xl text-red-500 ">Thêm Tin Tức</h1>
      <Form {...layout} form={form} onFinish={onCreate}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <Form.Item
            name={"name"}
            label="Tiêu đề"
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item
            name="type"
            label="Loại Tin"
            hasFeedback
            rules={[{ required: true, message: "Không được bỏ trống mục này" }]}
          >
            <Select>
              <Option value="TinHot">Tin hot</Option>
              <Option value="TinNong">Tin nóng</Option>
            </Select>
          </Form.Item>
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(e) => SetContent(e)}
          onChange={handleChange}
        />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNews;
