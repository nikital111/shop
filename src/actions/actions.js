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

export const isOpenSidebar = () => ({
    type: 'IS_OPEN_SIDEBAR'
})

export const toCart = (product, count, val) => ({
    type: 'TO_CART',
    product: product,
    count: count,
    val: val
})

export const delFromACart = (i) => ({
    type: 'DELETE_FROM_A_CART',
    i: i
})

export const isOpenLogin = () => ({
    type: 'IS_OPEN_LOGIN'
})

export const isNeedReg = () => ({
    type: 'IS_NEED_REG'
})