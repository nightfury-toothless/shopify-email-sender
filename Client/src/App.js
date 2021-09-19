import React from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Template from "./Pages/Template";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:store" component={Template} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
