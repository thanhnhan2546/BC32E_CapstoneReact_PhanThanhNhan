import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { InforCinemaActions } from "../../../redux/actions/InforCinemaActions";
import { Tabs } from "antd";
import CinemaOfSystem from "../CinemaOfSystem/CinemaOfSystem";

export default function MainCinema() {
  const dispatch = useDispatch();
  console.log("first");
  const ref = useRef(null);
  const { listCinema } = useSelector((state) => state.InforCinemaReducer);
  const [idSelected, setIdSelected] = useState();
  const [widthCurrent, setWidthCurrent] = useState(false);

  const callBackId = useCallback(idSelected, [idSelected]);

  useEffect(() => {
    dispatch(InforCinemaActions.getListCinema());
  }, []);
  useEffect(() => {
    setIdSelected(listCinema[0]?.maHeThongRap);
  }, [listCinema, ref]);
  useEffect(() => {
    Number(ref.current?.offsetWidth) <= 936 && setWidthCurrent(true);
    console.log(" ref.current?.offsetWidth : ", ref.current?.offsetWidth);
  }, [ref.current]);

  const handleOnClick = (id) => {
    setIdSelected(id);
  };
  const Label = ({ cine }) => (
    <div
      className=" w-14 hover:bg-gray-200"
      onClick={() => {
        handleOnClick(cine.maHeThongRap);
      }}
    >
      <img src={cine.logo} alt="" />
    </div>
  );
  return (
    <div className="container mx-auto max-w-4xl mb-5 " ref={ref}>
      <Tabs
        tabPosition={widthCurrent ? "top" : "left"}
        items={listCinema.map((cine, i) => {
          const id = String(i + 1);
          return {
            label: <Label cine={cine} />,
            key: id,

            // children: Chilren,
            children: <CinemaOfSystem id={callBackId} />,
          };
        })}
      />
    </div>
  );
}
