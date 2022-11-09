import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
} from "../constants/UserConstants";

const stateDefault = {
  userLogin: {
    type: null,
    hoTen: null,
    loaiNguoiDung: null,
    status: "",
  },
  registerStatus: {
    status: null,
    content: null,
  },
};

export const UserReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      let temp = { ...state.userLogin };
      temp = {
        ...temp,
        type: LOGIN_SUCCESS,
        hoTen: payload.hoTen,
        loaiNguoiDung: payload.loaiNguoiDung,
      };
      state.userLogin = temp;

      return { ...state };
    }
    case LOGIN_FAILED: {
      let temp = { ...state.userLogin };
      temp = { ...temp, type: LOGIN_FAILED, status: payload };
      state.userLogin = temp;

      return { ...state };
    }
    case LOGOUT: {
      state.userLogin = stateDefault.userLogin;
      return { ...state };
    }
    case REGISTER: {
      state.registerStatus = {
        status: payload.status,
        content: payload.content,
      };
      return { ...state };
    }
    default:
      return { ...state };
  }
};
