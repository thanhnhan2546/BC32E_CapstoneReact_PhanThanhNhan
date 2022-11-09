import React from "react";
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="grid grid-cols-2">
      <Outlet />
      <img
        src="https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk="
        alt=""
        className="w-full h-screen"
      />
    </div>
  );
}
