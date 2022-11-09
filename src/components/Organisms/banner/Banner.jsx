import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick/lib/slider";
import { BannerActions } from "../../../redux/actions/BannerActions";
import "./styleBanner.css";
export default function Banner() {
  const dispatch = useDispatch();

  const { listBanner } = useSelector((state) => state.BannerReducer);
  useEffect(() => {
    dispatch(BannerActions.getListBanner());
  }, []);
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",

          zIndex: 10,
          right: 10,
        }}
        onClick={onClick}
      />
    );
  };
  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          display: "block",
          position: "absolute",

          zIndex: 10,
          left: 10,
        }}
        onClick={onClick}
      />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: 10 }}>
        <ul style={{ margin: "0px", color: "red" }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <div>
      <Slider {...settings}>
        {listBanner.map((banner) => (
          <div key={banner.maBanner}>
            <div className="w-screen bg-black md:h-[700px] absolute bg-opacity-10"></div>
            <img
              src={banner.hinhAnh}
              alt=""
              className="w-full lg:h-[700px] md:h-[500px] h-[200px] "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
