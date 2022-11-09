import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ListPhimActions } from "../../redux/actions/ListPhimActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Auth } from "../../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ListPhim() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listPhimPagination, total } = useSelector(
    (state) => state.ListPhimReducer
  );
  const [pageSelected, setPageSelected] = useState(1);
  const [listPhim, setListPhim] = useState([]);

  console.log("total: ", total);
  console.log("listPhimPagination: ", listPhimPagination);

  useEffect(() => {
    dispatch(ListPhimActions.getPhimPagination(1));
  }, []);
  useEffect(() => {
    setListPhim(listPhimPagination);
  }, [listPhimPagination]);
  const handleDelete = (maPhim) => {
    Swal.fire({
      icon: "success",
      title: "Delete Success",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(ListPhimActions.deletePhim(maPhim, pageSelected));
  };
  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",

      // sorter: (a, b) => a.maPhim.localeCompare(b.maPhim),
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (_, { hinhAnh, maPhim }) => {
        return (
          <img src={hinhAnh} alt="..." className="max-w-[100px]" key={maPhim} />
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, { maPhim }) => (
        <div className="flex items-center space-x-2" key={maPhim}>
          <button
            className="border-2 border-blue-500 p-1 rounded text-blue-500 hover:bg-blue-100"
            onClick={() => {
              navigate(`/admin/update-film/${maPhim}`);
            }}
          >
            <EditIcon />
          </button>
          <button
            className="border-2 border-red-500 p-1 rounded text-red-500 hover:bg-red-100"
            onClick={() => {
              handleDelete(maPhim);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-3">
      <h1 className="text-2xl">Quản lý Phim</h1>
      <button
        className="border-2 rounded-lg hover:bg-blue-100 !border-blue-500 p-2"
        onClick={() => {
          navigate("/admin/add-film");
        }}
      >
        Thêm phim
      </button>

      <Table
        columns={columns}
        dataSource={listPhim}
        pagination={{
          pageSize: 10,
          total: total,
          onChange: (page) => {
            setPageSelected(page);
            dispatch(ListPhimActions.getPhimPagination(page));
          },
        }}
      />
    </div>
  );
}
