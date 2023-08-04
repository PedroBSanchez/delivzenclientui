import React, { useEffect, useState } from "react";

import { brMoney } from "../../shared/BrMoney";

import "./Category.css";

import ItemCard from "../../components/itemCard/ItemCard";

const Category = (props) => {
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
    </>
  );
};

export default Category;
