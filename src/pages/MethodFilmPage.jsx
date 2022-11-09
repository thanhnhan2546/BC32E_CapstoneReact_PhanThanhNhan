import React from "react";
import { useLocation, useParams } from "react-router-dom";
import MethodFilm from "../modules/admin/MethodFilm";

export default function MethodFilmPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const create = pathname.includes("add");
  const update = pathname.includes("update");
  return <MethodFilm id={id} method={create ? "create" : "update"} />;
}
