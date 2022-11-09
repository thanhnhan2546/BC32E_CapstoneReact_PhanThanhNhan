import { QuanLyRapServices } from "../../services/QuanLyRapServices";
import {
  DELETE_MOVIE,
  GET_LIST_MOVIE,
  GET_LIST_MOVIE_PAGINATION,
  GET_ONE_MOVIE,
} from "../constants/ListPhimConstant";

export const ListPhimActions = {
  getListPhim: () => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.layDanhSachPhim();

        if (res.status === 200) {
          dispatch({
            type: GET_LIST_MOVIE,
            payload: res.data.content,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
  getDetailPhim: (id) => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.layThongTinLichChieu(id);

        if (res.status === 200) {
          dispatch({
            type: GET_ONE_MOVIE,
            payload: res.data.content,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
  getPhimPagination: (page) => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.layDanhSachPhimPhanTrang(page);

        if (res.status === 200) {
          console.log(res);
          dispatch({
            type: GET_LIST_MOVIE_PAGINATION,
            payload: {
              items: res.data.content.items,
              total: res.data.content.totalCount,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
  addPhim: (data) => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.themPhim(data);

        if (res.status === 200) {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
  deletePhim: (maPhim, page) => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.xoaPhim(maPhim);

        if (res.status === 200) {
          console.log(res);
          dispatch(ListPhimActions.getPhimPagination(page));
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
  updatePhim: (data) => {
    console.log("data: ", data);

    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.capNhatPhim(data);
        console.log("res: ", res);
        if (res.status === 200) {
          console.log(res);
          dispatch(ListPhimActions.getPhimPagination(1));
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
};
