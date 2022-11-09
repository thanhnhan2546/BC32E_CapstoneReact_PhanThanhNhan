import { UserServices } from "../../services/UserServices";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "../constants/UserConstants";

export const UserActions = {
  login: (data) => {
    return async (dispatch) => {
      try {
        const res = await UserServices.Login(data);

        if (res.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              hoTen: res.data.content.hoTen,
              loaiNguoiDung: res.data.content.maLoaiNguoiDung,
            },
          });
          localStorage.setItem("accessToken", res.data.content.accessToken);
        } else {
          dispatch({ type: LOGIN_FAILED, payload: res.response.data.content });
        }
      } catch (err) {
        console.log("err", err);
      }
    };
  },
  logout: () => {
    return (dispatch) => {
      dispatch({
        type: LOGOUT,
      });
      localStorage.removeItem("accessToken");
    };
  },
  register: (data) => {
    return async (dispatch) => {
      try {
        const res = await UserServices.Register(data);
        console.log("res: ", res);

        if (res.status === 200) {
          dispatch({
            type: REGISTER,
            payload: {
              status: REGISTER_SUCCESS,
              content: REGISTER_SUCCESS,
            },
          });
        } else {
          dispatch({
            type: REGISTER,
            payload: {
              status: REGISTER_FAILED,
              content: res.response.data.content,
            },
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    };
  },
  resetRegister: () => {
    return (dispatch) => {
      dispatch({
        type: REGISTER,
        payload: {
          status: REGISTER_FAILED,
          content: "",
        },
      });
    };
  },
};
