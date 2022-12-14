import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { ListPhimActions } from "../../redux/actions/ListPhimActions";
import { NHOM } from "../../utils/api";

export default function MethodFilm({ id, method }) {
  console.log("method: ", method);
  console.log("id: ", id);
  const { detailPhim } = useSelector((state) => state.ListPhimReducer);
  useEffect(() => {
    setImage(null);
  }, []);
  useEffect(() => {
    if (method === "update") {
      dispath(ListPhimActions.getDetailPhim(id));
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  }, [method]);
  useEffect(() => {
    detailPhim && update && setImage(detailPhim?.hinhAnh);
  }, [detailPhim]);
  const [update, setUpdate] = useState(false);
  console.log("update: ", update);

  console.log("detailPhim: ", detailPhim);
  const dispath = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [dateConvert, setDateConvert] = useState();
  console.log("dateConvert: ", dateConvert);
  const [image, setImage] = useState();
  console.log("image: ", image);

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      setFieldValue("hinhAnh", file);
    }
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const initialValues = {
    maPhim: update ? detailPhim?.maPhim : "",
    tenPhim: update ? detailPhim?.tenPhim : "",
    trailer: update ? detailPhim?.trailer : "",
    moTa: update ? detailPhim?.moTa : "",
    dangChieu: update ? detailPhim?.dangChieu : false,
    sapChieu: update ? detailPhim?.sapChieu : false,
    hot: update ? detailPhim?.hot : false,
    danhGia: update ? detailPhim?.danhGia : 1,
    hinhAnh: update ? detailPhim?.hinhAnh : null,
    ngayKhoiChieu: update ? detailPhim?.ngayKhoiChieu : null,
    maNhom: NHOM,
  };

  const validationSchema = yup.object().shape({
    tenPhim: yup.string().required("T??n phim kh??ng ???????c b??? tr???ng"),
  });

  const { handleChange, values, handleSubmit, errors, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema,
      onSubmit: (values, { setFieldError }) => {
        if (!values.hinhAnh) {
          setFieldError("hinhAnh", "B???n ch??a th??m h??nh ???nh");
        } else {
          let formData = new FormData();

          for (let key in values) {
            if (key !== "hinhAnh") {
              formData.append(key, values[key]);
            } else {
              formData.append("File", values.hinhAnh, values.hinhAnh.name);
            }
          }
          dispath(ListPhimActions.addPhim(formData));
        }
      },
    });
  console.log(values);
  const DateSelected = (date, dateString) => {
    setFieldValue("ngayKhoiChieu", date);
    setDateConvert(dateString);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      console.log("value: ", value);
      return setFieldValue(name, value);
    };
  };
  return (
    <>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="K??ch th?????c" name="size">
          <Radio.Group>
            <Radio.Button value="small">Nh???</Radio.Button>
            <Radio.Button value="default">M???c ?????nh</Radio.Button>
            <Radio.Button value="large">L???n</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="T??n phim" onChange={handleChange}>
          <Input name="tenPhim" value={values.tenPhim} />
          <div className="text-red-500">{errors.tenPhim}</div>
        </Form.Item>
        <Form.Item label="Trailer" onChange={handleChange}>
          <Input name="trailer" value={values.trailer} />
        </Form.Item>
        <Form.Item label="M?? t???" onChange={handleChange}>
          <TextArea name="moTa" value={values.moTa} />
        </Form.Item>
        <Form.Item label="Ng??y kh???i chi???u">
          <DatePicker
            name="ngayKhoiChieu"
            placeholder="Ch???n ng??y"
            format={"DD/MM/YYYY"}
            onChange={DateSelected}
            value={values.ngayKhoiChieu ? moment(values.ngayKhoiChieu) : null}
          />
        </Form.Item>
        <Form.Item label="??ang chi???u">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="S???p chi???u">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="S??? sao">
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            min={1}
            max={10}
            value={values.danhGia}
          />
        </Form.Item>
        <Form.Item label="H??nh ???nh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          <div className="text-red-500">{errors.hinhAnh}</div>
          {image && (
            <img style={{ width: 150, height: 150 }} alt="..." src={image} />
          )}
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="bg-blue-500 p-2 text-white"
            onClick={() => {
              setFieldValue("ngayKhoiChieu", dateConvert);
            }}
          >
            {update ? "C???p nh???t" : " Th??m phim"}
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
