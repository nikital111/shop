/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Product from './Product';

function MainPage() {
    const [products, setProducts] = useState([]);
    const [sortProducts, setSortProducts] = useState([]);
    const [sortParams, setSortParams] = useState({
        sorted: [],
        sortedFor: null
    });

    useEffect(() => {
        fetch('/data.json')
            .then(res => {
                return res.json()
            })
            .then(data => {

                setProducts(data.products)
                setSortProducts(data.products)
            })
    }, [])

    useEffect(() => {

        const helpSort = product => {
            if (sortParams.sorted.length === 0) {
                return true
            }
            for (let i = 0; i < sortParams.sorted.length; i++) {
                if (sortParams.sorted[i] === product.brand) return true
                else continue
            }
            return false
        }

        let sortedProducts = products.filter(helpSort)

        setSortProducts(sortedProducts)

    }, [sortParams.sorted])

    const list = sortProducts.map(product => {
        return <Product
            key={product.id}
            imageURL={product.imageURL}
            name={product.name}
            price={product.price}
            specifications={product.specification} />
    })

    const sort = (e, brand) => {
        if (e.target.checked) {
            setSortParams({ ...sortParams, sorted: [...sortParams.sorted, brand] })
        }
        else {
            setSortParams(() => {
                const prevState = sortParams.sorted;
                const nowState = prevState.filter((param) => param !== brand)
                return { ...sortParams, sorted: nowState }
            })
        }
    }

    return (
        <div className="container" id="main">
            <div id="sidebar">
                <ul>
                    <li>
                        <input type="checkbox" onChange={e => {
                            sort(e, 'apple')
                        }} />
                        <label>Apple</label>
                    </li>
                    <li>
                        <input type="checkbox" onChange={e => {
                            sort(e, 'samsung')
                        }} />
                        <label>Samsung</label>
                    </li>
                    <li>
                        <input type="checkbox" onChange={e => {
                            sort(e, 'huawei')
                        }} />
                        <label>Huawei</label>
                    </li>
                </ul>
            </div>

            <div id="content">
                {list}
            </div>
        </div>
    );
}

export default MainPage;
