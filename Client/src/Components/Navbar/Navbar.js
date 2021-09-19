import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const shopifyUser = JSON.parse(localStorage.getItem("shopify-user"));

  return (
    <div className="navbar-wrapper">
      <div className="navbar-header">
        <p>Email Editor And Sender</p>
        <p className="navbar-userstore">{shopifyUser?.store}</p>
      </div>
    </div>
  );
};

export default Navbar;
