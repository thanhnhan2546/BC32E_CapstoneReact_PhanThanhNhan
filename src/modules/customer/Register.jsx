import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useNavigate } from "react-router-dom";
import { UserActions } from "../../redux/actions/UserActions";
import { REGISTER_SUCCESS } from "../../redux/constants/UserConstants";
import { NHOM } from "../../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registerStatus } = useSelector((state) => state.UserReducer);
  console.log("registerStatus: ", registerStatus);
  const [showError, setShowError] = useState(false);
  const [registerFailed, setRegisterFailed] = useState();
  console.log("registerFailed: ", registerFailed);

  const resultRegister = () => {
    if (registerStatus.status === REGISTER_SUCCESS) {
      Swal.fire({
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(UserActions.resetRegister());
      navigate("/login");
    } else {
      setRegisterFailed(registerStatus.content);
    }
  };

  useEffect(() => {
    resultRegister();
  }, [registerStatus]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = yup.object().shape({
    taiKhoan: yup.string().required("username is required"),
    matKhau: yup.string().required("password is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    soDt: yup
      .string()
      .matches(phoneRegExp, "phone is invalid")
      .required("phone is required"),
    hoTen: yup
      .string()
      .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, "name is invalid")
      .required("name is requred"),
  });
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: NHOM,
    },

    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(UserActions.register(values));
      resetForm();
    },
  });
  return (
    <div className="items-center flex flex-col justify-center space-y-3">
      <h1 className="text-blue-500">Register</h1>

      <div className="w-1/2 ">
        <form className="space-y-3" id="formRegister" onSubmit={handleSubmit}>
          <Input
            name="taiKhoan"
            size="large"
            placeholder="username"
            prefix={<PersonIcon />}
            onChange={handleChange}
            value={values.taiKhoan}
          />
          {showError && <p className="text-red-500">{errors.taiKhoan}</p>}
          <Input
            name="matKhau"
            type="password"
            size="large"
            placeholder="password"
            prefix={<LockIcon />}
            onChange={handleChange}
            value={values.matKhau}
          />
          {showError && <p className="text-red-500">{errors.matKhau}</p>}
          <Input
            name="email"
            size="large"
            placeholder="email"
            prefix={<EmailIcon />}
            onChange={handleChange}
            value={values.email}
          />
          {showError && <p className="text-red-500">{errors.email}</p>}
          <Input
            name="soDt"
            size="large"
            placeholder="phone"
            prefix={<PhoneIphoneIcon />}
            onChange={handleChange}
            value={values.soDt}
          />
          {showError && <p className="text-red-500">{errors.soDt}</p>}
          <Input
            name="hoTen"
            size="large"
            placeholder="full name"
            prefix={<AccountBoxIcon />}
            onChange={handleChange}
            value={values.hoTen}
          />
          {showError && <p className="text-red-500">{errors.hoTen}</p>}
          {showError && <p className="text-red-500">{registerFailed}</p>}
        </form>
      </div>

      <button
        form="formRegister"
        type="submit"
        className="bg-blue-500  hover:!text-blue-500 text-white space-x-2 w-1/3 py-2 rounded-3xl text-lg font-semibold hover:bg-white border hover:!border-blue-500"
        onClick={() => {
          setShowError(true);
        }}
      >
        <span>Register</span>
        <AddCardIcon />
      </button>
    </div>
  );
}
