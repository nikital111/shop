import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../components/MainPage/MainPage";
import Cart from "../components/Cart/Cart";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/Cart" exact component={Cart} />
    </Switch>
  );
};

export default Router;
