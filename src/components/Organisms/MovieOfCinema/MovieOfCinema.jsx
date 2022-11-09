import { Button, Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { fDate, fTime } from "../../../utils/formatTime";

export default function MovieOfCinema({ rap }) {
  console.log("rap: ", rap);
  const [listPhim, setListPhim] = useState([]);
  const [hove, setHover] = useState(false);
  //   console.log("listPhim: ", listPhim);
  useEffect(() => {
    setListPhim(rap.danhSachPhim.filter((phim) => phim.dangChieu));
  }, []);

  const shortByHot = listPhim.sort((prev, nex) => {
    if (prev.hot) {
      return -1;
    }
  });

  return (
    <div className="max-h-screen scrollbar overflow-y-scroll space-y-4 ">
      {shortByHot.map((phim, index) => (
        <div key={index}>
          <div
            className="flex space-x-4 hover:bg-gray-200 cursor-pointer relative"
            onMouseOver={() => {
              setHover(true);
            }}
          >
            <img
              src={phim.hinhAnh}
              className="w-[150px] h-[225px]"
              alt="hinhanh"
            />
            <div className="grid grid-cols-6 grid-rows-6 row-  w-full">
              <h3 className="col-span-6 text-2xl">{phim.tenPhim}</h3>

              {phim.lstLichChieuTheoPhim.map((lich, i) => (
                <div className="col-span-1 row-span-1" key={i}>
                  <button className="border border-orange-400 p-2 rounded hover:bg-orange-400 hover:text-white">
                    {fTime(lich.ngayChieuGioChieu)}
                  </button>
                </div>
              ))}
            </div>
            {phim.hot && (
              <div className="  absolute ">
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/tool-icon-library/hot-15.png"
                  className="w-10"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
