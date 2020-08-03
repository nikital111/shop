/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const head = React.useRef()
  window.addEventListener('scroll', () => {
    if (window.scrollY > 90) {
      head.current.className = 'fixed';
    }
    else head.current.className = null;
  })
  return (
    <header ref={head}>
      <div className="container">
        <img id="logo" src="images/logo.png" alt="logo" />
        <ul>
          <li>
            <NavLink activeClassName="active" exact to="/">
              Catalog
        </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/basket">
              Basket
        </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
