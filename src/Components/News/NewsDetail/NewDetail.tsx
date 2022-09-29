import React from "react";
import { useParams } from "react-router-dom";

const NewDetail = () => {
  const { name } = useParams();
  console.log(name);
  return <div>NewDetail</div>;
};

export default NewDetail;
