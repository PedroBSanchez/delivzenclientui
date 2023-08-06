import React, { useEffect, useState } from "react";

import { brMoney } from "../../shared/BrMoney";

import Swal from "sweetalert2";
import "./Category.css";

import ItemCard from "../../components/itemCard/ItemCard";

const Category = (props) => {
  const handleAdvance = () => {
    if (props.userOrderItems.length > 0) {
      const section = document.getElementById("sectionInfo");
      const horizontalScrollDiv = document.getElementById(
        "horizontalScrollDiv"
      );

      if (section) {
        const x = section.offsetLeft;

        window.scrollTo({ top: 0, behavior: "auto" });
        horizontalScrollDiv.scrollTo({ top: 0, behavior: "smooth", left: x });

        props.setActiveItem("sectionInfo");
      }
    } else {
      Swal.fire({ text: "Necessário adicionar um item", icon: "warning" });
    }
  };

  return (
    <>
      <hr />
      <div className="container-fluid mt-4 p-2">
        <h5>Total: R${brMoney(props.totalPrice)}</h5>
        {props.categoryMenu.items.map((item, index) => {
          return (
            <div key={index} className="row justify-content-center mt-3">
              <div className="col-9">
                <ItemCard
                  item={item}
                  category={props.categoryMenu.category}
                  handleAddUserOrderItem={props.handleAddUserOrderItem}
                  userOrderItems={props.userOrderItems}
                  handleRemoveUserOrderItem={props.handleRemoveUserOrderItem}
                />
              </div>
            </div>
          );
        })}
      </div>
      {props.activeItem != "sectionInfo" &&
        props.activeItem != "sectionConfirm" &&
        props.activeItem != "sectionPayment" && (
          <div className="fixed-bottom  text-center p-3" style={{ zIndex: 1 }}>
            <button
              className="advance-button"
              onClick={handleAdvance}
              style={{ zIndex: 3 }}
            >
              Avançar
            </button>
          </div>
        )}
    </>
  );
};

export default Category;
