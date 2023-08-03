import React from "react";

import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="text-center header">
        <h2 className="pt-2" style={{ color: "white" }}>
          {import.meta.env.VITE_RESTAURANT_NAME}
        </h2>
      </header>
    </>
  );
};

export default Header;
