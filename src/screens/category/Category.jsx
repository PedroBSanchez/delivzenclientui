import React, { useEffect, useState } from "react";

import { brMoney } from "../../shared/BrMoney";

import "./Category.css";

import Lunch from "../../assets/lunch.png";
import Bottle from "../../assets/bottle.png";
import ItemCard from "../../components/itemCard/ItemCard";

const Category = (props) => {
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

    if (bottleWords.includes(props.categoryMenu.category.toLowerCase())) {
      return Bottle;
    }
    return Lunch;
  };

  const icon = isBottle();

  return (
    <>
      <hr />
      <div className="container-fluid mt-4" style={{ overflow: "auto" }}>
        {props.categoryMenu.items.map((item, index) => {
          return (
            <div key={index} className="row justify-content-center mt-3">
              <div className="col-9">
                <ItemCard item={item} category={props.categoryMenu.category} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Category;
