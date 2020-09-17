/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toCart, delFromACart, setImg } from "../../actions/actions";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.totalPrice);
  const curImg = useSelector((state) => state.img);
  const total = useSelector((state) => state.total);

  const closeImg = () => {
    dispatch(setImg());
  };

  const listInCart = () => {
    return cart.map((product, i) => {
      const zoomImg = () => {
        dispatch(setImg(product.imageURL));
      };

      const changeCount = (e) => {
        if (+e.target.value > +e.target.max) {
          e.target.value = e.target.max;
        }
        if (+e.target.value < +e.target.min) {
          e.target.value = e.target.min;
        }
        dispatch(toCart(product, i, +e.target.value));
      };

      const delCart = () => {
        dispatch(delFromACart(i));
      };
      return (
        <div className="productInCart" key={i}>
          <div className="main">
            {product.name}
            <img
              src={product.imageURL}
              alt={"Купить " + product.name}
              onClick={zoomImg}
            />
          </div>
          <div className="divCount">
            <button className="delButt" onClick={delCart}>
              Убрать из корзины
            </button>
            {product.price * product.count + "$"}
            <input
              type="number"
              min="1"
              max="20"
              defaultValue={product.count}
              onChange={changeCount}
            />
          </div>
          <hr />
        </div>
      );
    });
  };
  return (
    <div className="contCart">
      {!total ? (
        <div className="emptyCart">
          Корзина пуста
          <NavLink to="/" activeClassName="">
            Вернуться в каталог
          </NavLink>
        </div>
      ) : (
        <div className="cart">
          <div className="inCart">{listInCart()}</div>
          <div className="buyCart">
            {"Всего: " + totalPrice + "$"}
            <button className="buyButt">Купить</button>
          </div>
        </div>
      )}
      {curImg ? (
        <div className="wrap" onClick={closeImg}>
          <div className="root">
            <img src={curImg} alt="product" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
