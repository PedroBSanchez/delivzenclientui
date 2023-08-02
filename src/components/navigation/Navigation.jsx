import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Navigation.css";

const Navigation = ({ categories }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  };

  return (
    <div className="">
      <Row className="overflow-auto" style={{ whiteSpace: "nowrap" }}>
        <Col className="m-1">
          <div className="" style={{ display: "flex", flexDirection: "row" }}>
            <div className="menu-item-card ">
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
                <div className="menu-item-card" key={index}>
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
            <div className="menu-item-card ">
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
