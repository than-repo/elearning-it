import { fetchCourses } from "@/server/actions/api";
import React from "react";

type Props = {};

const Product = async (props: Props) => {
  const courses = await fetchCourses();
  const renderProduct = () => {
    return courses.map((item) => {
      return <div key={item.maKhoaHoc}>{item.tenKhoaHoc}</div>;
    });
  };
  return <div>{renderProduct()}</div>;
};

export default Product;
