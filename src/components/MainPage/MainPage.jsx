/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterProducts,
  setBrand,
  setSpec,
  setImg,
  sortByPrice,
  isOpenSidebar,
} from "../../actions/actions";
import "./MainPage.css";
import Product from "./Product";

function MainPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const sortProducts = useSelector((state) => state.sortProducts);
  const sortParams = useSelector((state) => state.sortParams);
  const curImg = useSelector((state) => state.img);
  const isOpen = useSelector((state) => state.isOpenSidebar);

  useEffect(() => {
    dispatch(fetchProducts);
    if (sortParams.sortedBrand.length > 0) {
      for (let param of sortParams.sortedBrand) {
        document.querySelector(`#${param}_ch`).checked = true;
      }
    }
    if (sortParams.sortedSpec.length > 0) {
      for (let spec of sortParams.sortedSpec) {
        let specA = spec
          .toString()
          .split("")
          .map((l) => {
            if (l === " " || l === "." || l === ",") {
              l = "_";
              return l;
            }
            return l;
          })
          .join("");
        document.querySelector(`#_${specA}_ch`).checked = true;
      }
    }
  }, []);

  useEffect(() => {
    dispatch(filterProducts());
  }, [sortParams.sorted]);

  const list = sortProducts.map((product) => {
    return (
      <Product
        key={product.id}
        imageURL={product.imageURL}
        name={product.name}
        price={product.price}
        priceN={product.priceN}
        specifications={product.specification}
      />
    );
  });

  const listOfBrands = () => {
    const objOfBrands = {};
    for (let product of products) {
      if (objOfBrands[product.brand]) objOfBrands[product.brand] += 1;
      else objOfBrands[product.brand] = 1;
    }
    return Object.keys(objOfBrands).map((brand, key) => {
      let brandL = brand.split("");
      brandL[0] = brandL[0].toUpperCase();
      brandL = brandL.join("");
      return (
        <li key={`${brand}_${key}`}>
          <input
            id={`${brand}_ch`}
            type="checkbox"
            onChange={(e) => {
              dispatch(setBrand(e, brand));
              dispatch(filterProducts());
            }}
          />
          <label htmlFor={`${brand}_ch`}>{brandL}</label>
          <span className="numParams">({objOfBrands[brand]})</span>
        </li>
      );
    });
  };

  const listOfSpecifications = () => {
    const objOfSpecification = {};
    for (let product of products) {
      for (let spec of Object.keys(product.specification)) {
        if (objOfSpecification[product.specification[spec][0]]) continue;
        else objOfSpecification[product.specification[spec][0]] = {};
      }
    }
    for (let product of products) {
      for (let spec of Object.keys(product.specification)) {
        if (
          objOfSpecification[product.specification[spec][0]][
            product.specification[spec][1]
          ]
        ) {
          objOfSpecification[product.specification[spec][0]][
            product.specification[spec][1]
          ] += 1;
        } else {
          objOfSpecification[product.specification[spec][0]][
            product.specification[spec][1]
          ] = 1;
        }
      }
    }

    return Object.keys(objOfSpecification).map((titleSpec) => {
      const list = Object.keys(objOfSpecification[titleSpec]).map(
        (spec, key) => {
          let specA = spec
            .toString()
            .split("")
            .map((l) => {
              if (l === " " || l === "." || l === ",") {
                l = "_";
                return l;
              }
              return l;
            })
            .join("");
          return (
            <li key={`${specA}_${key}_s`}>
              <input
                id={`_${specA}_ch`}
                type="checkbox"
                onChange={(e) => {
                  dispatch(setSpec(e, spec));
                  dispatch(filterProducts());
                }}
              />
              <label htmlFor={`_${specA}_ch`}>{spec}</label>
              <span className="numParams">
                ({objOfSpecification[titleSpec][spec]})
              </span>
            </li>
          );
        }
      );
      return (
        <>
          <h3 key={`${titleSpec}_sp`}>{`${titleSpec}:`}</h3>
          {list}
        </>
      );
    });
  };
  const ar = useRef();
  const sortBy = () => {
    if (document.querySelector(".arrow").classList[1])
      document.querySelector(".arrow").classList.remove("rotated");
    else document.querySelector(".arrow").classList.add("rotated");
    dispatch(sortByPrice());
    dispatch(filterProducts());
  };

  const closeImg = () => {
    dispatch(setImg());
  };

  const sideB = useRef();
  const openSide = () => {
    dispatch(isOpenSidebar());
    let leftSideB = -260;
    const timer = setInterval(() => {
      if (leftSideB >= -5) clearInterval(timer);
      leftSideB += 3;
      sideB.current.style.left = leftSideB + "px";
    }, 1);
  };
  const closeSide = () => {
    dispatch(isOpenSidebar());
    let leftSideB = 0;
    const timer = setInterval(() => {
      if (leftSideB <= -260) clearInterval(timer);
      leftSideB -= 3;
      sideB.current.style.left = leftSideB + "px";
    }, 1);
  };

  return (
    <>
      {curImg ? (
        <div className="wrap" onClick={closeImg}>
          <div className="root">
            <img src={curImg} alt="product" />
          </div>
        </div>
      ) : null}

      <div className="container" id="main">
        <div className="sortedDiv" onClick={sortBy}>
          <span className="arrow" ref={ar}>
            >
          </span>
          Сортировать по цене
        </div>
        <div id="sidebar" ref={sideB}>
          <div id="sideFilt">
            <h3>Бренды:</h3>
            <ul>
              {listOfBrands()}
              {listOfSpecifications()}
            </ul>
          </div>
          <button
            id="openSide"
            className={isOpen ? "rotatedSide" : ""}
            onClick={!isOpen ? openSide : closeSide}
          >
            >
          </button>
        </div>

        <div id="content">{list}</div>
      </div>
    </>
  );
}

export default MainPage;
