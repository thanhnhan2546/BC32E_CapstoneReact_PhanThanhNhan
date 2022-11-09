import { QuanLyRapServices } from "../../services/QuanLyRapServices";
import { GET_LIST_BANNER } from "../constants/BannerConstant";

export const BannerActions = {
  getListBanner: () => {
    return async (dispatch) => {
      try {
        const res = await QuanLyRapServices.layDanhSachBanner();

        if (res.status === 200) {
          dispatch({
            type: GET_LIST_BANNER,
            payload: res.data.content,
          });
        }
      } catch (err) {
        throw err;
      }
    };
  },
};
