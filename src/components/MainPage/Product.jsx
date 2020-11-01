import React from "react";
import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import { deletingProduct, setImg } from "../../actions/actions";
import { toCart } from "../../actions/actions";

function Product({ imageURL, name, price, priceN, specifications,id,brand }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isAdmin = useSelector((state) => state.isAdmin);
  const specification = Object.keys(specifications).map((spec, val) => {
    return (
      <li key={`${spec}_${val}`} className="spec_item">
        <span className="spec_name">{specifications[spec][0]}</span>:
        <span className="spec_val"> {specifications[spec][1]}</span>
      </li>
    );
  });

  const deleteProduct = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/products/${id}`,{method:"DELETE"})
        .then(res => {
          return res.json()
      })
      .then(data => {
        console.log(data)
      })
      if(localStorage.getItem('deletedPr')){
        let readyData = JSON.parse(localStorage.getItem('deletedPr'));
        readyData.push({
          "imageURL": imageURL,
          "name": name,
          "priceN": priceN,
          "price": price,
          "brand": brand,
          "specification": specifications
        })
        localStorage.setItem('deletedPr',JSON.stringify(readyData))
      }
      else {
        localStorage.setItem('deletedPr',JSON.stringify([{
          "imageURL": imageURL,
          "name": name,
          "priceN": priceN,
          "price": price,
          "brand": brand,
          "specification": specifications
        }]))
      }
  }
  const zoomImg = () => {
    dispatch(setImg(imageURL));
  };

  const addToCart = () => {
    const data = {
      imageURL: imageURL,
      name: name,
      price: priceN,
      count: 1,
    };
    const hasAlready = cart.findIndex((el) => {
      if (el.name === name) return true;
      else return false;
    });
    if (hasAlready !== -1) {
      dispatch(toCart(data, hasAlready));
      console.log(hasAlready);
    } else {
      dispatch(toCart(data));
    }
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
        <button onClick={addToCart}>В корзину</button>
      </div>
      <div className="specifications">
        <h4>Характеристики:</h4>
        <ul className="specifications-list">{specification}</ul>
      </div>
      {isAdmin ? <div className="deleteP" onClick={deleteProduct}>X</div> : null}
    </div>
  );
}

export default Product;
