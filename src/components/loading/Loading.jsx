import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./Loading.css";

const Loading = ({ loading }) => {
  return (
    <Modal show={loading} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="row text-center justify-content-center align-items-center p-2">
          <div className="col-md-3 col-4">
            <div class="hungry-4"></div>
          </div>
        </div>
        <div className="row text-center justify-content-center mt-1">
          <div className="col">
            <p>Carregando...</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Loading;
