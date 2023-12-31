import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Navigation.css";
import Header from "../header/Header";

const Navigation = ({ categories, activeItem, setActiveItem }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const horizontalScrollDiv = document.getElementById("horizontalScrollDiv");

    if (section) {
      const x = section.offsetLeft;

      window.scrollTo({ top: 0, behavior: "auto" });
      horizontalScrollDiv.scrollTo({ top: 0, behavior: "smooth", left: x });

      setActiveItem(sectionId);
    }
  };

  return (
    <div
      className="d-flex flex-nowrap overflow-auto page-background"
      style={{
        whiteSpace: "nowrap",
        padding: "10px",
        position: "fixed",
        top: 50,
        left: "0",
        width: "100%",
        zIndex: "3",
        overflow: "hidden",
      }}
    >
      {categories.map((category, index) => {
        return (
          <div
            className={
              activeItem === `section${category.index}`
                ? "menu-item-card active"
                : "menu-item-card"
            }
            key={index}
            style={{
              minWidth: "70px",
              marginRight: "10px",
              textAlign: "center",
              textJustify: "center",
            }}
          >
            <a
              type="button"
              onClick={() => {
                scrollToSection(`section${category.index}`);
              }}
            >
              {category.category}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Navigation;
