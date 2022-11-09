import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardDetail from "../../components/Organisms/CardDetail/CardDetail";
import { ListPhimActions } from "../../redux/actions/ListPhimActions";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailPhim } = useSelector((state) => state.ListPhimReducer);
  useEffect(() => {
    dispatch(ListPhimActions.getDetailPhim(id));
  }, []);
  return (
    <div className="container">
      <CardDetail movie={detailPhim} />
    </div>
  );
}
