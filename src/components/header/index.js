import React from "react";
import "./Header.css";

const Header = ({ logo, name }) => (
  <div className="header">
    <img src={logo} className="logo" alt="logo" />
    <h2>Mon service {name ? " - " + name : ""}</h2>
  </div>
);

export default Header;
