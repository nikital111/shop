import React from "react";
import Header from "../components/Static/Header/Header";
import Footer from "../components/Static/Footer/Footer";
import "./App.css";

import Router from "../config/Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../config/reducer";

function App() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
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
