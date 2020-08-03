import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../components/MainPage/MainPage";
import Basket from "../components/Basket/Basket";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/basket" exact component={Basket} />
    </Switch>
  );
};

export default Router;
