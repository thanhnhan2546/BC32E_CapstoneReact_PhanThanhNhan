import React, { useEffect, useState } from "react";
import { fDate, fDay, fTime } from "../../../utils/formatTime";

export default function ShowtimeDetail(props) {
  const {
    heThongRap,
    setHeThongRap,
    rapSelected,
    setRapSelected,
    lichChieu,
    setLichChieu,
  } = props;

  const [ngayChieu, setNgayChieu] = useState([]);
  //   console.log("heThongRap: ", rapSelected);
  console.log("lichChieu: ", lichChieu);
  const [cumSelected, setCumSelected] = useState();
  console.log("cumSelected: ", cumSelected?.lichChieuPhim);

  const uniqueNgayChieu = new Set(
    cumSelected?.lichChieuPhim.map((lich) => fDate(lich.ngayChieuGioChieu))
  );

  useEffect(() => {
    setNgayChieu(Array.from(uniqueNgayChieu));
  }, [cumSelected]);
  useEffect(() => {
    lichChieu && setCumSelected(lichChieu[0]);
  }, [lichChieu]);
  return (
    <>
      <div className="grid grid-cols-10">
        <div className="">
          {heThongRap?.map((rap, index) => {
            const active =
              rap?.maHeThongRap === rapSelected?.maHeThongRap
                ? "border-r-blue-500"
                : "";
            return (
              <div key={index} className={`border-r-4 py-3 ${active}`}>
                <button
                  className="w-2/3"
                  onClick={() => {
                    setRapSelected(rap);
                    setLichChieu(rap.cumRapChieu);
                  }}
                >
                  <img src={rap.logo} alt="" className="w-full" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="col-span-3 ">
          {lichChieu.map((item, index) => {
            const active =
              cumSelected?.tenCumRap === item?.tenCumRap
                ? " border-r-blue-500"
                : "";
            return (
              <div
                key={index}
                className={`flex items-center border-r-4  px-2 pb-3 ${active} hover:bg-gray-200`}
              >
                <button
                  className="flex items-center space-x-2 "
                  onClick={() => {
                    setCumSelected(item);
                  }}
                >
                  <img src={item.hinhAnh} alt="" className="w-1/4" />
                  <p className="text-left">{item.tenCumRap}</p>
                </button>
              </div>
            );
          })}
        </div>
        <div className="col-span-6 px-3 space-y-5 ">
          {ngayChieu.map((ngay) => (
            <div>
              <div className=" w-max  bg-orange-500  px-7  rounded-t-lg text-white">
                <p className="m-0">{ngay}</p>
              </div>
              <div className="  !border-orange-500 border-2 px-7 py-2 rounded-r-md rounded-b-md grid grid-cols-7 gap-2 w-full ">
                {cumSelected?.lichChieuPhim
                  .filter((item) => fDate(item.ngayChieuGioChieu) === ngay)
                  .map((time) => (
                    <button className="p-1  hover:!border-orange-400 border-2 hover:text-orange-400">
                      {fTime(time.ngayChieuGioChieu)}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
