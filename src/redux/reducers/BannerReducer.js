import { GET_LIST_BANNER } from "../constants/BannerConstant";

const stateDefault = {
  listBanner: [],
};

export const BannerReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case GET_LIST_BANNER: {
      state.listBanner = payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
