import React from "react";
import "./MainPage.css";
import { useDispatch,useSelector } from "react-redux";
import { setImg } from "../../actions/actions";
import {toCart} from "../../actions/actions";

function Product({ imageURL, name, price, priceN, specifications }) {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  const specification = Object.keys(specifications).map((spec, val) => {
    return (
      <li key={`${spec}_${val}`} className="spec_item">
        <span className="spec_name">{specifications[spec][0]}</span>:
        <span className="spec_val"> {specifications[spec][1]}</span>
      </li>
    );
  });
  const zoomImg = () => {
    dispatch(setImg(imageURL));
  };

   const addToCart = () => {
     const data = {
      imageURL:imageURL,
      name:name,
      price:priceN,
      count:1
    }
    const hasAlready = cart.findIndex((el)=>{
       if(el.name === name) return true
       else return false
     })
     if(hasAlready !== -1){
       dispatch(toCart(data,hasAlready))
       console.log(hasAlready)
     }
     else{
    
    dispatch(toCart(data))
     }
  }

  return (
    <div className="product">
      <div className="cont-img">
        <div>
          <img src={imageURL} alt={name} onClick={zoomImg} />
        </div>
      </div>
      <h2>{name}</h2>
      <div className="p-bottom">
        <span>{price}</span>
        <button onClick={addToCart}>В корзину</button>
      </div>
      <div className="specifications">
        <h4>Характеристики:</h4>
        <ul className="specifications-list">{specification}</ul>
      </div>
    </div>
  );
}

export default Product;
