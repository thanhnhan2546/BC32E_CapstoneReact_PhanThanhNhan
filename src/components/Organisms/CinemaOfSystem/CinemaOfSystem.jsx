import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InforCinemaActions } from "../../../redux/actions/InforCinemaActions";
import MovieOfCinema from "../MovieOfCinema/MovieOfCinema";
import "./CinemaOfSystemStyle.css";

export default function CinemaOfSystem({ id }) {
  console.log("id: ", id);
  const [lstCumRap, setLstCumRap] = useState([]);
  //   console.log("lstCumRap: ", lstCumRap);
  const dispatch = useDispatch();
  const [cumRap, setCumRap] = useState();
  //   console.log("cumRap: ", cumRap);

  const { listShowtimeInfor } = useSelector(
    (state) => state.InforCinemaReducer
  );

  useEffect(() => {
    dispatch(InforCinemaActions.getShowtimeInfor(id));
  }, []);
  useEffect(() => {
    dispatch(InforCinemaActions.getShowtimeInfor(id));
  }, [id]);
  useEffect(() => {
    setLstCumRap(listShowtimeInfor[0]?.lstCumRap);
    setCumRap(listShowtimeInfor[0]?.lstCumRap[0]);
  }, [listShowtimeInfor]);
  const Label = ({ cine }) => (
    <>
      <div
        className="flex space-x-2 lg:w-[400px]  hover:bg-gray-200 items-center    "
        onClick={() => {
          // filterLstCumRap(cine.maCumRap);
          setCumRap(cine);
        }}
      >
        <img src={cine.hinhAnh} className="w-14" alt="" />
        <p className="flex flex-col text-lg whitespace-normal w-1/2 ">
          {cine.tenCumRap}
        </p>
      </div>
    </>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="max-h-screen scrollbar overflow-y-scroll">
          <Tabs
            tabPosition={"left"}
            items={lstCumRap?.map((cine, i) => {
              const id = String(i + 1);
              return {
                label: <Label cine={cine} />,
                key: id,
                // children: <MovieOfCinema dsPhim={cine.danhSachPhim} />,
              };
            })}
          />
        </div>
        {/* <MovieOfCinema dsPhim={lstCumRap[0]?.danhSachPhim} /> */}
        {cumRap && <MovieOfCinema rap={cumRap} />}
      </div>
    </>
  );
}
