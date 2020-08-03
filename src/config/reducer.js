const initialState = {

};

const reduceMain = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_Q": {
      return {
        ...state,
        arr: [...state.arr, action.payload],
        isShow: false,
        id: null,
      };
    }


    default:
      return state;
  }
};

export default reduceMain;