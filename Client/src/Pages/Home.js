import React from "react";
import { Redirect } from "react-router-dom";

const Home = () => {
  const shopifyUser = JSON.parse(localStorage.getItem("shopify-user"));

  if (shopifyUser) {
    return <Redirect to={`${shopifyUser.store.split(".")[0]}`} />;
  }
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
