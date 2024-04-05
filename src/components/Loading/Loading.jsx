import React from "react";
import { Spinner } from "react-bootstrap";

import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" role="status" />
      <h5>Cargando...</h5>
    </div>
  );
};

export default Loading;
