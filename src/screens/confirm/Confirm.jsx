import React from "react";

import "./Confirm.css";

import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { MdPix } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { brMoney } from "../../shared/BrMoney";

const Confirm = (props) => {
  const handleFinishOrder = async () => {
    localStorage.setItem("userName", props.name);
    localStorage.setItem("userPhone", props.phone);
    localStorage.setItem("userAddress", props.address);
    localStorage.setItem("userAddressNumber", props.addressNumber);
    localStorage.setItem("userNeighborhood", props.neighborhood);
    localStorage.setItem("userComplement", props.complement);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="offset-2 col">
            <h5>Informações</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="card-info p-2">
              <div className="row">
                <p>
                  {props.name} - {props.phone}
                </p>
              </div>
              <div className="row">
                <p>
                  {props.address}, {props.addressNumber} <br />
                  {props.neighborhood} <br />
                  {props.complement}
                </p>
              </div>
              <div className="row">
                <div className="col-2">
                  {props.paymentMethod == "Cartão" && (
                    <BsFillCreditCard2BackFill
                      size={35}
                      className="p-2 order-detail-payment-icon order-detail-payment-icon-card"
                    />
                  )}
                  {props.paymentMethod == "PIX" && (
                    <>
                      <MdPix
                        size={35}
                        className="p-2 order-detail-payment-icon order-detail-payment-icon-pix"
                      />
                    </>
                  )}
                  {props.paymentMethod == "Dinheiro" && (
                    <FaMoneyBillAlt
                      size={35}
                      className="p-2 order-detail-payment-icon order-detail-payment-icon-money"
                    />
                  )}
                </div>
                <div className="col-4">
                  <p className="">{props.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-2 col">
            <h5>Total {brMoney(props.totalPrice)}</h5>
          </div>
        </div>
        <div className="row justify-content-center mt-1">
          <div className="col">
            <table className="table ">
              <thead>
                <tr>
                  <th>Item</th>
                  <th colSpan={3}>Quant</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.userOrderItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={3}>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>
                        <TbTrashXFilled
                          size={25}
                          style={{ color: "#c54646", cursor: "pointer" }}
                          onClick={() => {
                            props.handleRemoveUserOrderItem(item);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row text-center justify-content-center mt-3">
          <div className="col">
            <button
              className={
                props.userOrderItems.length > 0
                  ? "advance-button"
                  : "advance-button-disabled"
              }
              onClick={handleFinishOrder}
              disabled={props.userOrderItems.length <= 0}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
