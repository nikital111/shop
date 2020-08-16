import React from "react";
import "./MainPage.css";
import { useDispatch } from "react-redux";
import { setImg } from "../../actions/actions";

function Product({ imageURL, name, price, specifications }) {
  const dispatch = useDispatch();
  const specification = Object.keys(specifications).map((spec, val) => {
    return (
      <li key={`${spec}_${val}`} className="spec_item">
        <span className="spec_name">{specifications[spec][0]}</span>:
        <span className="spec_val"> {specifications[spec][1]}</span>
      </li>
    );
  });
  const zoomImg = (e) => {
    console.log(e.target.src);
    dispatch(setImg(e.target.src));
  };
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
        <button>Add to cart</button>
      </div>
      <div className="specifications">
        <h4>Характеристики:</h4>
        <ul className="specifications-list">{specification}</ul>
      </div>
    </div>
  );
}

export default Product;
