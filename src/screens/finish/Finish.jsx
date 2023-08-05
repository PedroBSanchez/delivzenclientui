import React from "react";

import "./Finish.css";

import { BsCheckCircleFill } from "react-icons/bs";

import Gif from "../../assets/gif.gif";

const Finish = () => {
  return (
    <div className="container background-page">
      <div className="" style={{ top: 70, position: "absolute" }}>
        <img src={Gif} width={"100%"} height={"100%"} />
        <div className="row text-center">
          <div className="col">
            <h5>Pedido realizado com sucesso!</h5>
            <p>
              Tempo médio de entrega {import.meta.env.VITE_RESTAURANT_TIME}{" "}
              minutos
            </p>
            <BsCheckCircleFill size={40} style={{ color: "#2dd177" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finish;
