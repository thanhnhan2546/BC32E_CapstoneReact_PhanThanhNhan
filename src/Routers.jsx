import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import ListPhimAdminPage from "./pages/ListPhimAdminPage";
import LoginPage from "./pages/LoginPage";
import MethodFilmPage from "./pages/MethodFilmPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

export const routers = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        id: "index",
        path: "/",
        element: <Navigate to="home" />,
      },
      {
        id: "home",
        path: "home",
        element: <HomePage />,
      },
      {
        id: "detail",
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "",
    element: <LoginLayout />,
    children: [
      {
        id: "login",
        path: "login",
        element: <LoginPage />,
      },
      {
        id: "register",
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        id: "listFilms",
        path: "list-films",
        element: <ListPhimAdminPage />,
      },
      {
        id: "add",
        path: "add-film",
        element: <MethodFilmPage />,
      },
      {
        id: "update",
        path: "update-film/:id",
        element: <MethodFilmPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routers);
const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
