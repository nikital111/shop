import React from "react";
import "./MainPage.css";

function Product({ imageURL, name, price, specifications }) {
    const specification = Object.keys(specifications).map((spec, val) => {
        return (
            <li key={`${spec}_${val}`} className="spec_item">
                <span className="spec_name">{specifications[spec][0]}</span>:
        <span className="spec_val"> {specifications[spec][1]}</span>
            </li>
        );
    });
    return (
        <div className="product">
            <div className="cont-img">
                <img src={imageURL} alt="product" />
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
