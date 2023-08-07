import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { brMoney } from "../../shared/BrMoney";

import Swal from "sweetalert2";

import Lunch from "../../assets/lunch.png";
import Bottle from "../../assets/bottle.png";

import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { TbTrashXFilled } from "react-icons/tb";

import "./ItemCard.css";

import { BsThreeDots } from "react-icons/bs";

const Itemcard = (props) => {
  const [show, setShow] = useState(false);

  const [isInOrder, setIsIsInOrder] = useState(false);

  const [additionalsCheck, setAdditionalsCheck] = useState(
    props.item.additional
  );
  const [amount, setAmount] = useState(0);

  const handleAddAmount = () => {
    setAmount(amount + 1);
  };
  const handleRemoveAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const handleCheckboxChange = (code) => {
    setAdditionalsCheck((prevData) =>
      prevData.map((item) =>
        item.code === code ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleAddItemClick = () => {
    if (amount > 0) {
      //Montar objeto corretamente

      let arrayCheckedAdditionals = additionalsCheck.filter(
        (additional) => additional.isChecked
      );

      const itemAdded = {
        _id: props.item._id,
        name: props.item.name,
        description: props.item.description,
        value: props.item.value,
        additional: arrayCheckedAdditionals,
        amount: amount,
      };

      props.handleAddUserOrderItem(itemAdded);
      setIsIsInOrder(true);
      handleClose();
    } else {
      Swal.fire({
        text: "Necessário pelo menos um item",
        icon: "warning",
      });
    }
  };

  const handleRemoveItemClick = () => {
    props.handleRemoveUserOrderItem(props.item);
    let arrayAdditionalsCheck = additionalsCheck;
    arrayAdditionalsCheck.map((element, index) => {
      element.isChecked = false;
    });

    setAdditionalsCheck(arrayAdditionalsCheck);
    setIsIsInOrder(false);
    setAmount(0);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isBottle = () => {
    const bottleWords = [
      "bebida",
      "drink",
      "alcoólicos",
      "café",
      "chá",
      "bebidas",
      "drinks",
      "alcoólico",
      "cafés",
      "chás",
    ];

    if (bottleWords.includes(props.category.toLowerCase())) {
      return Bottle;
    }
    return Lunch;
  };
  const icon = isBottle();

  useEffect(() => {
    let additionalsCheckArray = [];

    additionalsCheck.map((element, index) => {
      additionalsCheckArray.push({ ...element, isChecked: false });
    });
    setAdditionalsCheck(additionalsCheckArray);
  }, []);

  return (
    <>
      <div className="item-card p-3" onClick={handleShow}>
        <div className="row">
          <div className="col-3">
            <img width={50} height={50} src={icon} />
          </div>
          <div className="col">
            <p style={{ fontSize: "14px" }}>
              {props.item.name} <br /> R${brMoney(props.item.value)}
            </p>
          </div>
          <div className="col">
            <div className="dots text-center">
              <BsThreeDots size={21} onClick={handleShow} />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered fullscreen scrollable>
        <Modal.Header closeButton>
          <button className="item-modal-back-button p-3" onClick={handleClose}>
            Voltar
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-4">
            <div className="offset-2 col-2">
              <img width={50} height={50} src={`${icon}`} />
            </div>
            <div className="col">
              <h4>
                {props.item.name} <br /> R${brMoney(props.item.value)}
              </h4>
            </div>
          </div>

          {props.item.description && (
            <>
              <div className="row mt-3">
                <div className="offset-2 col">
                  <h5>Descrição</h5>
                </div>
              </div>
              <div className="row justify-content-center mt-1">
                <div className="offset-1 col-9">
                  <div
                    className="item-card p-2"
                    style={{ textAlign: "justify" }}
                  >
                    <p>{props.item.description}</p>
                  </div>
                </div>
              </div>
            </>
          )}
          {additionalsCheck && additionalsCheck.length > 0 && (
            <>
              <div className="row mt-3">
                <div className="offset-2 col">
                  <h5>Adicionais</h5>
                </div>
              </div>
              {additionalsCheck.map((additional, index) => {
                return (
                  <div key={index} className="row justify-content-center mt-1">
                    <div className="offset-1 col-9">
                      <div className="item-card p-2">
                        <div className="row justify-content-around">
                          <div className="col-8">
                            <p>
                              {additional.name} R${brMoney(additional.value)}
                            </p>
                          </div>
                          <div className="col">
                            <label className="container-check">
                              <input
                                checked={additional.isChecked}
                                type="checkbox"
                                onChange={(event) =>
                                  handleCheckboxChange(additional.code)
                                }
                              />
                              <div className="checkmark"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="row">
          <div className={`${isInOrder ? "col-5" : "col-7"}`}>
            <div className="p-2 ">
              <AiFillMinusSquare
                onClick={handleRemoveAmount}
                size={40}
                style={{ color: "#fa4a0c", cursor: "pointer" }}
              />
              <span className="m-2" style={{ fontSize: "25px" }}>
                {amount}
              </span>
              <AiFillPlusSquare
                onClick={handleAddAmount}
                size={40}
                style={{ color: "#fa4a0c", cursor: "pointer" }}
              />
            </div>
          </div>

          {isInOrder && (
            <div className="col-2">
              <TbTrashXFilled
                onClick={handleRemoveItemClick}
                className="m-2"
                size={30}
                style={{ color: "#c54646", cursor: "pointer" }}
              />
            </div>
          )}
          <div className="col">
            <button
              className={`${
                amount > 0
                  ? "item-modal-add-button"
                  : "item-modal-add-buton-disabled"
              }`}
              disabled={amount <= 0}
              onClick={handleAddItemClick}
            >
              Adicionar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Itemcard;
