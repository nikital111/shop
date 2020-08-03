import React from "react";
import Header from "../components/Static/Header/Header";
import Footer from "../components/Static/Footer/Footer";
import "./App.css";

import Router from "../config/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../config/reducer";

function App() {
  const store = createStore(reducer, composeWithDevTools());
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <div className="page">
            <Router />
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
