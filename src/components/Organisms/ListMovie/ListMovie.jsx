import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListPhimActions } from "../../../redux/actions/ListPhimActions";
import Slider from "react-slick";
import "./styleContent.css";
import CardMovieAtHome from "../../Molecules/CardMovieAtHome/CardMovieAtHome";

export default function ListMovie({ showing }) {
  const dispatch = useDispatch();
  const { listPhim } = useSelector((state) => state.ListPhimReducer);
  const [widthCurrent, setWidthCurrent] = useState(4);

  const [listPhimFilter, setListPhimFilter] = useState([]);
  const ref = useRef(null);
  const getListPhim = () => {
    setListPhimFilter(listPhim.filter((phim) => phim[showing]));
  };
  useEffect(() => {
    dispatch(ListPhimActions.getListPhim());
  }, []);
  useEffect(() => {
    Number(ref.current?.offsetWidth) <= 936 && setWidthCurrent(3);
    Number(ref.current?.offsetWidth) <= 576 && setWidthCurrent(2);
    console.log(" ref.current?.offsetWidth asfds: ", ref.current?.offsetWidth);
  }, [ref.current]);
  useEffect(() => {
    getListPhim();
  }, [listPhim, showing]);
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    className: "center rounded p-3",
    infinite: true,
    speed: 500,
    slidesToShow: widthCurrent,
    slidesToScroll: widthCurrent,
    rows: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const styleTab = {
    display: "flex !important",
    justifyContent: "center",
  };
  return (
    <div className="my-3 " ref={ref}>
      <Slider {...settings}>
        {listPhimFilter.map((item) => (
          <div className="oneTab md:mb-3  md:h-[350px] h-64" key={item.maPhim}>
            <CardMovieAtHome item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
