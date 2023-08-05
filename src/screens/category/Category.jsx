import React, { useEffect, useState } from "react";

import { brMoney } from "../../shared/BrMoney";

import Swal from "sweetalert2";
import "./Category.css";

import ItemCard from "../../components/itemCard/ItemCard";

const Category = (props) => {
  const handleAdvance = () => {
    if (props.userOrderItems.length > 0) {
      const section = document.getElementById("sectionInfo");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
        props.setActiveItem("sectionInfo");
      }
    } else {
      Swal.fire({ text: "Necessário adicionar um item", icon: "warning" });
    }
  };

  return (
    <>
      <hr />
      <div className="container-fluid mt-4 pb-2">
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
        props.activeItem != "sectionConfirm" && (
          <div className="fixed-bottom text-center p-3">
            <button className="advance-button" onClick={handleAdvance}>
              Avançar
            </button>
          </div>
        )}
    </>
  );
};

export default Category;
