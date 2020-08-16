
const initialState = {
  products: [],
  sortProducts: [],
  sortParams: {
    sortedBrand: [],
    sortedSpec: [],
    sortedBy: true
  },
  img: null
};

const reduceMain = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }

    case "FILTER_PRODUCTS": {

      const helpSort = product => {

        const brandSort = () => {
          if (state.sortParams.sortedBrand.length === 0) {
            return true
          }
          for (let i = 0; i < state.sortParams.sortedBrand.length; i++) {
            if (state.sortParams.sortedBrand[i] === product.brand) return true
            else continue
          }
          return false
        }
        const specSort = () => {
          if (state.sortParams.sortedSpec.length === 0) return true
          const arr = [];
          for (let spec of Object.keys(product.specification)) {
            arr.push(`${product.specification[spec][1]}`)
          }
          for (let spec of state.sortParams.sortedSpec) {
            if (arr.includes(spec)) continue
            else return false
          }
          return true
        }

        if (brandSort() && specSort()) return true
        else return false
      }

      let sortedProducts = state.products.filter(helpSort)

      sortedProducts.sort((a, b) => {
        if (state.sortParams.sortedBy) {
          if (a.priceN > b.priceN) {
            return -1;
          }
          if (a.priceN < b.priceN) {
            return 1;
          }
          // a должно быть равным b
          return 0;
        }
        else {
          if (a.priceN > b.priceN) {
            return 1;
          }
          if (a.priceN < b.priceN) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        }

      })

      return {
        ...state,
        sortProducts: sortedProducts
      };
    }

    case "SET_BRAND": {
      if (action.payload.e.target.checked) {
        return {
          ...state,
          sortParams: { ...state.sortParams, sortedBrand: [...state.sortParams.sortedBrand, action.payload.brand] }
        };
      }
      const prevState = state.sortParams.sortedBrand;
      const nowState = prevState.filter((param) => param !== action.payload.brand)
      return { ...state, sortParams: { ...state.sortParams, sortedBrand: nowState } }
    }

    case "SET_SPEC": {
      if (action.payload.e.target.checked) {
        return {
          ...state,
          sortParams: { ...state.sortParams, sortedSpec: [...state.sortParams.sortedSpec, action.payload.spec] }
        };
      }
      const prevState = state.sortParams.sortedSpec;
      const nowState = prevState.filter((param) => param !== action.payload.spec)
      return { ...state, sortParams: { ...state.sortParams, sortedSpec: nowState } }
    }

    case "SET_IMG": {
      return {
        ...state,
        img: action.payload
      }
    }

    case "SORT_BY": {
      return {
        ...state,
        sortParams: { ...state.sortParams, sortedBy: !state.sortParams.sortedBy }
      }
    }

    default:
      return state;
  }
};

export default reduceMain;