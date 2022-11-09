import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import ShowtimeDetail from "../ShowtimeDetail/ShowtimeDetail";

export default function CardDetail({ movie }) {
  console.log("movie: ", movie);
  const [heThongRap, setHeThongRap] = useState([]);
  const [rapSelected, setRapSelected] = useState();
  const [lichChieu, setLichChieu] = useState([]);
  useEffect(() => {
    setHeThongRap(movie?.heThongRapChieu);
    if (movie.dangChieu) {
      movie.heThongRapChieu.lenght !== 0 &&
        setRapSelected(movie?.heThongRapChieu[0]);
      movie.heThongRapChieu.lenght !== 0 &&
        setLichChieu(movie?.heThongRapChieu[0]?.cumRapChieu);
    }
  }, [movie]);

  return (
    <div className="my-6">
      <div className="flex  space-x-4 mb-6">
        <img src={movie.hinhAnh} alt="" className="w-96 h-[443px]" />
        <div className="space-y-5">
          <h1>{movie.tenPhim}</h1>
          <div className="flex items-center mb-3">
            <h4 className="mr-4">Rate: </h4>
            <StarIcon className="text-yellow-400" />
            <span className="text-lg">{movie.danhGia}/10</span>
          </div>
          <span className="border-b border-b-orange-400 text-2xl font-medium ">
            Mô tả:
          </span>
          <p className="text-lg">{movie.moTa}</p>
        </div>
      </div>
      <div className="w-full border-b-2 border-orange-600 my-4">
        <p className="text-2xl font-medium mb-0">Lịch chiếu</p>
      </div>
      {heThongRap?.length !== 0 && (
        <ShowtimeDetail
          heThongRap={heThongRap}
          setHeThongRap={setHeThongRap}
          rapSelected={rapSelected}
          setRapSelected={setRapSelected}
          lichChieu={lichChieu}
          setLichChieu={setLichChieu}
        />
      )}
    </div>
  );
}
