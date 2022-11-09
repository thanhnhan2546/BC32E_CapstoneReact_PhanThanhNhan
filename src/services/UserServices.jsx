import services from "./MethodServices";

export const UserServices = {
  Login: (data) => {
    return services
      .postNoneToken("QuanLyNguoiDung/DangNhap", data)
      .then((res) => res)
      .catch((err) => err);
  },
  Register: (data) => {
    return services
      .postNoneToken("QuanLyNguoiDung/DangKy", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
