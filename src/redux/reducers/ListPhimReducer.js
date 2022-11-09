import {
  DELETE_MOVIE,
  GET_LIST_MOVIE,
  GET_LIST_MOVIE_PAGINATION,
  GET_ONE_MOVIE,
} from "../constants/ListPhimConstant";

const stateDefault = {
  listPhim: [],
  detailPhim: {},
  listPhimPagination: [],
  total: 0,
};

export const ListPhimReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case GET_LIST_MOVIE: {
      state.listPhim = payload;
      return { ...state };
    }
    case GET_ONE_MOVIE: {
      state.detailPhim = payload;
      return { ...state };
    }
    case GET_LIST_MOVIE_PAGINATION: {
      state.listPhimPagination = payload.items;
      state.total = payload.total;
      return { ...state };
    }
    case DELETE_MOVIE: {
      let temp = [
        ...state.listPhimPagination.filter((item) => item?.maPhim !== payload),
      ];
      state.listPhimPagination = temp;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
