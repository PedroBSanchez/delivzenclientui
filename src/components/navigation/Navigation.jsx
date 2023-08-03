import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Navigation.css";
import Header from "../header/Header";

const Navigation = ({ categories }) => {
  const [activeItem, setActiveItem] = useState("sectionInicial");

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
    <div className="page-background">
      <Header />
      <Row className="overflow-auto mt-2" style={{ whiteSpace: "nowrap" }}>
        <Col className="m-1">
          <div className="" style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={
                activeItem === "sectionInicial"
                  ? "menu-item-card active"
                  : "menu-item-card"
              }
            >
              <a
                onClick={() => {
                  scrollToSection("sectionInicial");
                }}
              >
                Inicial
              </a>
            </div>
            {categories.map((category, index) => {
              return (
                <div
                  className={
                    activeItem === `section${category.index}`
                      ? "menu-item-card active"
                      : "menu-item-card"
                  }
                  key={index}
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
            <div
              className={
                activeItem === "sectionFinal"
                  ? "menu-item-card active"
                  : "menu-item-card"
              }
            >
              <a
                onClick={() => {
                  scrollToSection("sectionFinal");
                }}
              >
                Inicial
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navigation;
