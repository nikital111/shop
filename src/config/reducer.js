
const initialState = {
  products: [],
  sortProducts: [],
  sortParams: {
    sortedBrand: [],
    sortedSpec: [],
    sortedBy: true
  },
  deletedProducts:null,
  img: null,
  isOpenSidebar: false,
  isOpenLogin: false,
  isNeedReg: false,
  cart: [],
  total: 0,
  totalPrice: 0,
  isAdmin:false,
  isLogginned:false
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

    case "IS_OPEN_SIDEBAR": {
      return {
        ...state,
        isOpenSidebar: !state.isOpenSidebar
      }
    }

    case "TO_CART": {

      if (action.val !== undefined) {
        let newTotal = state.total + (action.val - state.cart[action.count].count);
        let newTotalPrice = 0;
        newTotalPrice = (newTotal - state.total) * action.product.price;
        const newCart = [...state.cart];
        newCart[action.count].count = action.val;
        console.log(newTotal)
        return {
          ...state,
          cart: newCart,
          total: newTotal,
          totalPrice: state.totalPrice + newTotalPrice
        }
      }

      if (action.count === undefined) {
        return {
          ...state,
          cart: [...state.cart, action.product],
          total: state.total + 1,
          totalPrice: state.totalPrice + action.product.price
        }
      }
      if (state.cart[action.count].count === 20) return state;
      const newCart = state.cart;
      newCart[action.count].count += 1;
      return {
        ...state,
        cart: newCart,
        total: state.total + 1,
        totalPrice: state.totalPrice + action.product.price
      }
    }

    case "DELETE_FROM_A_CART": {
      const newCart = [...state.cart];
      const pr = newCart.splice(action.i, 1)
      console.log(pr)
      return {
        ...state,
        cart: newCart,
        total: state.total - pr[0].count,
        totalPrice: state.totalPrice - (pr[0].price * pr[0].count)
      }
    }

    case "IS_OPEN_LOGIN": {
      return {
        ...state,
        isOpenLogin: !state.isOpenLogin
      }
    }

    case "IS_NEED_REG": {
      return {
        ...state,
        isNeedReg: !state.isNeedReg
      }
    }
    
    case "SET_ADMIN": {
      return {
        ...state,
        isAdmin: !state.isAdmin
      }
    }

    case "SET_LOGIN": {
      return {
        ...state,
        isLogginned: !state.isLogginned
      }
    }

    case "ADD_DELETED_PRODUCT": {
      return {
        ...state,
        deletedProducts:action.payload
      }
    }

    default:
      return state;
  }
};

export default reduceMain;