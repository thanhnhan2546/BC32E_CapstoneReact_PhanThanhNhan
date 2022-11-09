import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserActions } from "../../../redux/actions/UserActions";
import Swal from "sweetalert2";

export default function Header() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.UserReducer);
  const [hoTen, setHoTen] = useState(userLogin.hoTen);
  useEffect(() => {
    !userLogin.hoTen && setHoTen(null);
  }, [userLogin]);
  const navigate = useNavigate();
  return (
    <>
      <header className="px-4 bg-opacity-40 bg-gray-600 text-white  fixed w-full z-10">
        <div className="container flex justify-between h-16 mx-auto">
          <Link to="/home">
            <img
              src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png"
              className="max-w-[200px]"
              alt=""
            />
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link className="flex items-center text-lg" to="/home">
                Home
              </Link>
            </li>
            <li className="flex">
              <Link className="flex items-center text-lg" to="/home">
                Home
              </Link>
            </li>
            <li className="flex">
              <Link className="flex items-center text-lg" to="/home">
                Home
              </Link>
            </li>
          </ul>
          {hoTen ? (
            <div className="items-center flex-shrink-0 hidden lg:flex">
              <button className="self-center  py-3 rounded">
                <span>hello </span>
                <span className="text-yellow-500">{userLogin.hoTen}</span>
              </button>
              <button
                className="self-center px-8 py-3 rounded"
                onClick={async () => {
                  await dispatch(UserActions.logout());
                  Swal.fire({
                    icon: "success",
                    title: "Logout Success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="items-center flex-shrink-0 hidden lg:flex">
              <button
                className="self-center px-8 py-3 rounded"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </button>
              <button
                className="self-center px-8 py-3 rounded"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign up
              </button>
            </div>
          )}
          <button className="p-4  lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
