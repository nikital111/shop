export const fetchProducts = (dispatch) => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            dispatch(setProducts(data.products))
            dispatch(filterProducts(data.products))
        })
}

export const setProducts = (data) => ({
    type: 'SET_PRODUCTS',
    payload: data
})

export const filterProducts = () => ({
    type: 'FILTER_PRODUCTS',
})

export const setBrand = (e, brand) => ({
    type: 'SET_BRAND',
    payload: {
        e: e,
        brand: brand
    }
})

export const setSpec = (e, spec) => ({
    type: 'SET_SPEC',
    payload: {
        e: e,
        spec: spec
    }
})

export const setImg = (e) => ({
    type: 'SET_IMG',
    payload: e
})

export const sortByPrice = () => ({
    type: 'SORT_BY'
})