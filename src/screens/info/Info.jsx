import React, { useState } from "react";

import "./Info.css";
import ReactInputMask from "react-input-mask";

const Info = (props) => {
  const handleAdvance = () => {
    const section = document.getElementById("sectionPayment");
    section.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
    props.setActiveItem("sectionPayment");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="offset-2 col">
            <h5>Informações</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="card-info p-3">
              <div className="row">
                <div className="col">
                  <label>Nome</label>
                  <input
                    className="form-control"
                    value={props.name}
                    onChange={(e) => {
                      props.setName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Telefone</label>
                  <ReactInputMask
                    type="text"
                    mask={"(99) 99999-9999"}
                    value={props.phone}
                    onChange={(e) => {
                      props.setPhone(e.target.value);
                    }}
                    placeholder="(99) 99999-9999"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="offset-2 col">
            <h5>Endereço</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="card-info p-3">
              <div className="row">
                <div className="col">
                  <label>Rua/Avenida</label>
                  <input
                    className="form-control"
                    value={props.address}
                    onChange={(e) => {
                      props.setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Número</label>
                  <input
                    className="form-control"
                    value={props.addressNumber}
                    onChange={(e) => {
                      props.setAddressNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Bairro</label>
                  <input
                    className="form-control"
                    value={props.neighborhood}
                    onChange={(e) => {
                      props.setNeihborhood(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Complemento</label>
                  <input
                    className="form-control"
                    value={props.complement}
                    onChange={(e) => {
                      props.setComplement(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.activeItem == "sectionInfo" && (
        <div className="fixed-bottom text-center p-3">
          <button className="advance-button" onClick={handleAdvance}>
            Finalizar
          </button>
        </div>
      )}
    </>
  );
};

export default Info;
