import React from "react";

import "./Category.css";

const Category = (props) => {
  return (
    <>
      <section id={props.sectionId}>
        <h1>{props.categoryMenu.category}</h1>
      </section>
    </>
  );
};

export default Category;
