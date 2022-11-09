import { Button } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import ListMovie from "../../components/Organisms/ListMovie/ListMovie";
import MainCinema from "../../components/Organisms/MainCinema/MainCinema";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams({
    showing: "dangChieu",
  });
  const showing = searchParams.get("showing");

  return (
    <div className="container">
      <div className="space-x-4">
        <Button
          type={!showing | (showing === "dangChieu") ? "primary" : "dashed"}
          shape="round"
          size="large"
          className="bg"
          onClick={() => {
            setSearchParams({
              showing: "dangChieu",
            });
          }}
        >
          Đang chiếu
        </Button>
        <Button
          type={showing === "sapChieu" ? "primary" : "dashed"}
          shape="round"
          size="large"
          onClick={() => {
            setSearchParams({
              showing: "sapChieu",
            });
          }}
        >
          Sắp chiếu
        </Button>
        <ListMovie showing={showing} />
        <MainCinema />
      </div>
    </div>
  );
}
