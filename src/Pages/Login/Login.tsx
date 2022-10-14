import "./index.css";

import { Col, Row } from "antd";

import { AppDispatch } from "configStore";

import { useForm, FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { LoginAction } from "Slices/Login";

import Swal from "sweetalert2";

import Logo from "Assets/image/T52Logo.png";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors }, //liệt kê các input đang lỗi
  } = useForm({
    //defaultValues khai báo giá trị mặc định cho các input trong form
    defaultValues: {
      account: "",
      password: "",
    },
    //mode: cacash validation đc trigger (defaute là submit)
    mode: "onTouched",
  });
  async function onSubmit(values: any) {
    await dispatch(LoginAction(values))
      .unwrap()
      .then((result) => {
        if (result?.admin) {
          localStorage.setItem("user", JSON.stringify(result));
          localStorage.setItem("accessToken", result?.accessToken);
        } else {
          Swal.fire({
            title: `Đăng nhập thất bại`,
          });
        }
      });

    const user: any = JSON.parse(localStorage.getItem("user") as string);

    if (user && user?.admin === true) {
      navigate("/admin", { replace: true });
    } /* else if (user && user.admin === false) {
      localStorage.clear();
      Swal.fire({
        title: `Vui lòng đăng nhập tài khoản Admin`,
        confirmButtonColor: "#fb4226",
        cancelButtonColor: "rgb(167 167 167)",
        confirmButtonText: "OK",
      });
    } */
  }

  const onError = (values: FieldErrors<any>) => {
    console.log(values);
  };

  return (
    <div className="LoginForm w-full h-screen">
      <div className="relative w-full h-screen  ">
        <Row className="absolute w-full top-1/2 -translate-y-1/2">
          <Col xs={2} sm={4} lg={6}></Col>
          <Col xs={20} sm={16} lg={12}>
            <div className=" p-5  rounded-md">
              <form onSubmit={handleSubmit(onSubmit, onError)} className="">
                <h3 className="flex justify-center text-3xl text-amber-500 font-bold">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-20 h-20 bg-red-700 rounded-lg"
                  />
                </h3>
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="account"
                      className="block mb-2 text-xl font-medium text-white dark:text-gray-300"
                    >
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      {...register("account")}
                      id="email"
                      className="bg-transparent text-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-xl font-medium text-white dark:text-gray-300"
                    >
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register("password")}
                      className="bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-500  text-white focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </Col>
          <Col xs={2} sm={4} lg={6}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
