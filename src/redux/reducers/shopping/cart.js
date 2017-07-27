import * as actionType from '../../actions';

const cartItem = (state, action) => {
  switch (action.type) {
    case actionType.ADD_CART_ITEM:
      if (state) {
        return {
          productId: action.payload.productId,
          quantity: state.quantity + 1
        };
      } else {
        return {
          productId: action.payload.productId,
          quantity: 1
        };
      }
    case actionType.INCREMENT_CART_ITEM_QUANTITY:
      return {
        productId: action.payload.productId,
        quantity: state.quantity + 1
      };
    case actionType.DECREMENT_CART_ITEM_QUANTITY:
      const newQuantity = state.quantity - 1;
      if (newQuantity <= 0) {
        // implicit deletion
        return undefined;
      }
      return {
        productId: action.payload.productId,
        quantity: newQuantity
      };
    default:
      return state;
  }
};

const cart = (state = {}, action) => {
  switch (action.type) {
    case actionType.ADD_CART_ITEM:
    case actionType.INCREMENT_CART_ITEM_QUANTITY:
    case actionType.DECREMENT_CART_ITEM_QUANTITY:
      const newState = {
        ...state,
        [action.payload.productId]: cartItem(state[action.payload.productId], action)
      };
      if (!newState[action.payload.productId]) {
        // Implicit deletions leave an undefined on the value for the productId.
        // With this we make sure we don't have undefines left.
        delete newState[action.payload.productId];
      }
      return newState;
    default:
      return state;
  }
};

export default cart;

// Selectors from here on.

export const getCartList = state => {
  return Object.values(state);
};
