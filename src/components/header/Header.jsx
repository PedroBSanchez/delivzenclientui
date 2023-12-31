import React from "react";

import "./Header.css";
import { restaurantName } from "../../shared/config";

const Header = () => {
  return (
    <>
      <div
        className="header"
        style={{
          top: "0",
          left: "0",
          position: "fixed",
          width: "100%",
          height: "50px",
          textAlign: "center",
          textJustify: "center",
          zIndex: "3",
        }}
      >
        <h2 className="mt-1" style={{ color: "white" }}>
          {restaurantName}
        </h2>
      </div>
    </>
  );
};

export default Header;
