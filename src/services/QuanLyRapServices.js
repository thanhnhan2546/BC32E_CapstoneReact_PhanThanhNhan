import axios from "axios";
import { DOMAIN, tokenCyberSoft } from "../utils/api";
import services, { MethodSevices } from "./MethodServices";

export const QuanLyRapServices = {
  layDanhSachBanner: () => {
    return services
      .get("QuanLyPhim/LayDanhSachBanner")
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  layDanhSachPhim: () => {
    return services
      .get("QuanLyPhim/LayDanhSachPhim?maNhom=GP13")
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  layThongTinLichChieu: (id) => {
    return services
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  layDanhSachPhimPhanTrang: (page) => {
    return services
      .get(
        `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP13&soTrang=${page}&soPhanTuTrenTrang=10`
      )
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  xoaPhim: (maPhim) => {
    return services
      .delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  themPhim: (data) => {
    return services
      .postNoneToken("QuanLyPhim/ThemPhimUploadHinh", data)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
  capNhatPhim: (data) => {
    return services
      .postToken("QuanLyPhim/CapNhatPhimUpload", data)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
};
