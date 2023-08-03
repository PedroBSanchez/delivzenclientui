import React, { useState } from "react";

import { brMoney } from "../../shared/BrMoney";

import Lunch from "../../assets/lunch.png";
import Bottle from "../../assets/bottle.png";

import "./ItemCard.css";

import { BsThreeDots } from "react-icons/bs";

const Itemcard = (props) => {
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
  return (
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
            <BsThreeDots size={21} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemcard;
