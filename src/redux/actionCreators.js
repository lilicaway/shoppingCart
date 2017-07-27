import * as actionType from './actions';
import axios from 'axios';

export const addPromotion = promotion => {
  // promotion has these fields:
  // { id, name, type, discountPercent?, forQuantity?, pay? }
  // Where the last 3 depend on the type.
  return { type: actionType.ADD_PROMOTION, payload: promotion };
};

export const addProduct = product => {
  // product has these fields:
  // { id, name, price, promotionId?}
  return { type: actionType.ADD_PRODUCT, payload: product };
};

export const addCartItem = productId => {
  return { type: actionType.ADD_CART_ITEM, payload: { productId } };
};

export const incrementCartItemQuantity = productId => {
  return { type: actionType.INCREMENT_CART_ITEM_QUANTITY, payload: { productId } };
};

export const decrementCartItemQuantity = productId => {
  return { type: actionType.DECREMENT_CART_ITEM_QUANTITY, payload: { productId } };
};

export const setDataAsLoading = () => {
  return { type: actionType.DATA_LOADER_LOADING, payload: undefined };
};

export const setDataAsError = error => {
  return { type: actionType.DATA_LOADER_ERROR, payload: error };
};

export const setDataAsCompleted = () => {
  return { type: actionType.DATA_LOADER_COMPLETED, payload: undefined };
};

export const loadData = () => {
  return dispatch => {
    dispatch(setDataAsLoading());
    axios
      .get('/promotions.json')
      .then(response => {
        response.data.map(promotion => dispatch(addPromotion(promotion)));
      })
      .then(() => {
        // Products depend on promotions. That is why we load them serialy.
        return axios.get('/products.json').then(response => {
          response.data.map(product => dispatch(addProduct(product)));
        });
      })
      .then(() => {
        dispatch(setDataAsCompleted());
      })
      .catch(error => {
        dispatch(setDataAsError(error.toString()));
      });
  };
};
