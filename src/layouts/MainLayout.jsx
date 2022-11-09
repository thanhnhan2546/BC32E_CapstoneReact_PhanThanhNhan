import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Molecules/header";
import { Footer } from "../components/Molecules/footer";
import Banner from "../components/Organisms/banner/Banner";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
