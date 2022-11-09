import React from "react";
import { useNavigate } from "react-router-dom";
import ListPhim from "../modules/admin/ListPhim";

export default function ListPhimAdminPage() {
  const navigate = useNavigate();
  return (
    <>
      <ListPhim />
    </>
  );
}
