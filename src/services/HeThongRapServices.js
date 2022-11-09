import services from "./MethodServices";

export const HeThongRapServices = {
  layThongTinRap: () => {
    return services
      .get("QuanLyRap/LayThongTinHeThongRap")
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },

  layThongTinLichChieuHeThongRap: (id) => {
    return services
      .get(
        `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${id}&maNhom=GP13`
      )
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  },
};
