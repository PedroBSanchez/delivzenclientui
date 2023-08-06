import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import "./Info.css";
import ReactInputMask from "react-input-mask";

const Info = (props) => {
  const handleAdvance = () => {
    if (
      props.name &&
      props.address &&
      props.phone &&
      props.addressNumber &&
      props.neighborhood
    ) {
      const section = document.getElementById("sectionPayment");
      const horizontalScrollDiv = document.getElementById(
        "horizontalScrollDiv"
      );

      if (section) {
        const x = section.offsetLeft;

        window.scrollTo({ top: 0, behavior: "auto" });
        horizontalScrollDiv.scrollTo({ top: 0, behavior: "smooth", left: x });
      }

      props.setActiveItem("sectionPayment");
    } else {
      Swal.fire({ text: "Campos obrigatórios", icon: "warning" });
    }
  };

  useEffect(() => {
    props.setName(localStorage.getItem("userName") ?? "");
    props.setPhone(localStorage.getItem("userPhone") ?? "");
    props.setAddress(localStorage.getItem("userAddress") ?? "");
    props.setAddressNumber(localStorage.getItem("userAddressNumber") ?? "");
    props.setNeighborhood(localStorage.getItem("userNeighborhood") ?? "");
    props.setComplement(localStorage.getItem("userComplement") ?? "");
  }, []);

  return (
    <>
      <div className="container-fluid page-background">
        <div className="row mt-3">
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
                      props.setNeighborhood(e.target.value);
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
        {props.activeItem == "sectionInfo" && (
          <div className="fixed-bottom page-background text-center p-3">
            <button className="advance-button" onClick={handleAdvance}>
              Avançar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Info;
