import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardMovieAtHome({ item }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const handlFocus = () => {
    setHover(true);
  };
  const handleBlur = () => {
    setHover(false);
  };
  return (
    <>
      <div
        className="2xl:max-w-xs max-w-[200px]  rounded-md   text-gray-50 hover:scale-105"
        onMouseEnter={handlFocus}
        onMouseLeave={handleBlur}
      >
        <div className="relative">
          <img
            src={item.hinhAnh}
            alt=""
            className="object-cover object-center md:w-[288px] w-32 h-36 rounded-md md:h-72  "
          />

          {hover && (
            <div className="w-full h-full bg-[#000000c2] absolute top-0 flex items-center justify-center space-x-2">
              <button
                className="rounded border border-orange-500 hover:bg-orange-500 p-3"
                onClick={() => {
                  navigate("/booking");
                }}
              >
                Đặt vé
              </button>
              <button
                className="rounded border border-yellow-400 hover:bg-yellow-400 p-3"
                onClick={() => {
                  navigate(`/detail/${item.maPhim}`);
                }}
              >
                Chi tiết
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 mb-2 px-3">
          <h2 className="text-sm font-medium tracking-widest uppercase text-violet-400">
            {item.tenPhim}
          </h2>
        </div>
      </div>
    </>
  );
}
