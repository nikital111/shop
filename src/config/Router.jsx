import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../components/MainPage/MainPage";
import Cart from "../components/Cart/Cart";
import Cab from "../components/Cab/Cab";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/Cart" exact component={Cart} />
      <Route path="/Cab" exact component={Cab} />
    </Switch>
  );
};

export default Router;
