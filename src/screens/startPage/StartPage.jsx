import React from "react";

import { useNavigate } from "react-router-dom";

import DoofLogo from "../../assets/doofLogo.png";

import "./StartPage.css";
import { restaurantName } from "../../shared/config";

const StartPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/pedido");
  };

  return (
    <div className="container-fluid start-page">
      <div className="row" />
      <div className="row mt-4">
        <div className="offset-1 col">
          <div
            className="p-2"
            style={{ backgroundColor: "white", borderRadius: 50, width: 55 }}
          >
            <img src={DoofLogo} width={"40px"} height={"40px"} />
          </div>
        </div>
      </div>
      <div className="row text-center justify-content-center mt-4">
        <div className="col">
          <h1 style={{ color: "white" }}>{restaurantName}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="woman-div"></div>
        </div>
        <div className="col">
          <div className="man-div"></div>
        </div>
      </div>
      <div className="gradient-over"></div>
      <div className="fixed-bottom text-center p-5">
        <button className="start-button" onClick={handleNavigate}>
          Começar
        </button>
      </div>
    </div>
  );
};

export default StartPage;
