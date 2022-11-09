import { HeThongRapServices } from "../../services/HeThongRapServices";
import {
  GET_CINEMA_OF_SYSTEM,
  GET_INFOR_CINEMA,
  GET_SHOW_TIME_INFOR,
} from "../constants/InforCinemaConstants";

export const InforCinemaActions = {
  getListCinema: () => {
    return async (dispatch) => {
      try {
        const res = await HeThongRapServices.layThongTinRap();

        res.status === 200 &&
          dispatch({
            type: GET_INFOR_CINEMA,
            payload: res.data.content,
          });
      } catch (err) {
        throw err;
      }
    };
  },

  getShowtimeInfor: (id) => {
    return async (dispatch) => {
      try {
        const res = await HeThongRapServices.layThongTinLichChieuHeThongRap(id);

        res.status === 200 &&
          dispatch({
            type: GET_SHOW_TIME_INFOR,
            payload: res.data.content,
          });
      } catch (err) {
        throw err;
      }
    };
  },
};
