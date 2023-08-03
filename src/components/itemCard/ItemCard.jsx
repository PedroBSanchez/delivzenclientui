import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { brMoney } from "../../shared/BrMoney";

import Lunch from "../../assets/lunch.png";
import Bottle from "../../assets/bottle.png";

import "./ItemCard.css";

import { BsThreeDots } from "react-icons/bs";

const Itemcard = (props) => {
  const [show, setShow] = useState(false);

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

  const handleAddAdditional = (additional) => {};

  const icon = isBottle();
  return (
    <>
      <div className="item-card p-3">
        <div className="row">
          <div className="col-3">
            <img width={50} height={50} src={icon} />
          </div>
          <div className="col">
            <p>
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
          <button className="item-modal-back-button p-2" onClick={handleClose}>
            Voltar
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-4">
            <div className="offset-2 col-2">
              <img width={50} height={50} src={icon} />
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
          {props.item.additional && props.item.additional.length > 0 && (
            <>
              <div className="row mt-3">
                <div className="offset-2 col">
                  <h5>Adicionais</h5>
                </div>
              </div>
              {props.item.additional.map((additional, index) => {
                return (
                  <div key={index} className="row justify-content-center mt-1">
                    <div className="offset-1 col-9">
                      <div className="item-card p-2">
                        <div className="row">
                          <div className="col">
                            <p>
                              {additional.name} R${brMoney(additional.value)}
                            </p>
                          </div>
                          <div className="col">
                            <label class="container-check">
                              <input
                                checked={false}
                                type="checkbox"
                                onChange={(event) => {}}
                              />
                              <div class="checkmark"></div>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Itemcard;
