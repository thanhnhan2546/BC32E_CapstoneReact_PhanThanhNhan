import {
  GET_CINEMA_OF_SYSTEM,
  GET_INFOR_CINEMA,
  GET_SHOW_TIME_INFOR,
} from "../constants/InforCinemaConstants";

const stateDefault = {
  listCinema: [],
  listCinemaOfSystem: [],
  listShowtimeInfor: [],
};

export const InforCinemaReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case GET_INFOR_CINEMA: {
      state.listCinema = payload;
      return { ...state };
    }

    case GET_SHOW_TIME_INFOR: {
      state.listShowtimeInfor = payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
