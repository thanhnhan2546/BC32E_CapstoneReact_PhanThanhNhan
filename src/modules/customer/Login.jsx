import { Button, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import LoginIcon from "@mui/icons-material/Login";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../../redux/constants/UserConstants";
import { Link, useNavigate } from "react-router-dom";
import { UserActions } from "../../redux/actions/UserActions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log("userLogin: ", userLogin);
  const [showError, setShowError] = useState(false);
  const [loginFailed, setLoginFailed] = useState();

  const resultLogin = () => {
    if (userLogin.type === LOGIN_SUCCESS) {
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
      userLogin.loaiNguoiDung == "KhachHang" && navigate("/home");
      userLogin.loaiNguoiDung == "QuanTri" && navigate("/admin");
    } else if (userLogin.type === LOGIN_FAILED) {
      setLoginFailed(userLogin.status);
    }
  };

  useEffect(() => {
    resultLogin();
  }, [userLogin]);

  const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("username is required"),
    matKhau: yup.string().required("password is required"),
  });
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(UserActions.login(values));
      resetForm();
    },
    handleBlur: () => {
      console.log("blur");
    },
  });
  return (
    <div className="items-center flex flex-col justify-center space-y-3">
      <h1 className="text-blue-500">Login</h1>

      <div className="w-1/2 ">
        <form className="space-y-3" id="formLogin" onSubmit={handleSubmit}>
          <Input
            name="taiKhoan"
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
            onChange={handleChange}
            value={values.taiKhoan}
          />
          {showError && <p className="text-red-500">{errors.taiKhoan}</p>}
          <Input
            name="matKhau"
            type="password"
            size="large"
            placeholder="password"
            prefix={<KeyOutlined />}
            onChange={handleChange}
            value={values.matKhau}
          />
          {showError && <p className="text-red-500">{errors.matKhau}</p>}
          {showError && <p className="text-red-500">{loginFailed}</p>}
        </form>
      </div>
      <button
        form="formLogin"
        type="submit"
        className="bg-blue-500  hover:!text-blue-500 text-white space-x-2 w-1/3 py-2 rounded-3xl text-lg font-semibold hover:bg-white border hover:!border-blue-500"
        onClick={() => {
          setShowError(true);
        }}
      >
        <span>Login</span>
        <LoginIcon />
      </button>
      <Button type="link" className="!mt-8">
        <span className="text-base">Forgot password ?</span>
      </Button>
      <div className="space-x-4">
        <span className="text-base"> Do not have an account ?</span>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}
