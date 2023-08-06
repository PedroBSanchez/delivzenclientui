import React, { useState } from "react";

import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { MdPix } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import "./Payment.css";

const Payment = (props) => {
  const handleAdvance = () => {
    if (props.paymentMethod) {
      const section = document.getElementById("sectionConfirm");
      const horizontalScrollDiv = document.getElementById(
        "horizontalScrollDiv"
      );

      if (section) {
        const x = section.offsetLeft;

        window.scrollTo({ top: 0, behavior: "auto" });
        horizontalScrollDiv.scrollTo({ top: 0, behavior: "smooth", left: x });

        props.setActiveItem("sectionConfirm");
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="offset-2 col">
            <h5>Pagamento</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="card-info p-3">
              <div className="row">
                <div className="col-2">
                  <label className="container-check">
                    <input
                      type="checkbox"
                      value="PIX"
                      checked={props.paymentMethod === "PIX"}
                      onChange={(e) => {
                        props.setPaymentMethod(e.target.value);
                      }}
                    />
                    <div className="checkmark"></div>
                  </label>
                </div>
                <div className="col-2">
                  <MdPix
                    size={35}
                    className="p-2 order-detail-payment-icon order-detail-payment-icon-pix"
                  />
                </div>
                <div className="col">
                  <p>PIX</p>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label className="container-check">
                    <input
                      type="checkbox"
                      value="Cartão"
                      checked={props.paymentMethod === "Cartão"}
                      onChange={(e) => {
                        props.setPaymentMethod(e.target.value);
                      }}
                    />
                    <div className="checkmark"></div>
                  </label>
                </div>
                <div className="col-2">
                  <BsFillCreditCard2BackFill
                    size={35}
                    className="p-2 order-detail-payment-icon order-detail-payment-icon-card"
                  />
                </div>
                <div className="col">
                  <p>Cartão</p>
                </div>
              </div>

              <div className="row">
                <div className="col-2">
                  <label className="container-check">
                    <input
                      type="checkbox"
                      value="Dinheiro"
                      checked={props.paymentMethod === "Dinheiro"}
                      onChange={(e) => {
                        props.setPaymentMethod(e.target.value);
                      }}
                    />
                    <div className="checkmark"></div>
                  </label>
                </div>
                <div className="col-2">
                  <FaMoneyBillAlt
                    size={35}
                    className="p-2 order-detail-payment-icon order-detail-payment-icon-money"
                  />
                </div>
                <div className="col">
                  <p>Dinheiro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-9">
            <div className="card-info p-3">
              <label>Observações (opcional)</label>
              <textarea
                className="form-control"
                rows={3}
                value={props.observations}
                onChange={(e) => {
                  props.setObservations(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {props.activeItem == "sectionPayment" && (
          <div className="fixed-bottom page-background text-center p-3">
            <button className="advance-button" onClick={handleAdvance}>
              Confirmar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
