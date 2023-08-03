import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Navigation.css";
import Header from "../header/Header";

const Navigation = ({ categories, activeItem, setActiveItem }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
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
        zIndex: "999",
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
