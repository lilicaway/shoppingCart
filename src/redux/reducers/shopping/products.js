import * as actionType from '../../actions';

const products = (state = {}, action) => {
  switch (action.type) {
    case actionType.ADD_PRODUCT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
};

export default products;

// Selectors from here on.

export const getProductById = (state, productId) => {
  return productId && state[productId];
};

export const getProductList = state => {
  return Object.values(state);
};
