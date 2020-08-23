/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import "./Header.css";
const Header = () => {
  const head = React.useRef();
  const total = useSelector(state => state.total);
  window.addEventListener("scroll", () => {
    if (!head.current || window.innerWidth < 766) return;
    if (window.scrollY > 0) {
      head.current.className = "fixed";
    } else head.current.className = null;
  });
  return (
    <header ref={head}>
      <div className="container">
      <NavLink to="/" activeClassName="">
        <img id="logo" src={require('../../../image/logo.png')} alt="logo" />
        </NavLink>
        <ul>
          <li>
            <NavLink activeClassName="active" exact to="/">
              Каталог
            </NavLink>
          </li>
          <li>
           {total === 0 ? null : 
            <NavLink activeClassName="active" to="/cart">
             <div className='divCart'>
              Корзина
              <span className='total'>
              {total}
              </span>
             </div>
            </NavLink>
            }
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
